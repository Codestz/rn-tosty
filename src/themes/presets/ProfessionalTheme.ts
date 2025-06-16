// Professional Theme - Corporate, trustworthy design for business applications
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseAnimations,
  baseBorderRadius,
  baseOpacity,
  baseSpacing,
  baseTypography,
  colorUtils,
} from '../base/BaseTheme';

// Professional Light Theme
const professionalLight: Theme = {
  name: 'professional-light',
  mode: 'light',

  colors: {
    // Base colors (corporate and trustworthy)
    primary: '#1E40AF', // Blue 800 (corporate blue)
    secondary: '#64748B', // Slate 500

    // Toast type colors (professional and clear)
    success: '#16A34A', // Green 600 (trustworthy green)
    error: '#DC2626', // Red 600 (clear error)
    warning: '#CA8A04', // Yellow 600 (professional warning)
    info: '#0284C7', // Sky 600 (informative blue)

    // Background system (clean and professional)
    background: '#FFFFFF', // Pure white
    surface: '#F8FAFC', // Slate 50
    surfaceVariant: '#F1F5F9', // Slate 100

    // Text system (high contrast and readable)
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#0F172A', // Slate 900
    onSurfaceVariant: '#334155', // Slate 700

    // Border and dividers (subtle but defined)
    border: '#E2E8F0', // Slate 200
    borderVariant: '#CBD5E1', // Slate 300

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.4),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 16, // Standard professional size
    bodyFontSize: 14,
    fontWeight: {
      ...baseTypography.fontWeight,
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },

  spacing: baseSpacing,

  borderRadius: {
    ...baseBorderRadius,
    sm: 4, // Conservative rounding
    md: 6,
    lg: 8,
    xl: 12,
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 150, // Professional, not too flashy
      normal: 250,
      slow: 400,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material Design easing
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 8, // Subtle blur
      md: 16,
      lg: 24,
    },
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
      secondary: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
      success: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
      error: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      warning: 'linear-gradient(135deg, #CA8A04 0%, #A16207 100%)',
      info: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    },
  },
};

// Professional Dark Theme
const professionalDark: Theme = {
  name: 'professional-dark',
  mode: 'dark',

  colors: {
    // Base colors (professional dark mode)
    primary: '#3B82F6', // Blue 500 (brighter for dark)
    secondary: '#94A3B8', // Slate 400

    // Toast type colors
    success: '#22C55E', // Green 500
    error: '#EF4444', // Red 500
    warning: '#EAB308', // Yellow 500
    info: '#0EA5E9', // Sky 500

    // Background system (professional dark)
    background: '#0F172A', // Slate 900
    surface: '#1E293B', // Slate 800
    surfaceVariant: '#334155', // Slate 700

    // Text system
    onPrimary: '#0F172A',
    onSecondary: '#0F172A',
    onSurface: '#F8FAFC', // Slate 50
    onSurfaceVariant: '#CBD5E1', // Slate 300

    // Border and dividers
    border: '#475569', // Slate 600
    borderVariant: '#64748B', // Slate 500

    // Overlay and shadows
    overlay: colorUtils.addAlpha('#000000', 0.6),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 16,
    bodyFontSize: 14,
    fontWeight: {
      ...baseTypography.fontWeight,
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },

  spacing: baseSpacing,

  borderRadius: {
    ...baseBorderRadius,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
  },

  animations: {
    ...baseAnimations,
    duration: {
      fast: 150,
      normal: 250,
      slow: 400,
    },
    easing: {
      ...baseAnimations.easing,
      spring: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  },

  effects: {
    blur: {
      none: 0,
      sm: 8,
      md: 16,
      lg: 24,
    },
    opacity: baseOpacity,
    gradients: {
      primary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      secondary: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
      success: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
      error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      warning: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
      info: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    },
  },
};

// Export the Professional theme pair
export const ProfessionalTheme: ThemePair = {
  light: professionalLight,
  dark: professionalDark,
};
