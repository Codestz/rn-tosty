// Toast Item - Modern component with advanced variant system
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  calculateLayout,
  getIconMargin,
  getTextAlignmentStyle,
} from '../../utils/layoutUtils';
import {
  getVariantBehavior,
  getVariantIconConfig,
  getVariantTextStyles,
  resolveToastVariantSmart,
  variantStyleToRNStyle,
} from '../../utils/variantResolver';
import { ToastIcon } from '../ToastIcon/ToastIcon';
import type { ToastItemProps } from './ToastItem.types';

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme,
  config,
  onRemove,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const scale = useSharedValue(0.8);

  // Resolve variant configuration with smart defaults
  const resolvedVariant = useMemo(() => {
    return resolveToastVariantSmart(toast, theme);
  }, [toast, theme]);

  // Get variant-based configurations
  const variantBehavior = useMemo(() => {
    return getVariantBehavior(resolvedVariant);
  }, [resolvedVariant]);

  const iconConfig = useMemo(() => {
    return getVariantIconConfig(resolvedVariant);
  }, [resolvedVariant]);

  // Calculate layout configuration (keeping existing layout system for advanced positioning)
  const layout = calculateLayout(config?.layout, theme);

  const handleDismiss = React.useCallback(() => {
    const exitDuration = resolvedVariant.style.animationDuration * 0.7; // Faster exit

    opacity.value = withTiming(0, { duration: exitDuration });
    translateY.value = withTiming(-30, { duration: exitDuration });
    scale.value = withTiming(0.9, { duration: exitDuration }, () => {
      runOnJS(onRemove)(toast.id);
    });
  }, [
    opacity,
    translateY,
    scale,
    onRemove,
    toast.id,
    resolvedVariant.style.animationDuration,
  ]);

  useEffect(() => {
    // Entrance animation with variant-specific configuration
    const animationDuration = resolvedVariant.style.animationDuration;
    const easing = resolvedVariant.style.animationEasing;

    opacity.value = withTiming(1, { duration: animationDuration });

    // Use spring animation for more natural feel
    translateY.value = withSpring(0, {
      damping: easing === 'spring' ? 12 : 15,
      stiffness: easing === 'spring' ? 120 : 150,
    });
    scale.value = withSpring(1, {
      damping: easing === 'spring' ? 12 : 15,
      stiffness: easing === 'spring' ? 120 : 150,
    });

    // Auto-dismiss timer with variant-specific behavior
    const duration = toast.config.duration || variantBehavior.defaultDuration;

    if (
      variantBehavior.autoDismiss &&
      typeof duration === 'number' &&
      duration > 0
    ) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [
    opacity,
    translateY,
    scale,
    toast.config.duration,
    variantBehavior.autoDismiss,
    variantBehavior.defaultDuration,
    resolvedVariant.style.animationDuration,
    resolvedVariant.style.animationEasing,
    handleDismiss,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  // Create container style using modern variant system
  const variantContainerStyle = variantStyleToRNStyle(
    resolvedVariant.style,
    theme
  );

  const containerStyle = [
    styles.container,
    variantContainerStyle,
    // Apply layout-specific configurations
    {
      flexDirection: layout.flexDirection,
    },
  ];

  // Create text container style with layout-aware alignment
  const textContainerStyle = [
    styles.textContainer,
    {
      paddingHorizontal: layout.spacing.textPadding,
    },
  ];

  // Create text styles using variant system
  const titleStyle = [
    styles.title,
    {
      fontSize: theme.typography.titleFontSize,
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.titleLineHeight,
    },
    getVariantTextStyles(resolvedVariant.style, true),
    getTextAlignmentStyle(layout.textAlignment),
  ];

  const messageStyle = [
    styles.message,
    {
      fontSize: theme.typography.bodyFontSize,
      fontWeight: theme.typography.fontWeight.regular,
      lineHeight: theme.typography.bodyLineHeight,
    },
    getVariantTextStyles(resolvedVariant.style, false),
    getTextAlignmentStyle(layout.textAlignment),
  ];

  // Determine number of lines based on variant intelligently
  const getMessageLines = (): number => {
    switch (resolvedVariant.name) {
      case 'minimal':
      case 'compact':
        return 1;
      case 'banner':
        return 2;
      case 'card':
      case 'alert':
        return 4;
      default:
        return 3;
    }
  };

  // Handle tap interaction based on variant behavior
  const handleTap = React.useCallback(() => {
    if (variantBehavior.dismissOnTap) {
      handleDismiss();
    }
  }, [variantBehavior.dismissOnTap, handleDismiss]);

  return (
    <Animated.View
      style={[animatedStyle, containerStyle]}
      onTouchEnd={handleTap}
    >
      {/* Icon - positioned based on variant configuration */}
      {iconConfig.shouldShowIcon && iconConfig.iconPosition !== 'none' && (
        <View
          style={[
            styles.iconContainer,
            getIconMargin(
              iconConfig.iconPosition === 'left' ? 'left' : 'right',
              layout.spacing
            ),
            // Icon positioning for 'top' position
            iconConfig.iconPosition === 'top' && styles.iconTop,
          ]}
        >
          <ToastIcon
            type={toast.config.type || 'info'}
            theme={theme}
            size={iconConfig.iconSize}
            color={iconConfig.iconColor}
            iconConfig={config?.icons}
            toastIconOverride={toast.config.icon}
          />
        </View>
      )}

      {/* Text Content */}
      <View
        style={[
          textContainerStyle,
          // Adjust text container for top icon position
          iconConfig.iconPosition === 'top' && styles.textContainerWithTopIcon,
        ]}
      >
        {toast.config.title && (
          <Text style={titleStyle} numberOfLines={2}>
            {toast.config.title}
          </Text>
        )}
        <Text style={messageStyle} numberOfLines={getMessageLines()}>
          {toast.config.message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTop: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainerWithTopIcon: {
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: 2,
  },
  message: {
    // Base message styles
  },
});
