// ToastLoadingIcon - Main loading icon component with multiple animation types
import React, { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ErrorIcon, SuccessIcon } from '../ToastIcon/icons';
import { BarsAnimation } from './animations/BarsAnimation';
import { DotsAnimation } from './animations/DotsAnimation';
import { PulseAnimation } from './animations/PulseAnimation';
import { SpinnerAnimation } from './animations/SpinnerAnimation';
import type {
  LoadingIconSize,
  ToastLoadingIconProps,
} from './ToastLoadingIcon.types';
import { LOADING_ICON_SIZES } from './ToastLoadingIcon.types';

/**
 * Resolves icon size to actual pixel value
 */
const resolveLoadingIconSize = (size: LoadingIconSize): number => {
  if (typeof size === 'number') {
    return size;
  }
  return LOADING_ICON_SIZES[size];
};

export const ToastLoadingIcon: React.FC<ToastLoadingIconProps> = ({
  type = 'spinner',
  size = 'medium',
  color,
  theme,
  animated = true,
  transitionTo = null,
  onTransitionComplete,
  duration = 300,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Resolve size and color
  const resolvedSize = useMemo(() => resolveLoadingIconSize(size), [size]);
  const resolvedColor = useMemo(() => {
    // Priority: explicit color > text color > theme primary
    if (color) {
      return color;
    }

    // Use onSurface color as it's the standard text color
    // This ensures loading icons match the text color in the variant
    return theme.colors.onSurface;
  }, [color, theme]);

  // Handle transitions to success/error states
  useEffect(() => {
    if (transitionTo === 'success' || transitionTo === 'error') {
      // Scale down and fade out loading animation
      scale.value = withTiming(0.8, { duration: duration / 2 });
      opacity.value = withTiming(0, { duration: duration / 2 }, () => {
        // Scale back up and fade in the result icon
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(1, { duration: duration / 2 }, () => {
          if (onTransitionComplete) {
            runOnJS(onTransitionComplete)();
          }
        });
      });
    } else {
      // Reset to normal state
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 200 });
    }
  }, [transitionTo, scale, opacity, duration, onTransitionComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const styles = StyleSheet.create({
    container: {
      width: resolvedSize,
      height: resolvedSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // Render the appropriate animation or result icon
  const renderContent = () => {
    if (transitionTo === 'success') {
      return <SuccessIcon iconSize={resolvedSize} iconColor={resolvedColor} />;
    }

    if (transitionTo === 'error') {
      return <ErrorIcon iconSize={resolvedSize} iconColor={resolvedColor} />;
    }

    // Render loading animation based on type
    const animationProps = {
      size: resolvedSize,
      color: resolvedColor,
      theme,
      animated,
    };

    switch (type) {
      case 'spinner':
        return <SpinnerAnimation {...animationProps} />;
      case 'dots':
        return <DotsAnimation {...animationProps} />;
      case 'bars':
        return <BarsAnimation {...animationProps} />;
      case 'pulse':
        return <PulseAnimation {...animationProps} />;
      default:
        return <SpinnerAnimation {...animationProps} />;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderContent()}
    </Animated.View>
  );
};
