// Base Theme Foundation - Shared design tokens for all themes
import type {
  ThemeAnimations,
  ThemeBorderRadius,
  ThemeSpacing,
  ThemeTypography,
} from '../../types/ThemeTypes';

// Shared spacing system (consistent across all themes)
export const baseSpacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Shared border radius system
export const baseBorderRadius: ThemeBorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Shared animation system
export const baseAnimations: ThemeAnimations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Base typography system
export const baseTypography: ThemeTypography = {
  titleFontFamily: 'System',
  bodyFontFamily: 'System',
  titleFontSize: 16,
  bodyFontSize: 14,
  captionFontSize: 12,
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  titleLineHeight: 20,
  bodyLineHeight: 18,
  captionLineHeight: 16,
};

// Common color utilities
export const colorUtils = {
  // Add alpha to hex color
  addAlpha: (hex: string, alpha: number): string => {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');
    return `${hex}${alphaHex}`;
  },

  // Lighten/darken color (simple utility)
  adjustBrightness: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  },
};

// Base blur values for glassmorphism
export const baseBlur = {
  none: 0,
  sm: 10,
  md: 20,
  lg: 40,
};

// Base opacity values
export const baseOpacity = {
  disabled: 0.38,
  hover: 0.08,
  active: 0.12,
  overlay: 0.16,
};
