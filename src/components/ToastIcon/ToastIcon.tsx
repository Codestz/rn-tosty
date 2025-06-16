// ToastIcon - Contextual icons for toast notifications with custom icon support
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { resolveIconConfig } from '../../utils/iconResolver';
import type { ToastIconProps } from './ToastIcon.types';

export const ToastIcon: React.FC<ToastIconProps> = ({
  type,
  theme,
  size = 'large',
  animated = true,
  color,
  iconConfig,
  toastIconOverride,
}) => {
  const animationProgress = useSharedValue(0);

  // Resolve icon configuration using the new system with toast override
  const resolvedIcon = React.useMemo(() => {
    return resolveIconConfig(
      type,
      theme,
      iconConfig,
      {
        size: typeof size === 'string' ? size : undefined,
        animated,
        color,
      },
      toastIconOverride
    );
  }, [type, theme, iconConfig, size, animated, color, toastIconOverride]);

  // Start animation when component mounts
  React.useEffect(() => {
    if (resolvedIcon.animated) {
      animationProgress.value = withDelay(
        100, // Small delay for better UX
        withSpring(1, {
          damping: 15,
          stiffness: 300,
        })
      );
    } else {
      animationProgress.value = 1;
    }
  }, [resolvedIcon.animated, animationProgress]);

  // Animated style for the icon container
  const animatedStyle = useAnimatedStyle(() => {
    if (!resolvedIcon.animated) {
      return {
        transform: [{ scale: 1 }],
        opacity: 1,
      };
    }

    const scale = interpolate(
      animationProgress.value,
      [0, 1],
      [0.3, 1],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      animationProgress.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const styles = StyleSheet.create({
    container: {
      width: resolvedIcon.size,
      height: resolvedIcon.size,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // Render the resolved icon component
  const IconComponent = resolvedIcon.component;

  // Handle case where icon is disabled (false)
  if (!IconComponent) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <IconComponent
        size={resolvedIcon.size}
        color={resolvedIcon.color}
        theme={theme}
      />
    </Animated.View>
  );
};
