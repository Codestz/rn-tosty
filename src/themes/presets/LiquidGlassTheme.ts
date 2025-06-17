// LiquidGlass Theme - Inspired by iOS 26 fluid design language
import type { Theme, ThemePair } from '../../types/ThemeTypes';
import {
  baseBorderRadius,
  baseSpacing,
  baseTypography,
  colorUtils,
} from '../base/BaseTheme';

// LiquidGlass Light Theme
const liquidGlassLight: Theme = {
  name: 'liquid-glass-light',
  mode: 'light',

  colors: {
    // Base colors - iOS 26 inspired fluid blues
    primary: '#007AFF', // iOS system blue
    secondary: '#8E8E93', // iOS secondary label

    // Toast type colors - iOS semantic colors
    success: '#30D158', // iOS system green
    error: '#FF3B30', // iOS system red
    warning: '#FF9500', // iOS system orange
    info: '#007AFF', // iOS system blue

    // Background system - Glass-like layers
    background: colorUtils.addAlpha('#FFFFFF', 0.85), // Translucent white
    surface: colorUtils.addAlpha('#F2F2F7', 0.75), // iOS grouped background with alpha
    surfaceVariant: colorUtils.addAlpha('#FFFFFF', 0.65), // Ultra-light glass

    // Text system - iOS typography colors
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#000000', // iOS label
    onSurfaceVariant: '#3C3C43', // iOS secondary label

    // Border and dividers - Subtle glass edges
    border: colorUtils.addAlpha('#C6C6C8', 0.3), // Ultra-light separator
    borderVariant: colorUtils.addAlpha('#C6C6C8', 0.5), // Slightly more visible

    // Overlay and shadows - Soft depth
    overlay: colorUtils.addAlpha('#000000', 0.2),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 17, // iOS standard body size
    bodyFontSize: 15, // iOS footnote size
    fontWeight: {
      ...baseTypography.fontWeight,
      light: '300',
      regular: '400',
      medium: '500', // iOS medium weight
      semiBold: '600',
      bold: '700', // Fixed: use valid font weight
    },
  },

  spacing: {
    ...baseSpacing,
    xs: 4,
    sm: 8,
    md: 16, // iOS standard spacing
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    ...baseBorderRadius,
    sm: 20, // Very rounded - small elements
    md: 28, // Very rounded - medium elements
    lg: 36, // Very rounded - large elements
    xl: 50, // Maximum rounded - extra large elements
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04)', // Ultra-subtle
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.06)', // Glass-like depth
    lg: '0 8px 20px 0 rgba(0, 0, 0, 0.08)', // Floating glass effect
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.1)', // Deep glass shadow
  },
};

// LiquidGlass Dark Theme
const liquidGlassDark: Theme = {
  name: 'liquid-glass-dark',
  mode: 'dark',

  colors: {
    // Base colors - iOS 26 dark mode
    primary: '#0A84FF', // iOS system blue dark
    secondary: '#8E8E93', // iOS secondary label dark

    // Toast type colors - iOS dark semantic colors
    success: '#30D158', // iOS system green dark
    error: '#FF453A', // iOS system red dark
    warning: '#FF9F0A', // iOS system orange dark
    info: '#0A84FF', // iOS system blue dark

    // Background system - Dark glass layers
    background: colorUtils.addAlpha('#000000', 0.85), // Translucent black
    surface: colorUtils.addAlpha('#1C1C1E', 0.75), // iOS grouped background dark with alpha
    surfaceVariant: colorUtils.addAlpha('#2C2C2E', 0.65), // Darker glass layer

    // Text system - iOS dark typography
    onPrimary: '#000000',
    onSecondary: '#000000',
    onSurface: '#FFFFFF', // iOS label dark
    onSurfaceVariant: '#EBEBF5', // iOS secondary label dark

    // Border and dividers - Dark glass edges
    border: colorUtils.addAlpha('#38383A', 0.3), // Ultra-light dark separator
    borderVariant: colorUtils.addAlpha('#38383A', 0.5),

    // Overlay and shadows - Dark depth
    overlay: colorUtils.addAlpha('#000000', 0.4),
    shadow: '#000000',
  },

  typography: {
    ...baseTypography,
    titleFontSize: 17,
    bodyFontSize: 15,
    fontWeight: {
      ...baseTypography.fontWeight,
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700', // Fixed: use valid font weight
    },
  },

  spacing: {
    ...baseSpacing,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    ...baseBorderRadius,
    sm: 20, // Very rounded - small elements
    md: 28, // Very rounded - medium elements
    lg: 36, // Very rounded - large elements
    xl: 50, // Maximum rounded - extra large elements
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.2)', // More visible in dark
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 8px 20px 0 rgba(0, 0, 0, 0.4)',
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.5)',
  },
};

// Export the LiquidGlass theme pair
export const LiquidGlassTheme: ThemePair = {
  light: liquidGlassLight,
  dark: liquidGlassDark,
};
