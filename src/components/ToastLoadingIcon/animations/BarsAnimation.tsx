// BarsAnimation - Animated bars loading animation
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

export const BarsAnimation: React.FC<LoadingAnimationProps> = ({
  size,
  color,
  animated,
}) => {
  const bar1Height = useSharedValue(0.3);
  const bar2Height = useSharedValue(0.3);
  const bar3Height = useSharedValue(0.3);
  const bar4Height = useSharedValue(0.3);

  const barWidth = size * 0.12;
  const spacing = size * 0.08;
  const maxHeight = size * 0.8;

  useEffect(() => {
    if (animated) {
      const animationConfig = {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      };

      // Staggered height animations
      bar1Height.value = withRepeat(withTiming(1, animationConfig), -1, true);

      bar2Height.value = withDelay(
        100,
        withRepeat(withTiming(1, animationConfig), -1, true)
      );

      bar3Height.value = withDelay(
        200,
        withRepeat(withTiming(1, animationConfig), -1, true)
      );

      bar4Height.value = withDelay(
        300,
        withRepeat(withTiming(1, animationConfig), -1, true)
      );
    } else {
      bar1Height.value = 0.3;
      bar2Height.value = 0.3;
      bar3Height.value = 0.3;
      bar4Height.value = 0.3;
    }
  }, [animated, bar1Height, bar2Height, bar3Height, bar4Height]);

  const bar1Style = useAnimatedStyle(() => ({
    height: maxHeight * bar1Height.value,
    opacity: 0.4 + bar1Height.value * 0.6,
  }));

  const bar2Style = useAnimatedStyle(() => ({
    height: maxHeight * bar2Height.value,
    opacity: 0.4 + bar2Height.value * 0.6,
  }));

  const bar3Style = useAnimatedStyle(() => ({
    height: maxHeight * bar3Height.value,
    opacity: 0.4 + bar3Height.value * 0.6,
  }));

  const bar4Style = useAnimatedStyle(() => ({
    height: maxHeight * bar4Height.value,
    opacity: 0.4 + bar4Height.value * 0.6,
  }));

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: size,
      height: size,
      paddingBottom: size * 0.1,
    },
    bar: {
      width: barWidth,
      backgroundColor: color,
      borderRadius: barWidth / 2,
      marginHorizontal: spacing / 2,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, bar1Style]} />
      <Animated.View style={[styles.bar, bar2Style]} />
      <Animated.View style={[styles.bar, bar3Style]} />
      <Animated.View style={[styles.bar, bar4Style]} />
    </View>
  );
};
