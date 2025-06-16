// Default Theme - Clean, contemporary design perfect for most apps
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseAnimations,
  baseBlur,
  baseBorderRadius,
  baseOpacity,
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
    surfaceVariant: '#F1F5F9', // Slate 100

    // Text system
    onPrimary: '#FFFFFF', // White on primary
    onSecondary: '#FFFFFF', // White on secondary
    onSurface: '#1E293B', // Slate 800
    onSurfaceVariant: '#475569', // Slate 600

    // Border and dividers
    border: '#E2E8F0', // Slate 200
    borderVariant: '#CBD5E1', // Slate 300

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.5),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 16,
    bodyFontSize: 14,
    fontWeight: {
      ...baseTypography.fontWeight,
      medium: '600', // Slightly bolder for modern look
    },
  },

  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  animations: baseAnimations,

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  effects: {
    blur: baseBlur,
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      secondary: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      info: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
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
    surfaceVariant: '#334155', // Slate 700

    // Text system
    onPrimary: '#0F172A', // Dark on primary
    onSecondary: '#0F172A', // Dark on secondary
    onSurface: '#F8FAFC', // Slate 50
    onSurfaceVariant: '#CBD5E1', // Slate 300

    // Border and dividers
    border: '#475569', // Slate 600
    borderVariant: '#64748B', // Slate 500

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.7),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 16,
    bodyFontSize: 14,
    fontWeight: {
      ...baseTypography.fontWeight,
      medium: '600',
    },
  },

  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  animations: baseAnimations,

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  },

  effects: {
    blur: baseBlur,
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
      secondary: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
      success: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
      error: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)',
      warning: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      info: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    },
  },
};

// Export the Default theme pair
export const DefaultTheme: ThemePair = {
  light: defaultLight,
  dark: defaultDark,
};
