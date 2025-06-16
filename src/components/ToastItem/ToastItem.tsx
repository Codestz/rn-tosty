// Toast Item - Individual toast component with beautiful theme support
import React, { useEffect } from 'react';
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
import { ToastIcon } from '../ToastIcon/ToastIcon';
import type { ToastColors, ToastItemProps } from './ToastItem.types';

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme,
  config,
  onRemove,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const scale = useSharedValue(0.8);

  // Calculate layout configuration
  const layout = calculateLayout(config?.layout, theme);

  const handleDismiss = React.useCallback(() => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(-30, { duration: 200 });
    scale.value = withTiming(0.9, { duration: 200 }, () => {
      runOnJS(onRemove)(toast.id);
    });
  }, [opacity, translateY, scale, onRemove, toast.id]);

  useEffect(() => {
    // Entrance animation
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });

    // Auto-dismiss timer
    if (
      toast.config.duration &&
      typeof toast.config.duration === 'number' &&
      toast.config.duration > 0
    ) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, toast.config.duration);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [opacity, translateY, scale, toast.config.duration, handleDismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  // Determine if we should show icon
  const shouldShowIcon = toast.config.variant === 'styled';

  // Get colors based on toast type and theme
  const getToastColors = (): ToastColors => {
    const { type } = toast.config;
    const isGlassmorphism = theme.name.includes('glassmorphism');

    if (isGlassmorphism) {
      // For glassmorphism, use semi-transparent surface with colored borders
      return {
        background: theme.colors.surface,
        text: theme.colors.onSurface,
        border: theme.colors.border,
      };
    }

    // For other themes, use type-specific colored backgrounds
    switch (type) {
      case 'success':
        return {
          background: theme.colors.success,
          text: '#FFFFFF',
          border: theme.colors.success,
        };
      case 'error':
        return {
          background: theme.colors.error,
          text: '#FFFFFF',
          border: theme.colors.error,
        };
      case 'warning':
        return {
          background: theme.colors.warning,
          text: '#FFFFFF',
          border: theme.colors.warning,
        };
      case 'info':
        return {
          background: theme.colors.info,
          text: '#FFFFFF',
          border: theme.colors.info,
        };
      default:
        return {
          background: theme.colors.primary,
          text: '#FFFFFF',
          border: theme.colors.primary,
        };
    }
  };

  const colors = getToastColors();

  // Create container style with layout-aware padding and proper theming
  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: theme.name.includes('glassmorphism') ? 1 : 0,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: layout.spacing.containerPadding,
      paddingVertical: layout.spacing.containerPadding * 0.75,
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

  // Create text styles with layout-aware alignment and proper colors
  const titleStyle = [
    styles.title,
    {
      color: colors.text,
      fontSize: theme.typography.titleFontSize,
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.titleLineHeight,
    },
    getTextAlignmentStyle(layout.textAlignment),
  ];

  const messageStyle = [
    styles.message,
    {
      color: colors.text,
      fontSize: theme.typography.bodyFontSize,
      fontWeight: theme.typography.fontWeight.regular,
      lineHeight: theme.typography.bodyLineHeight,
    },
    getTextAlignmentStyle(layout.textAlignment),
  ];

  return (
    <Animated.View style={[animatedStyle, containerStyle]}>
      {/* Icon - positioned based on layout configuration */}
      {shouldShowIcon && (
        <View
          style={[
            styles.iconContainer,
            getIconMargin(layout.iconPosition, layout.spacing),
          ]}
        >
          <ToastIcon
            type={toast.config.type || 'info'}
            theme={theme}
            size="medium"
            iconConfig={config?.icons}
            toastIconOverride={toast.config.icon}
          />
        </View>
      )}

      {/* Text Content */}
      <View style={textContainerStyle}>
        {toast.config.title && (
          <Text style={titleStyle} numberOfLines={2}>
            {toast.config.title}
          </Text>
        )}
        <Text
          style={messageStyle}
          numberOfLines={toast.config.variant === 'simple' ? 1 : 3}
        >
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  message: {
    // Base message styles
  },
});
