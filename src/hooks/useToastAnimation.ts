/**
 * Custom hook for managing toast animations
 * Handles entrance animations, exit animations, and auto-dismiss coordination
 */
import { useCallback, useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { Toast } from '../types/ToastTypes';

interface ToastAnimationConfig {
  animationDuration: number;
  animationEasing: string;
  autoDismiss: boolean;
  defaultDuration: number;
}

export const useToastAnimation = (
  toast: Toast,
  animationConfig: ToastAnimationConfig,
  onRemove: (id: string) => void,
  onAnimationComplete: (id: string) => void
) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const scale = useSharedValue(0.8);

  const handleDismiss = useCallback(() => {
    // Only start dismissal if not already dismissing
    if (!toast.isDismissing) {
      onRemove(toast.id);
    }
  }, [onRemove, toast.id, toast.isDismissing]);

  // Handle exit animation when toast is marked as dismissing
  useEffect(() => {
    if (toast.isDismissing) {
      const exitDuration = animationConfig.animationDuration * 0.7; // Faster exit

      opacity.value = withTiming(0, { duration: exitDuration });
      translateY.value = withTiming(-30, { duration: exitDuration });
      scale.value = withTiming(0.9, { duration: exitDuration }, () => {
        runOnJS(onAnimationComplete)(toast.id);
      });
    }
  }, [
    toast.isDismissing,
    toast.id,
    opacity,
    translateY,
    scale,
    onAnimationComplete,
    animationConfig.animationDuration,
  ]);

  useEffect(() => {
    // Only run entrance animation if not dismissing
    if (!toast.isDismissing) {
      // Entrance animation with variant-specific configuration
      const { animationDuration, animationEasing } = animationConfig;

      opacity.value = withTiming(1, { duration: animationDuration });

      // Use spring animation for more natural feel
      const springConfig = {
        damping: animationEasing === 'spring' ? 12 : 15,
        stiffness: animationEasing === 'spring' ? 120 : 150,
      };

      translateY.value = withSpring(0, springConfig);
      scale.value = withSpring(1, springConfig);
    }
  }, [opacity, translateY, scale, animationConfig, toast.isDismissing]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return {
    animatedStyle,
    handleDismiss,
  };
};
