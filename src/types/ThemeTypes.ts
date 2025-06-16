// Theme System Types - Comprehensive design system for beautiful toast themes
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
  surfaceVariant: string;

  // Text system
  onPrimary: string;
  onSecondary: string;
  onSurface: string;
  onSurfaceVariant: string;

  // Border and dividers
  border: string;
  borderVariant: string;

  // Overlay and shadows
  overlay: string;
  shadow: string;
}

export interface ThemeTypography {
  // Font families
  titleFontFamily: string;
  bodyFontFamily: string;

  // Font sizes
  titleFontSize: number;
  bodyFontSize: number;
  captionFontSize: number;

  // Font weights
  fontWeight: {
    light: '100' | '200' | '300' | '400';
    regular: '400' | '500';
    medium: '500' | '600';
    semiBold: '600' | '700';
    bold: '700' | '800' | '900';
  };

  // Line heights
  titleLineHeight: number;
  bodyLineHeight: number;
  captionLineHeight: number;
}

export interface ThemeSpacing {
  xs: number; // 4
  sm: number; // 8
  md: number; // 16
  lg: number; // 24
  xl: number; // 32
  xxl: number; // 48
}

export interface ThemeBorderRadius {
  none: number; // 0
  sm: number; // 4
  md: number; // 8
  lg: number; // 12
  xl: number; // 16
  full: number; // 999
}

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeAnimations {
  duration: {
    fast: number; // 150ms
    normal: number; // 300ms
    slow: number; // 500ms
  };

  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
}

export interface ThemeEffects {
  // Glassmorphism
  blur: {
    none: number;
    sm: number;
    md: number;
    lg: number;
  };

  // Opacity levels
  opacity: {
    disabled: number;
    hover: number;
    active: number;
    overlay: number;
  };

  // Gradient support
  gradients: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

// Complete theme interface
export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  animations: ThemeAnimations;
  effects: ThemeEffects;
}

// Theme pair for light/dark modes
export interface ThemePair {
  light: Theme;
  dark: Theme;
}

// Available theme names
export type ThemeName =
  | 'modern'
  | 'glassmorphism'
  | 'minimalist'
  | 'vibrant'
  | 'professional';

// Theme registry
export interface ThemeRegistry {
  modern: ThemePair;
  glassmorphism: ThemePair;
  minimalist: ThemePair;
  vibrant: ThemePair;
  professional: ThemePair;
}

// Theme configuration for toast
export interface ToastThemeConfig {
  theme?: ThemeName | Theme;
  mode?: 'light' | 'dark' | 'auto'; // auto follows system
}

// Legacy support - keeping existing simple theme names
export type LegacyThemeName =
  | 'modern-light'
  | 'modern-dark'
  | 'glassmorphism-light'
  | 'glassmorphism-dark'
  | 'minimalist-light'
  | 'minimalist-dark'
  | 'vibrant-light'
  | 'vibrant-dark'
  | 'professional-light'
  | 'professional-dark';

// Legacy ThemeObject type (for backward compatibility)
export type ThemeObject = Theme;
