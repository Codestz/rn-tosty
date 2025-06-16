// LiquidGlass Theme - Inspired by iOS 26 fluid design language
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

  animations: {
    // Use base animations structure - no custom properties
    duration: {
      ...baseAnimations.duration,
      normal: 350, // Slightly longer for fluid feel
      fast: 250,
    },
    easing: {
      ...baseAnimations.easing,
      // iOS prefers smooth easing over bounce
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04)', // Ultra-subtle
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.06)', // Glass-like depth
    lg: '0 8px 20px 0 rgba(0, 0, 0, 0.08)', // Floating glass effect
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.1)', // Deep glass shadow
  },

  effects: {
    blur: {
      ...baseBlur,
      sm: 12, // iOS blur intensity
      md: 20,
      lg: 30,
    },
    opacity: {
      ...baseOpacity,
      // Use only defined opacity values
      overlay: 0.15, // Custom overlay for glass effect
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)', // Blue to purple
      secondary: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
      success: 'linear-gradient(135deg, #30D158 0%, #32D74B 100%)',
      error: 'linear-gradient(135deg, #FF3B30 0%, #FF453A 100%)',
      warning: 'linear-gradient(135deg, #FF9500 0%, #FF9F0A 100%)',
      info: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
    },
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

  animations: {
    duration: {
      ...baseAnimations.duration,
      normal: 350,
      fast: 250,
    },
    easing: {
      ...baseAnimations.easing,
    },
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.2)', // More visible in dark
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 8px 20px 0 rgba(0, 0, 0, 0.4)',
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.5)',
  },

  effects: {
    blur: {
      ...baseBlur,
      sm: 12,
      md: 20,
      lg: 30,
    },
    opacity: {
      ...baseOpacity,
      overlay: 0.25, // Custom overlay for dark glass effect
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
      secondary: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
      success: 'linear-gradient(135deg, #30D158 0%, #32D74B 100%)',
      error: 'linear-gradient(135deg, #FF453A 0%, #FF6961 100%)',
      warning: 'linear-gradient(135deg, #FF9F0A 0%, #FFB340 100%)',
      info: 'linear-gradient(135deg, #0A84FF 0%, #5AC8FA 100%)',
    },
  },
};

// Export the LiquidGlass theme pair
export const LiquidGlassTheme: ThemePair = {
  light: liquidGlassLight,
  dark: liquidGlassDark,
};
