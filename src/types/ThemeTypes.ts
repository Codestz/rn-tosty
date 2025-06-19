// Theme System Types - Simplified design system focused on toast needs
export interface ThemeColors {
  // Base colors
  primary: string;
  secondary: string;

  // Toast type colors
  success: string;
  error: string;
  warning: string;
  info: string;

  // Background system
  background: string;
  surface: string;

  // Text system
  onPrimary: string;
  onSecondary: string;
  onSurface: string;

  // Border and dividers
  border: string;

  // Overlay and shadows
  overlay: string;
  shadow: string;
}

// Simplified typography - only title and description for toasts
export interface ThemeTypography {
  title: {
    size: number;
    weight: string;
    lineHeight: number;
  };
  description: {
    size: number;
    weight: string;
    lineHeight: number;
  };
}

// Toast-specific spacing based on layoutUtils usage
export interface ThemeSpacing {
  icon: number;
  container: number;
  text: number;
}

// Simple border radius - number or predefined string
export type ThemeBorderRadius = number | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Shadow configuration for React Native compatibility
export interface ThemeShadows {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  elevation: number; // Android shadow
}

// Progress bar theme configuration
export interface ThemeProgressBar {
  /**
   * Track (background) configuration
   */
  track: {
    backgroundColor: string;
    borderRadius: number;
    height: number;
    opacity?: number;
  };

  /**
   * Progress bar (foreground) configuration
   */
  bar: {
    borderRadius: number;
    height: number;
    // Gradient configuration (optional)
    gradient?: {
      colors: string[];
      locations?: number[];
      start?: { x: number; y: number };
      end?: { x: number; y: number };
    };
  };

  /**
   * Animation configuration
   */
  animation: {
    duration: number;
    easing: 'linear' | 'ease-out' | 'ease-in-out';
  };

  /**
   * Positioning configuration
   */
  positioning: {
    defaultPosition: 'top' | 'bottom';
    marginTop: number;
    marginBottom: number;
  };
}

// Helper function to resolve border radius strings to numbers
export const resolveBorderRadius = (
  borderRadius: ThemeBorderRadius
): number => {
  if (typeof borderRadius === 'number') {
    return borderRadius;
  }

  const radiusMap = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  };

  return radiusMap[borderRadius] || 8;
};

// Complete theme interface - simplified
export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  progressBar: ThemeProgressBar;
}

// Theme pair for light/dark modes
export interface ThemePair {
  light: Theme;
  dark: Theme;
}

// Available theme names
export type ThemeName = 'default' | 'warmSunset' | 'oceanBreeze' | 'forestGlow';

// Theme registry
export interface ThemeRegistry {
  default: ThemePair;
  warmSunset: ThemePair;
  oceanBreeze: ThemePair;
  forestGlow: ThemePair;
}

// Theme configuration for toast
export interface ToastThemeConfig {
  theme?: ThemeName | Theme;
  mode?: 'light' | 'dark' | 'auto'; // auto follows system
}
