// WarmSunset Theme - Cozy and warm design inspired by golden hour and sunset colors
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import { baseProgressBar, baseSpacing, colorUtils } from '../base/BaseTheme';

// Custom typography for warm sunset theme
const warmSunsetTypography = {
  title: {
    size: 17,
    weight: '600', // Warm and friendly
    lineHeight: 22,
  },
  description: {
    size: 15,
    weight: '400',
    lineHeight: 20,
  },
};

// WarmSunset Light Theme
const warmSunsetLight: Theme = {
  name: 'warm-sunset-light',
  mode: 'light',

  colors: {
    // Base colors - Warm sunset palette
    primary: '#FF6B35', // Vibrant sunset orange
    secondary: '#F7931E', // Golden orange

    // Toast type colors - Warm variants
    success: '#FF8C42', // Warm orange success
    error: '#D32F2F', // Deep warm red
    warning: '#FFA726', // Warm amber
    info: '#FF7043', // Warm coral

    // Background system - Warm ivory
    background: '#FFF8F0', // Warm ivory
    surface: '#FFE4CC', // Light peach

    // Text system
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#3E2723', // Dark warm brown

    // Border and dividers - Warm borders
    border: '#FFCC80', // Light warm border

    // Overlay and shadows - Warm overlay
    overlay: colorUtils.addAlpha('#FF6B35', 0.5),
    shadow: '#FF6B35',
  },

  typography: warmSunsetTypography,
  spacing: baseSpacing,
  borderRadius: 'lg',
  shadows: {
    shadowColor: '#FF6B35',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#FFCC80', 0.4), // Warm golden track
      borderRadius: 2, // Slightly more rounded for warm aesthetic
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 2,
      gradient: {
        colors: ['#FF6B35', '#F7931E'], // Sunset gradient
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
  },
};

// WarmSunset Dark Theme
const warmSunsetDark: Theme = {
  name: 'warm-sunset-dark',
  mode: 'dark',

  colors: {
    // Base colors - Deep warm tones
    primary: '#FF8C42', // Brighter sunset orange
    secondary: '#FFB627', // Golden amber

    // Toast type colors - Bright warm variants
    success: '#FFA726', // Warm orange
    error: '#FF5722', // Deep warm red
    warning: '#FFD54F', // Bright golden
    info: '#FF8A80', // Warm coral

    // Background system - Deep warm dark
    background: '#2D1810', // Deep warm brown
    surface: '#3E2723', // Warm dark brown

    // Text system
    onPrimary: '#1A0E0A',
    onSecondary: '#1A0E0A',
    onSurface: '#FFCCBC', // Warm light peach

    // Border and dividers - Warm dark borders
    border: '#5D4037', // Warm brown border

    // Overlay and shadows - Deep warm
    overlay: colorUtils.addAlpha('#1A0E0A', 0.7),
    shadow: '#FF6B35',
  },

  typography: warmSunsetTypography,
  spacing: baseSpacing,
  borderRadius: 'lg',
  shadows: {
    shadowColor: '#FF6B35',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#5D4037', 0.5), // Deep warm track
      borderRadius: 2,
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 2,
      gradient: {
        colors: ['#FF8C42', '#FFB627'], // Brighter sunset gradient
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
  },
};

// Export the WarmSunset theme pair
export const WarmSunsetTheme: ThemePair = {
  light: warmSunsetLight,
  dark: warmSunsetDark,
};
