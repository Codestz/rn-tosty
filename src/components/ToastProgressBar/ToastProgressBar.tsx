/**
 * Toast Progress Bar - Duration-based progress indicator
 * Shows remaining time before toast auto-dismissal
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
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
  height,
  borderRadius,
}) => {
  // Get theme-specific progress bar configuration
  const themeProgressBar = theme.progressBar;

  // Use theme values as defaults, with prop overrides
  const actualHeight = height ?? themeProgressBar.bar.height;
  const actualBorderRadius = borderRadius ?? themeProgressBar.bar.borderRadius;
  const trackBorderRadius = themeProgressBar.track.borderRadius;

  // Resolve the progress bar color (custom color overrides theme)
  const progressColor = resolveProgressBarColor(type, theme, color);

  // Animation configuration from theme
  const animationDuration = themeProgressBar.animation.duration;
  const easingFunction = getEasingFunction(themeProgressBar.animation.easing);

  // Animated style for smooth progress updates
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress * 100}%`, {
      duration: animationDuration,
      easing: easingFunction,
    }),
  }));

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  // Container style based on position with theme margins
  const containerStyle = [
    styles.container,
    {
      height: themeProgressBar.track.height,
      ...(position === 'top'
        ? { top: themeProgressBar.positioning.marginTop }
        : { bottom: themeProgressBar.positioning.marginBottom }),
    },
  ];

  // Progress track style using theme configuration
  const progressTrackStyle = [
    styles.progressTrack,
    {
      backgroundColor: themeProgressBar.track.backgroundColor,
      borderRadius: trackBorderRadius,
      height: themeProgressBar.track.height,
      opacity: themeProgressBar.track.opacity ?? 1,
    },
  ];

  // Progress bar style - check if gradient is defined in theme
  const hasGradient = themeProgressBar.bar.gradient && !color; // Don't use gradient if custom color is set

  const progressBarBaseStyle = {
    height: actualHeight,
    borderRadius: actualBorderRadius,
  };

  // Render progress bar with gradient support
  const renderProgressBar = () => {
    if (hasGradient && themeProgressBar.bar.gradient) {
      const gradient = themeProgressBar.bar.gradient;

      // Since React Native doesn't have built-in gradients and we need to avoid external deps,
      // we'll create a simple fallback that uses the first gradient color
      const fallbackColor = gradient.colors[0] || progressColor;

      return (
        <Animated.View
          style={[
            styles.progressBar,
            progressBarBaseStyle,
            { backgroundColor: fallbackColor },
            animatedStyle,
          ]}
        />
      );
    }

    // Standard solid color progress bar
    return (
      <Animated.View
        style={[
          styles.progressBar,
          progressBarBaseStyle,
          { backgroundColor: progressColor },
          animatedStyle,
        ]}
      />
    );
  };

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={progressTrackStyle}>
        {renderProgressBar()}
      </Animated.View>
    </Animated.View>
  );
};

/**
 * Convert theme easing string to React Native Reanimated easing function
 */
const getEasingFunction = (
  easingType: 'linear' | 'ease-out' | 'ease-in-out'
) => {
  switch (easingType) {
    case 'ease-out':
      return Easing.out(Easing.quad);
    case 'ease-in-out':
      return Easing.inOut(Easing.quad);
    case 'linear':
    default:
      return Easing.linear;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  progressTrack: {
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
});
