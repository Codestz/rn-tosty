// Icon Configuration Types - Flexible icon system for custom icons
import type { ComponentType } from 'react';
import type { Theme } from './ThemeTypes';

// Base icon component props that all custom icons should accept
export interface BaseIconProps {
  size: number;
  color: string;
  theme: Theme;
}

// Custom icon component type
export type CustomIconComponent = ComponentType<BaseIconProps>;

// Icon configuration for individual toast types
export interface ToastTypeIconConfig {
  component?: CustomIconComponent;
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  animated?: boolean;
}

// Complete icon configuration
export interface IconConfig {
  // Global icon settings
  defaultSize?: 'small' | 'medium' | 'large' | number;
  defaultAnimated?: boolean;

  // Per-type icon overrides
  success?: ToastTypeIconConfig;
  error?: ToastTypeIconConfig;
  warning?: ToastTypeIconConfig;
  info?: ToastTypeIconConfig;
  custom?: ToastTypeIconConfig;

  // Custom icon set (replaces all default icons)
  iconSet?: {
    success: CustomIconComponent;
    error: CustomIconComponent;
    warning: CustomIconComponent;
    info: CustomIconComponent;
    custom?: CustomIconComponent;
  };
}

// Icon resolver result
export interface ResolvedIconConfig {
  component: CustomIconComponent;
  size: number;
  color: string;
  animated: boolean;
}

// Preset icon configurations
export interface IconPreset {
  name: string;
  description: string;
  config: IconConfig;
}

// Built-in icon presets
export const IconPresets = {
  // Default rn-tosty icons
  default: (): IconConfig => ({
    defaultSize: 'medium',
    defaultAnimated: true,
  }),

  // Larger icons for better visibility
  large: (): IconConfig => ({
    defaultSize: 'large',
    defaultAnimated: true,
  }),

  // Smaller, subtle icons
  minimal: (): IconConfig => ({
    defaultSize: 'small',
    defaultAnimated: false,
  }),

  // No animations for performance
  static: (): IconConfig => ({
    defaultSize: 'medium',
    defaultAnimated: false,
  }),
} as const;

// Helper type for icon size resolution
export type IconSize = 'small' | 'medium' | 'large' | number;

// Icon theme integration
export interface IconThemeConfig {
  // Whether icons should adapt to theme colors
  useThemeColors?: boolean;

  // Custom color overrides per theme mode
  lightModeColors?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };

  darkModeColors?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
}
