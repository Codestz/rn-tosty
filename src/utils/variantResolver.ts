// Modern Variant Resolver - Clean integration between variants and toast components
import { VariantManager } from '../services/VariantManager';
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Theme } from '../types/ThemeTypes';
import type { Toast, ToastType } from '../types/ToastTypes';
import type {
  ResolvedVariant,
  VariantResolutionContext,
} from '../types/VariantTypes';

/**
 * Resolves the appropriate variant for a toast and returns complete styling information
 */
export const resolveToastVariant = (
  toast: Toast,
  theme: Theme
): ResolvedVariant => {
  const variantManager = VariantManager.getInstance();

  // Use specified variant or default to 'default'
  const variantName = toast.config.variant || 'default';

  // Create resolution context
  const context: VariantResolutionContext = {
    toastType: toast.config.type || 'info',
    isDarkMode: theme.mode === 'dark',
    currentTheme: theme,
  };

  try {
    // Resolve the variant
    const resolvedVariant = variantManager.resolveVariant(variantName, context);

    return resolvedVariant;
  } catch (error) {
    const { logWarn } = require('./logger');
    logWarn(
      `Failed to resolve variant '${variantName}', falling back to default:`,
      error
    );
    // Fallback to default variant
    return variantManager.resolveVariant('default', context);
  }
};

/**
 * Converts theme to React Native StyleSheet-compatible object
 */
export const variantStyleToRNStyle = (
  theme: Theme,
  _themeContext?: Theme
): Record<string, any> => {
  const rnStyle: Record<string, any> = {};

  // Background
  rnStyle.backgroundColor = theme.colors.surface;

  // Border
  rnStyle.borderColor = theme.colors.border;
  rnStyle.borderWidth = 1;

  // Border radius
  if (typeof theme.borderRadius === 'number') {
    rnStyle.borderRadius = theme.borderRadius;
  } else {
    // Resolve string border radius to number
    const radiusMap = {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    };
    rnStyle.borderRadius = radiusMap[theme.borderRadius] || 8;
  }

  // Padding based on theme spacing
  rnStyle.paddingHorizontal = theme.spacing.container;
  rnStyle.paddingVertical = theme.spacing.container * 0.75;

  // Shadow - directly use theme shadow configuration
  if (theme.shadows) {
    rnStyle.shadowColor = theme.shadows.shadowColor;
    rnStyle.shadowOpacity = theme.shadows.shadowOpacity;
    rnStyle.shadowRadius = theme.shadows.shadowRadius;
    rnStyle.shadowOffset = theme.shadows.shadowOffset;
    rnStyle.elevation = theme.shadows.elevation;
  }

  return rnStyle;
};

/**
 * Gets text styles from theme
 */
export const getVariantTextStyles = (
  theme: Theme,
  isTitle: boolean = false
): Record<string, any> => {
  const textStyle: Record<string, any> = {};

  if (isTitle) {
    textStyle.color = theme.colors.onSurface;
    textStyle.fontSize = theme.typography.title.size;
    textStyle.fontWeight = theme.typography.title.weight;
    textStyle.lineHeight = theme.typography.title.lineHeight;
  } else {
    textStyle.color = theme.colors.onSurface;
    textStyle.fontSize = theme.typography.description.size;
    textStyle.fontWeight = theme.typography.description.weight;
    textStyle.lineHeight = theme.typography.description.lineHeight;
  }

  return textStyle;
};

/**
 * Gets icon configuration from resolved variant
 */
export const getVariantIconConfig = (
  resolvedVariant: ResolvedVariant
): {
  shouldShowIcon: boolean;
  iconSize: 'small' | 'medium' | 'large' | number;
  iconColor?: string;
  iconPosition: 'left' | 'right' | 'top' | 'none';
} => {
  // Extract icon configuration from the variant's style (which contains computed values)
  const iconSize = resolvedVariant.style?.iconSize || 'medium';
  const iconPosition = resolvedVariant.style?.iconPosition || 'left';

  return {
    shouldShowIcon: resolvedVariant.iconConfig?.showIcon ?? true,
    iconSize,
    iconColor: resolvedVariant.theme.colors.onSurface,
    iconPosition,
  };
};

/**
 * Gets behavior configuration from resolved variant
 */
export const getVariantBehavior = (resolvedVariant: ResolvedVariant) => {
  return {
    autoDismiss: resolvedVariant.behavior?.autoDismiss ?? true,
    defaultDuration: resolvedVariant.behavior?.defaultDuration ?? 4000,
    dismissOnTap: resolvedVariant.behavior?.dismissOnTap ?? true,
    priority: resolvedVariant.behavior?.priority ?? 'medium',
    stackable: resolvedVariant.behavior?.stackable ?? true,
    replaceExisting: resolvedVariant.behavior?.replaceExisting ?? false,
  };
};

/**
 * Selects optimal variant based on toast type and context
 */
export const selectOptimalVariant = (
  toastType: ToastType,
  _hasTitle: boolean,
  _messageLength: number,
  _theme: Theme
): string => {
  // Smart variant selection based on toast type
  switch (toastType) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'default';
  }
};

/**
 * Smart variant resolution with fallbacks and optimizations
 */
export const resolveToastVariantSmart = (
  toast: Toast,
  theme: Theme,
  config?: ToastProviderConfig
): ResolvedVariant => {
  // If variant is explicitly specified, use it
  if (toast.config.variant) {
    return resolveToastVariant(toast, theme);
  }

  // Use global default variant if configured
  if (config?.defaultVariant) {
    const toastWithDefaultVariant: Toast = {
      ...toast,
      config: {
        ...toast.config,
        variant: config.defaultVariant,
      },
    };
    return resolveToastVariant(toastWithDefaultVariant, theme);
  }

  // Otherwise, use smart selection
  const optimalVariant = selectOptimalVariant(
    toast.config.type || 'info',
    !!toast.config.title,
    toast.config.message?.length || 0,
    theme
  );

  // Create a toast config with the optimal variant
  const optimizedToast: Toast = {
    ...toast,
    config: {
      ...toast.config,
      variant: optimalVariant,
    },
  };

  return resolveToastVariant(optimizedToast, theme);
};
