// SpinnerAnimation - Circular loading spinner
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import type { LoadingAnimationProps } from '../ToastLoadingIcon.types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const SpinnerAnimation: React.FC<LoadingAnimationProps> = ({
  size,
  color,
  animated,
}) => {
  const rotation = useSharedValue(0);
  const strokeDashoffset = useSharedValue(0);

  const radius = size * 0.35;
  const strokeWidth = size * 0.1;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (animated) {
      // Rotation animation for the container
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );

      // Stroke dash animation for the "spinning" effect
      strokeDashoffset.value = withRepeat(
        withTiming(circumference, {
          duration: 1500,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        }),
        -1,
        true
      );
    } else {
      rotation.value = 0;
      strokeDashoffset.value = 0;
    }
  }, [animated, rotation, strokeDashoffset, circumference]);

  // Animated style for container rotation
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Animated props for stroke dash animation
  const circleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  return (
    <Animated.View
      style={[{ width: size, height: size }, containerAnimatedStyle]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          animatedProps={circleAnimatedProps}
        />
      </Svg>
    </Animated.View>
  );
};
