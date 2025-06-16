// DotsAnimation - Pulsing dots loading animation
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

export const DotsAnimation: React.FC<LoadingAnimationProps> = ({
  size,
  color,
  animated,
}) => {
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);

  const dotSize = size * 0.2;
  const spacing = size * 0.15;

  useEffect(() => {
    if (animated) {
      const animationConfig = {
        duration: 600,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      };

      // Staggered animation for wave effect
      dot1Scale.value = withRepeat(withTiming(1.5, animationConfig), -1, true);

      dot2Scale.value = withDelay(
        200,
        withRepeat(withTiming(1.5, animationConfig), -1, true)
      );

      dot3Scale.value = withDelay(
        400,
        withRepeat(withTiming(1.5, animationConfig), -1, true)
      );
    } else {
      dot1Scale.value = 1;
      dot2Scale.value = 1;
      dot3Scale.value = 1;
    }
  }, [animated, dot1Scale, dot2Scale, dot3Scale]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
    opacity: 0.4 + (dot1Scale.value - 1) * 0.6,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
    opacity: 0.4 + (dot2Scale.value - 1) * 0.6,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
    opacity: 0.4 + (dot3Scale.value - 1) * 0.6,
  }));

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
    },
    dot: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: color,
      marginHorizontal: spacing / 2,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
};
