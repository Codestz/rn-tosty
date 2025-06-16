// Vibrant Theme - Bold gradients and energetic colors for social/gaming apps
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

// Vibrant Light Theme
const vibrantLight: Theme = {
  name: 'vibrant-light',
  mode: 'light',

  colors: {
    // Base colors (bold and energetic)
    primary: '#8B5CF6', // Purple 500
    secondary: '#EC4899', // Pink 500

    // Toast type colors (vibrant and bold)
    success: '#22C55E', // Green 500
    error: '#EF4444', // Red 500
    warning: '#F59E0B', // Amber 500
    info: '#06B6D4', // Cyan 500

    // Background system (bright and clean)
    background: '#FEFEFE', // Almost white
    surface: '#FFFFFF', // Pure white
    surfaceVariant: '#F8FAFC', // Very light

    // Text system
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1F2937', // Dark gray
    onSurfaceVariant: '#374151', // Medium gray

    // Border and dividers (colorful)
    border: '#E5E7EB', // Light gray
    borderVariant: '#D1D5DB', // Medium gray

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.4),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 17, // Larger for impact
    bodyFontSize: 15,
    fontWeight: {
      ...baseTypography.fontWeight,
      medium: '600', // Bolder for vibrant feel
      semiBold: '700',
      bold: '800',
    },
  },

  spacing: baseSpacing,

  borderRadius: {
    ...baseBorderRadius,
    md: 12, // More rounded for playful feel
    lg: 16,
    xl: 20,
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 200, // Slightly slower for dramatic effect
      normal: 350,
      slow: 600,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy spring
    },
  },

  shadows: {
    none: 'none',
    sm: '0 2px 4px 0 rgba(139, 92, 246, 0.1)', // Colored shadows
    md: '0 4px 8px 0 rgba(139, 92, 246, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    lg: '0 8px 16px 0 rgba(139, 92, 246, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px 0 rgba(139, 92, 246, 0.25), 0 8px 16px 0 rgba(0, 0, 0, 0.15)',
  },

  effects: {
    blur: baseBlur,
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #06B6D4 100%)',
      secondary: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
      success: 'linear-gradient(135deg, #22C55E 0%, #10B981 50%, #06B6D4 100%)',
      error: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)',
      warning: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
      info: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
    },
  },
};

// Vibrant Dark Theme
const vibrantDark: Theme = {
  name: 'vibrant-dark',
  mode: 'dark',

  colors: {
    // Base colors (bright for dark mode)
    primary: '#A78BFA', // Purple 400
    secondary: '#F472B6', // Pink 400

    // Toast type colors (bright and visible)
    success: '#4ADE80', // Green 400
    error: '#F87171', // Red 400
    warning: '#FBBF24', // Amber 400
    info: '#22D3EE', // Cyan 400

    // Background system (dark but not pure black)
    background: '#0F0F23', // Very dark purple
    surface: '#1A1A2E', // Dark purple
    surfaceVariant: '#16213E', // Dark blue-purple

    // Text system
    onPrimary: '#0F0F23',
    onSecondary: '#0F0F23',
    onSurface: '#F8FAFC', // Light
    onSurfaceVariant: '#CBD5E1', // Medium light

    // Border and dividers (colorful)
    border: '#374151', // Dark gray
    borderVariant: '#4B5563', // Medium gray

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
      semiBold: '700',
      bold: '800',
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
      normal: 350,
      slow: 600,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  shadows: {
    none: 'none',
    sm: '0 2px 4px 0 rgba(167, 139, 250, 0.2)',
    md: '0 4px 8px 0 rgba(167, 139, 250, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px 0 rgba(167, 139, 250, 0.3), 0 4px 8px 0 rgba(0, 0, 0, 0.4)',
    xl: '0 16px 32px 0 rgba(167, 139, 250, 0.35), 0 8px 16px 0 rgba(0, 0, 0, 0.5)',
  },

  effects: {
    blur: baseBlur,
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)',
      secondary: 'linear-gradient(135deg, #F472B6 0%, #FBBF24 100%)',
      success: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 50%, #22D3EE 100%)',
      error: 'linear-gradient(135deg, #F87171 0%, #F472B6 100%)',
      warning: 'linear-gradient(135deg, #FBBF24 0%, #F472B6 50%, #A78BFA 100%)',
      info: 'linear-gradient(135deg, #22D3EE 0%, #A78BFA 100%)',
    },
  },
};

// Export the Vibrant theme pair
export const VibrantTheme: ThemePair = {
  light: vibrantLight,
  dark: vibrantDark,
};
