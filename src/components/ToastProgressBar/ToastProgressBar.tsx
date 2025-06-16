/**
 * Toast Progress Bar - Duration-based progress indicator
 * Shows remaining time before toast auto-dismissal
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { resolveProgressBarColor } from '../../utils/progressBarUtils';
import type { ToastProgressBarProps } from './ToastProgressBar.types';

export const ToastProgressBar: React.FC<ToastProgressBarProps> = ({
  progress,
  position,
  type,
  theme,
  visible,
  color,
  height = 2,
  borderRadius = 1,
}) => {
  // Resolve the progress bar color
  const progressColor = resolveProgressBarColor(type, theme, color);

  // Animated style for smooth progress updates (always call hooks)
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress * 100}%`, {
      duration: 100, // Smooth updates
    }),
  }));

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  // Container style based on position with proper margins
  const containerStyle = [
    styles.container,
    {
      height,
      ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
    },
  ];

  // Progress bar style
  const progressBarStyle = [
    styles.progressBar,
    {
      backgroundColor: progressColor,
      height,
      borderRadius,
    },
  ];

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={styles.progressTrack}>
        <Animated.View style={[progressBarStyle, animatedStyle]} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  progressTrack: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle background
    borderRadius: 1,
  },
  progressBar: {
    height: '100%',
  },
});
