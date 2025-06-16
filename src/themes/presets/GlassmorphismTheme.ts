// Glassmorphism Theme - Frosted glass effects with premium iOS-inspired feel
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseAnimations,
  baseBorderRadius,
  baseOpacity,
  baseSpacing,
  baseTypography,
  colorUtils,
} from '../base/BaseTheme';

// Glassmorphism Light Theme
const glassmorphismLight: Theme = {
  name: 'glassmorphism-light',
  mode: 'light',

  colors: {
    // Base colors with transparency
    primary: '#007AFF', // iOS Blue
    secondary: '#8E8E93', // iOS Gray

    // Toast type colors (vibrant for glass effect)
    success: '#30D158', // iOS Green
    error: '#FF3B30', // iOS Red
    warning: '#FF9500', // iOS Orange
    info: '#007AFF', // iOS Blue

    // Background system (semi-transparent)
    background: colorUtils.addAlpha('#FFFFFF', 0.8), // 80% white
    surface: colorUtils.addAlpha('#FFFFFF', 0.25), // 25% white (glass effect)
    surfaceVariant: colorUtils.addAlpha('#F2F2F7', 0.6), // 60% light gray

    // Text system (high contrast for readability)
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1C1C1E', // iOS Dark
    onSurfaceVariant: '#3A3A3C', // iOS Dark Gray

    // Border and dividers (subtle glass borders)
    border: colorUtils.addAlpha('#C7C7CC', 0.3), // 30% gray
    borderVariant: colorUtils.addAlpha('#C7C7CC', 0.5), // 50% gray

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.4),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 17, // iOS standard
    bodyFontSize: 15, // iOS standard
    fontWeight: {
      ...baseTypography.fontWeight,
      medium: '600',
      semiBold: '600',
    },
  },

  spacing: baseSpacing,

  borderRadius: {
    ...baseBorderRadius,
    md: 12, // More rounded for iOS feel
    lg: 16,
    xl: 20,
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 200, // Slightly slower for glass effect
      normal: 400,
      slow: 600,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // iOS-like spring
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    lg: '0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.2), 0 8px 16px 0 rgba(0, 0, 0, 0.15)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 20, // More blur for glass effect
      md: 40,
      lg: 60,
    },
    opacity: {
      ...baseOpacity,
      overlay: 0.25, // More transparent overlays
    },
    gradients: {
      primary:
        'linear-gradient(135deg, rgba(0, 122, 255, 0.8) 0%, rgba(0, 122, 255, 0.6) 100%)',
      secondary:
        'linear-gradient(135deg, rgba(142, 142, 147, 0.8) 0%, rgba(142, 142, 147, 0.6) 100%)',
      success:
        'linear-gradient(135deg, rgba(48, 209, 88, 0.8) 0%, rgba(48, 209, 88, 0.6) 100%)',
      error:
        'linear-gradient(135deg, rgba(255, 59, 48, 0.8) 0%, rgba(255, 59, 48, 0.6) 100%)',
      warning:
        'linear-gradient(135deg, rgba(255, 149, 0, 0.8) 0%, rgba(255, 149, 0, 0.6) 100%)',
      info: 'linear-gradient(135deg, rgba(0, 122, 255, 0.8) 0%, rgba(0, 122, 255, 0.6) 100%)',
    },
  },
};

// Glassmorphism Dark Theme
const glassmorphismDark: Theme = {
  name: 'glassmorphism-dark',
  mode: 'dark',

  colors: {
    // Base colors (brighter for dark mode)
    primary: '#0A84FF', // iOS Blue Dark
    secondary: '#98989D', // iOS Gray Dark

    // Toast type colors
    success: '#32D74B', // iOS Green Dark
    error: '#FF453A', // iOS Red Dark
    warning: '#FF9F0A', // iOS Orange Dark
    info: '#0A84FF', // iOS Blue Dark

    // Background system (dark glass)
    background: colorUtils.addAlpha('#000000', 0.8), // 80% black
    surface: colorUtils.addAlpha('#1C1C1E', 0.6), // 60% dark (glass effect)
    surfaceVariant: colorUtils.addAlpha('#2C2C2E', 0.7), // 70% darker gray

    // Text system
    onPrimary: '#000000',
    onSecondary: '#000000',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#EBEBF5', // iOS Light Gray Dark

    // Border and dividers (dark glass borders)
    border: colorUtils.addAlpha('#545458', 0.4), // 40% gray
    borderVariant: colorUtils.addAlpha('#545458', 0.6), // 60% gray

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.6),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 17,
    bodyFontSize: 15,
    fontWeight: {
      ...baseTypography.fontWeight,
      medium: '600',
      semiBold: '600',
    },
  },

  spacing: baseSpacing,

  borderRadius: {
    ...baseBorderRadius,
    md: 12,
    lg: 16,
    xl: 20,
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 200,
      normal: 400,
      slow: 600,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px 0 rgba(0, 0, 0, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.4)',
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.6), 0 8px 16px 0 rgba(0, 0, 0, 0.5)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 20,
      md: 40,
      lg: 60,
    },
    opacity: {
      ...baseOpacity,
      overlay: 0.3,
    },
    gradients: {
      primary:
        'linear-gradient(135deg, rgba(10, 132, 255, 0.8) 0%, rgba(10, 132, 255, 0.6) 100%)',
      secondary:
        'linear-gradient(135deg, rgba(152, 152, 157, 0.8) 0%, rgba(152, 152, 157, 0.6) 100%)',
      success:
        'linear-gradient(135deg, rgba(50, 215, 75, 0.8) 0%, rgba(50, 215, 75, 0.6) 100%)',
      error:
        'linear-gradient(135deg, rgba(255, 69, 58, 0.8) 0%, rgba(255, 69, 58, 0.6) 100%)',
      warning:
        'linear-gradient(135deg, rgba(255, 159, 10, 0.8) 0%, rgba(255, 159, 10, 0.6) 100%)',
      info: 'linear-gradient(135deg, rgba(10, 132, 255, 0.8) 0%, rgba(10, 132, 255, 0.6) 100%)',
    },
  },
};

// Export the Glassmorphism theme pair
export const GlassmorphismTheme: ThemePair = {
  light: glassmorphismLight,
  dark: glassmorphismDark,
};
