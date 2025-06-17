// Icon Resolver - Utility for resolving icon configurations
import React from 'react';
import type {
  BaseIconProps,
  CustomIconComponent,
  IconConfig,
  IconSize,
  ResolvedIconConfig,
} from '../types/IconTypes';
import type { Theme } from '../types/ThemeTypes';
import type { ToastType } from '../types/ToastTypes';

// Default icon components
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '../components/ToastIcon/icons';

// Icon size mapping
const ICON_SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

/**
 * Resolves icon size to actual pixel value
 */
export const resolveIconSize = (size: IconSize): number => {
  if (typeof size === 'number') {
    return size;
  }
  return ICON_SIZES[size];
};

/**
 * Creates a wrapper component for default icons to match CustomIconComponent interface
 */
const createDefaultIconWrapper = (
  IconComponent: React.FC<{ iconSize: number; iconColor: string }>
): CustomIconComponent => {
  return ({ size, color }: BaseIconProps) => {
    return React.createElement(IconComponent, {
      iconSize: size,
      iconColor: color,
    });
  };
};

// Default icon set wrapped for consistency
const DEFAULT_ICON_SET = {
  success: createDefaultIconWrapper(SuccessIcon),
  error: createDefaultIconWrapper(ErrorIcon),
  warning: createDefaultIconWrapper(WarningIcon),
  info: createDefaultIconWrapper(InfoIcon),
  custom: createDefaultIconWrapper(InfoIcon), // Fallback to info icon
};

/**
 * Resolves the appropriate icon component and configuration for a toast type
 */
export const resolveIconConfig = (
  type: ToastType,
  theme: Theme,
  iconConfig?: IconConfig,
  globalConfig?: {
    size?: IconSize;
    animated?: boolean;
    color?: string;
  },
  toastIconOverride?: any // Per-toast icon override
): ResolvedIconConfig => {
  // Get type-specific config
  const typeConfig = iconConfig?.[type];

  // Resolve component with priority: toast override > type config > icon set > default
  let component: CustomIconComponent;

  if (toastIconOverride === false) {
    // If explicitly set to false, use a transparent/empty component
    component = () => null;
  } else if (typeof toastIconOverride === 'function') {
    // Direct component override
    component = toastIconOverride;
  } else if (toastIconOverride && typeof toastIconOverride === 'object') {
    // ToastTypeIconConfig override
    if (toastIconOverride.component) {
      component = toastIconOverride.component;
    } else {
      // Use default but apply override config later
      component = DEFAULT_ICON_SET[type] || DEFAULT_ICON_SET.info;
    }
  } else if (typeConfig?.component) {
    // Use type-specific custom component
    component = typeConfig.component;
  } else if (iconConfig?.iconSet?.[type]) {
    // Use custom icon set
    component = iconConfig.iconSet[type];
  } else {
    // Use default icon
    component = DEFAULT_ICON_SET[type] || DEFAULT_ICON_SET.info;
  }

  // Resolve size with priority: toast override > type config > global > default
  const size = resolveIconSize(
    (toastIconOverride && typeof toastIconOverride === 'object'
      ? toastIconOverride.size
      : undefined) ??
      typeConfig?.size ??
      globalConfig?.size ??
      iconConfig?.defaultSize ??
      'medium'
  );

  // Resolve color with priority: toast override > type config > global > default
  const color =
    (toastIconOverride && typeof toastIconOverride === 'object'
      ? toastIconOverride.color
      : undefined) ??
    typeConfig?.color ??
    globalConfig?.color ??
    getDefaultIconColor(type, theme);

  // Resolve animation with priority: toast override > type config > global > default
  const animated =
    (toastIconOverride && typeof toastIconOverride === 'object'
      ? toastIconOverride.animated
      : undefined) ??
    typeConfig?.animated ??
    globalConfig?.animated ??
    iconConfig?.defaultAnimated ??
    true;

  return {
    component,
    size,
    color,
    animated,
  };
};

/**
 * Gets the default icon color based on toast type and theme
 */
const getDefaultIconColor = (type: ToastType, theme: Theme): string => {
  const isGlassmorphism = theme.name.includes('liquidGlass');

  if (isGlassmorphism) {
    // For glassmorphism, use theme colors
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.primary;
    }
  }

  // For other themes, use white for contrast on colored backgrounds
  return '#FFFFFF';
};

/**
 * Resolves loading icon color based on variant context
 * This ensures loading icons match the text/icon color of the variant
 */
export const resolveLoadingIconColor = (
  theme: Theme,
  explicitColor?: string,
  variantTextColor?: string,
  variantIconColor?: string
): string => {
  // Priority: explicit color > variant icon color > variant text color > theme text color
  if (explicitColor) {
    return explicitColor;
  }

  if (variantIconColor) {
    return variantIconColor;
  }

  if (variantTextColor) {
    return variantTextColor;
  }

  // Default to the standard text color
  return theme.colors.onSurface;
};

/**
 * Validates that a custom icon component has the correct interface
 */
export const validateCustomIcon = (
  component: any,
  iconName: string
): component is CustomIconComponent => {
  if (typeof component !== 'function') {
    const { logWarn } = require('./logger');
    logWarn(`Custom icon "${iconName}" must be a React component`);
    return false;
  }

  // Additional runtime validation could be added here
  return true;
};

/**
 * Creates a custom icon component from react-native-vector-icons
 */
export const createVectorIcon = (
  IconLibrary: any,
  iconName: string,
  defaultSize: number = 20
): CustomIconComponent => {
  return ({ size = defaultSize, color }: BaseIconProps) => {
    return React.createElement(IconLibrary, { name: iconName, size, color });
  };
};

/**
 * Helper to create icon configurations for common use cases
 */
export const createIconConfig = {
  // Override specific icon types
  withCustomIcons: (
    customIcons: Partial<IconConfig['iconSet']>
  ): IconConfig => ({
    iconSet: {
      ...DEFAULT_ICON_SET,
      ...customIcons,
    },
  }),

  // Set global icon properties
  withGlobalSettings: (settings: {
    size?: IconSize;
    animated?: boolean;
  }): IconConfig => ({
    defaultSize: settings.size,
    defaultAnimated: settings.animated,
  }),

  // Override individual toast type settings
  withTypeOverrides: (overrides: {
    [K in ToastType]?: {
      component?: CustomIconComponent;
      size?: IconSize;
      color?: string;
      animated?: boolean;
    };
  }): IconConfig => overrides,
};
