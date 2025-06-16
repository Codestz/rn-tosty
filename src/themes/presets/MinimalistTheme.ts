// Minimalist Theme - Ultra-clean design with lots of whitespace
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseAnimations,
  baseBorderRadius,
  baseOpacity,
  baseSpacing,
  baseTypography,
  colorUtils,
} from '../base/BaseTheme';

// Minimalist Light Theme
const minimalistLight: Theme = {
  name: 'minimalist-light',
  mode: 'light',

  colors: {
    // Base colors (very subtle)
    primary: '#000000', // Pure black for maximum contrast
    secondary: '#6B7280', // Neutral gray

    // Toast type colors (muted but clear)
    success: '#059669', // Emerald 600 (darker, more subtle)
    error: '#DC2626', // Red 600
    warning: '#D97706', // Amber 600
    info: '#2563EB', // Blue 600

    // Background system (pure and clean)
    background: '#FFFFFF', // Pure white
    surface: '#FFFFFF', // Pure white (no distinction)
    surfaceVariant: '#FAFAFA', // Very light gray

    // Text system (high contrast)
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#000000', // Pure black
    onSurfaceVariant: '#374151', // Dark gray

    // Border and dividers (very subtle)
    border: '#F3F4F6', // Very light gray
    borderVariant: '#E5E7EB', // Light gray

    // Overlay and shadows (minimal)
    overlay: colorUtils.addAlpha('#000000', 0.3),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 15, // Smaller, more subtle
    bodyFontSize: 13,
    fontWeight: {
      ...baseTypography.fontWeight,
      light: '300',
      regular: '400',
      medium: '500', // Less bold
      semiBold: '600',
      bold: '700',
    },
  },

  spacing: {
    ...baseSpacing,
    md: 20, // More spacing for minimalist feel
    lg: 28,
    xl: 36,
    xxl: 52,
  },

  borderRadius: {
    ...baseBorderRadius,
    sm: 0, // Completely boxed - no rounding
    md: 0, // Completely boxed - no rounding
    lg: 0, // Completely boxed - no rounding
    xl: 0, // Completely boxed - no rounding
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 100, // Faster, more subtle animations
      normal: 200,
      slow: 300,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Gentle easing
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)', // Very subtle shadows
    md: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    lg: '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    xl: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 5, // Minimal blur
      md: 10,
      lg: 15,
    },
    opacity: {
      ...baseOpacity,
      hover: 0.04, // Very subtle interactions
      active: 0.08,
      overlay: 0.1,
    },
    gradients: {
      primary: 'linear-gradient(135deg, #000000 0%, #374151 100%)',
      secondary: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
      success: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      error: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
      warning: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      info: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
    },
  },
};

// Minimalist Dark Theme
const minimalistDark: Theme = {
  name: 'minimalist-dark',
  mode: 'dark',

  colors: {
    // Base colors
    primary: '#FFFFFF', // Pure white for dark mode
    secondary: '#9CA3AF', // Light gray

    // Toast type colors (muted but visible)
    success: '#10B981', // Emerald 500
    error: '#EF4444', // Red 500
    warning: '#F59E0B', // Amber 500
    info: '#3B82F6', // Blue 500

    // Background system (dark and clean)
    background: '#000000', // Pure black
    surface: '#000000', // Pure black
    surfaceVariant: '#0A0A0A', // Very dark gray

    // Text system
    onPrimary: '#000000',
    onSecondary: '#000000',
    onSurface: '#FFFFFF', // Pure white
    onSurfaceVariant: '#D1D5DB', // Light gray

    // Border and dividers (very subtle)
    border: '#1F2937', // Very dark gray
    borderVariant: '#374151', // Dark gray

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.5),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 15,
    bodyFontSize: 13,
    fontWeight: {
      ...baseTypography.fontWeight,
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },

  spacing: {
    ...baseSpacing,
    md: 20,
    lg: 28,
    xl: 36,
    xxl: 52,
  },

  borderRadius: {
    ...baseBorderRadius,
    sm: 0, // Completely boxed - no rounding
    md: 0, // Completely boxed - no rounding
    lg: 0, // Completely boxed - no rounding
    xl: 0, // Completely boxed - no rounding
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 100,
      normal: 200,
      slow: 300,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 4px 8px 0 rgba(0, 0, 0, 0.4)',
    xl: '0 8px 16px 0 rgba(0, 0, 0, 0.5)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 5,
      md: 10,
      lg: 15,
    },
    opacity: {
      ...baseOpacity,
      hover: 0.04,
      active: 0.08,
      overlay: 0.15,
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
      secondary: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      info: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    },
  },
};

// Export the Minimalist theme pair
export const MinimalistTheme: ThemePair = {
  light: minimalistLight,
  dark: minimalistDark,
};
