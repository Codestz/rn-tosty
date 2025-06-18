// Default Theme - Clean, contemporary design perfect for most apps
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseProgressBar,
  baseSpacing,
  baseTypography,
  colorUtils,
} from '../base/BaseTheme';

// Default Light Theme
const defaultLight: Theme = {
  name: 'default-light',
  mode: 'light',

  colors: {
    // Base colors
    primary: '#3B82F6', // Blue 500
    secondary: '#6B7280', // Gray 500

    // Toast type colors
    success: '#10B981', // Emerald 500
    error: '#EF4444', // Red 500
    warning: '#F59E0B', // Amber 500
    info: '#3B82F6', // Blue 500

    // Background system
    background: '#FFFFFF', // Pure white
    surface: '#F8FAFC', // Slate 50

    // Text system
    onPrimary: '#FFFFFF', // White on primary
    onSecondary: '#FFFFFF', // White on secondary
    onSurface: '#1E293B', // Slate 800

    // Border and dividers
    border: '#E2E8F0', // Slate 200

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.5),
    shadow: '#000000',
  },

  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: 'md',
  shadows: {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#E2E8F0', 0.5), // Slightly more visible track
    },
  },
};

// Default Dark Theme
const defaultDark: Theme = {
  name: 'default-dark',
  mode: 'dark',

  colors: {
    // Base colors
    primary: '#60A5FA', // Blue 400 (lighter for dark mode)
    secondary: '#9CA3AF', // Gray 400

    // Toast type colors
    success: '#34D399', // Emerald 400
    error: '#F87171', // Red 400
    warning: '#FBBF24', // Amber 400
    info: '#60A5FA', // Blue 400

    // Background system
    background: '#0F172A', // Slate 900
    surface: '#1E293B', // Slate 800

    // Text system
    onPrimary: '#0F172A', // Dark on primary
    onSecondary: '#0F172A', // Dark on secondary
    onSurface: '#F8FAFC', // Slate 50

    // Border and dividers
    border: '#475569', // Slate 600

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.7),
    shadow: '#000000',
  },

  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: 'md',
  shadows: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressBar: {
    ...baseProgressBar,
    track: {
      ...baseProgressBar.track,
      backgroundColor: colorUtils.addAlpha('#475569', 0.6), // Slightly more visible dark track
    },
  },
};

// Export the Default theme pair
export const DefaultTheme: ThemePair = {
  light: defaultLight,
  dark: defaultDark,
};
