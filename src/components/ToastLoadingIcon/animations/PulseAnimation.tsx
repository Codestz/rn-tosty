// PulseAnimation - Expanding circles pulse animation
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { LoadingAnimationProps } from '../ToastLoadingIcon.types';

export const PulseAnimation: React.FC<LoadingAnimationProps> = ({
  size,
  color,
  animated,
}) => {
  const pulse1Scale = useSharedValue(0);
  const pulse2Scale = useSharedValue(0);
  const pulse1Opacity = useSharedValue(1);
  const pulse2Opacity = useSharedValue(1);

  const pulseSize = size * 0.8;

  useEffect(() => {
    if (animated) {
      const animationConfig = {
        duration: 1000,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      };

      // First pulse
      pulse1Scale.value = withRepeat(withTiming(1, animationConfig), -1, false);

      pulse1Opacity.value = withRepeat(
        withTiming(0, animationConfig),
        -1,
        false
      );

      // Second pulse with delay
      pulse2Scale.value = withDelay(
        500,
        withRepeat(withTiming(1, animationConfig), -1, false)
      );

      pulse2Opacity.value = withDelay(
        500,
        withRepeat(withTiming(0, animationConfig), -1, false)
      );
    } else {
      pulse1Scale.value = 0;
      pulse2Scale.value = 0;
      pulse1Opacity.value = 1;
      pulse2Opacity.value = 1;
    }
  }, [animated, pulse1Scale, pulse2Scale, pulse1Opacity, pulse2Opacity]);

  const pulse1Style = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1Scale.value }],
    opacity: pulse1Opacity.value,
  }));

  const pulse2Style = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2Scale.value }],
    opacity: pulse2Opacity.value,
  }));

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pulse: {
      position: 'absolute',
      width: pulseSize,
      height: pulseSize,
      borderRadius: pulseSize / 2,
      backgroundColor: color,
    },
    center: {
      width: size * 0.3,
      height: size * 0.3,
      borderRadius: size * 0.15,
      backgroundColor: color,
      zIndex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, pulse1Style]} />
      <Animated.View style={[styles.pulse, pulse2Style]} />
      <View style={styles.center} />
    </View>
  );
};
