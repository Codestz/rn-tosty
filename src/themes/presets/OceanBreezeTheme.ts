// OceanBreeze Theme - Calming design inspired by ocean waves and coastal serenity
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import { baseProgressBar, colorUtils } from '../base/BaseTheme';

// Custom typography for ocean theme
const oceanBreezeTypography = {
  title: {
    size: 16,
    weight: '500', // Gentle and flowing
    lineHeight: 21,
  },
  description: {
    size: 14,
    weight: '400',
    lineHeight: 19,
  },
};

// Custom spacing for ocean theme (flowing and spacious)
const oceanBreezeSpacing = {
  icon: 16,
  container: 20,
  text: 12,
};

// OceanBreeze Light Theme
const oceanBreezeLight: Theme = {
  name: 'ocean-breeze-light',
  mode: 'light',

  colors: {
    // Base colors - Ocean palette
    primary: '#00BCD4', // Cyan 500
    secondary: '#4DD0E1', // Cyan 300

    // Toast type colors - Ocean variants
    success: '#26A69A', // Teal 400
    error: '#FF7043', // Deep orange 400
    warning: '#FFCA28', // Amber 400
    info: '#29B6F6', // Light blue 400

    // Background system - Ocean foam
    background: '#F0FDFF', // Very light cyan
    surface: '#E0F8FF', // Light ocean mist

    // Text system
    onPrimary: '#FFFFFF',
    onSecondary: '#006064',
    onSurface: '#004D5C', // Deep ocean blue

    // Border and dividers - Ocean current
    border: '#B2EBF2', // Light cyan border

    // Overlay and shadows - Ocean depth
    overlay: colorUtils.addAlpha('#00BCD4', 0.4),
    shadow: '#00BCD4',
  },

  typography: oceanBreezeTypography,
  spacing: oceanBreezeSpacing,
  borderRadius: 'xl',
  shadows: {
    shadowColor: '#00BCD4',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#B2EBF2', 0.5), // Ocean foam track
      borderRadius: 4, // More flowing for ocean aesthetic
      height: 3, // Slightly thicker for wave effect
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 4,
      height: 3,
      gradient: {
        colors: ['#00BCD4', '#4DD0E1', '#80DEEA'], // Ocean wave gradient
        locations: [0, 0.5, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
    animation: {
      ...baseProgressBar.animation,
      duration: 150, // Smoother like water
      easing: 'ease-out',
    },
  },
};

// OceanBreeze Dark Theme
const oceanBreezeDark: Theme = {
  name: 'ocean-breeze-dark',
  mode: 'dark',

  colors: {
    // Base colors - Deep ocean
    primary: '#4DD0E1', // Cyan 300
    secondary: '#4DB6AC', // Teal 300

    // Toast type colors - Bright ocean variants
    success: '#80CBC4', // Teal 200
    error: '#FFAB91', // Deep orange 200
    warning: '#FFCC02', // Amber A200
    info: '#81D4FA', // Light blue 200

    // Background system - Deep ocean
    background: '#0F2027', // Deep ocean blue
    surface: '#203A43', // Deep teal

    // Text system
    onPrimary: '#004D5C',
    onSecondary: '#004D40',
    onSurface: '#E0F8FF', // Light cyan

    // Border and dividers - Deep ocean current
    border: '#2C5F70', // Deep teal border

    // Overlay and shadows - Abyssal depth
    overlay: colorUtils.addAlpha('#000000', 0.6),
    shadow: '#00BCD4',
  },

  typography: oceanBreezeTypography,
  spacing: oceanBreezeSpacing,
  borderRadius: 'xl',
  shadows: {
    shadowColor: '#00BCD4',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#2C5F70', 0.6), // Deep ocean track
      borderRadius: 4,
      height: 3,
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 4,
      height: 3,
      gradient: {
        colors: ['#4DD0E1', '#4DB6AC', '#80CBC4'], // Deep ocean gradient
        locations: [0, 0.6, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
    animation: {
      ...baseProgressBar.animation,
      duration: 150,
      easing: 'ease-out',
    },
  },
};

// Export the OceanBreeze theme pair
export const OceanBreezeTheme: ThemePair = {
  light: oceanBreezeLight,
  dark: oceanBreezeDark,
};
