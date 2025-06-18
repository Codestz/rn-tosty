// ForestGlow Theme - Earthy design inspired by forest depths and natural growth
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import { baseProgressBar, colorUtils } from '../base/BaseTheme';

// Custom typography for forest theme
const forestGlowTypography = {
  title: {
    size: 16,
    weight: '600', // Strong like tree trunks
    lineHeight: 20,
  },
  description: {
    size: 14,
    weight: '400',
    lineHeight: 18,
  },
};

// Custom spacing for forest theme (natural and organic)
const forestGlowSpacing = {
  icon: 14,
  container: 18,
  text: 10,
};

// ForestGlow Light Theme
const forestGlowLight: Theme = {
  name: 'forest-glow-light',
  mode: 'light',

  colors: {
    // Base colors - Forest greens
    primary: '#4CAF50', // Green 500
    secondary: '#8BC34A', // Light green 500

    // Toast type colors - Natural variants
    success: '#66BB6A', // Green 400
    error: '#EF5350', // Red 400
    warning: '#FFA726', // Orange 400
    info: '#42A5F5', // Blue 400

    // Background system - Natural light
    background: '#F8FDF8', // Very light green
    surface: '#E8F5E8', // Light moss green

    // Text system
    onPrimary: '#FFFFFF',
    onSecondary: '#2E7D32',
    onSurface: '#1B5E20', // Dark forest green

    // Border and dividers - Soft bark
    border: '#C8E6C9', // Light green border

    // Overlay and shadows - Forest canopy
    overlay: colorUtils.addAlpha('#2E7D32', 0.4),
    shadow: '#4CAF50',
  },

  typography: forestGlowTypography,
  spacing: forestGlowSpacing,
  borderRadius: 'md',
  shadows: {
    shadowColor: '#4CAF50',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#C8E6C9', 0.6), // Light moss track
      borderRadius: 2, // Natural organic curves
      height: 2.5, // Slightly thicker for organic feel
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 2,
      height: 2.5,
      gradient: {
        colors: ['#4CAF50', '#8BC34A', '#AED581'], // Forest growth gradient
        locations: [0, 0.7, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
    animation: {
      ...baseProgressBar.animation,
      duration: 120, // Natural organic movement
      easing: 'ease-in-out',
    },
  },
};

// ForestGlow Dark Theme
const forestGlowDark: Theme = {
  name: 'forest-glow-dark',
  mode: 'dark',

  colors: {
    // Base colors - Deep forest night
    primary: '#66BB6A', // Green 400
    secondary: '#A1887F', // Brown 300

    // Toast type colors - Glowing variants
    success: '#81C784', // Green 300
    error: '#E57373', // Red 300
    warning: '#FFB74D', // Amber 300
    info: '#64B5F6', // Blue 300

    // Background system - Deep forest
    background: '#1B2A1B', // Deep forest green
    surface: '#2E3B2E', // Dark moss green

    // Text system
    onPrimary: '#1B5E20',
    onSecondary: '#3E2723',
    onSurface: '#C8E6C9', // Light green

    // Border and dividers - Dark bark
    border: '#424242', // Dark gray

    // Overlay and shadows - Night forest
    overlay: colorUtils.addAlpha('#000000', 0.7),
    shadow: '#4CAF50',
  },

  typography: forestGlowTypography,
  spacing: forestGlowSpacing,
  borderRadius: 'md',
  shadows: {
    shadowColor: '#4CAF50',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#424242', 0.7), // Dark forest floor track
      borderRadius: 2,
      height: 2.5,
    },
    bar: {
      ...baseProgressBar.bar,
      borderRadius: 2,
      height: 2.5,
      gradient: {
        colors: ['#66BB6A', '#81C784', '#A5D6A7'], // Forest glow gradient
        locations: [0, 0.6, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
    animation: {
      ...baseProgressBar.animation,
      duration: 120,
      easing: 'ease-in-out',
    },
  },
};

// Export the ForestGlow theme pair
export const ForestGlowTheme: ThemePair = {
  light: forestGlowLight,
  dark: forestGlowDark,
};
