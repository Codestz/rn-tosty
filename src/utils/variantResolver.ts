// Modern Variant Resolver - Clean integration between variants and toast components
import { VariantManager } from '../services/VariantManager';
import type { Theme } from '../types/ThemeTypes';
import type { Toast, ToastType } from '../types/ToastTypes';
import type {
  ResolvedVariant,
  VariantResolutionContext,
  VariantStyle,
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
    theme,
    toastType: toast.config.type || 'info',
    isDarkMode: theme.mode === 'dark',
  };

  try {
    // Resolve the variant
    const resolvedVariant = variantManager.resolveVariant(variantName, context);

    // Apply any toast-specific style overrides
    if (toast.config.styleOverrides) {
      resolvedVariant.style = {
        ...resolvedVariant.style,
        ...toast.config.styleOverrides,
      };
    }

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
 * Converts variant style to React Native StyleSheet-compatible object
 */
export const variantStyleToRNStyle = (
  variantStyle: VariantStyle,
  _theme: Theme
): Record<string, any> => {
  const rnStyle: Record<string, any> = {};

  // Background
  if (
    variantStyle.backgroundColor &&
    variantStyle.backgroundColor !== 'transparent'
  ) {
    rnStyle.backgroundColor = variantStyle.backgroundColor;

    // Apply background opacity if specified
    if (
      variantStyle.backgroundOpacity !== undefined &&
      variantStyle.backgroundOpacity < 1
    ) {
      // Convert hex to rgba if needed
      const color = variantStyle.backgroundColor;
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        rnStyle.backgroundColor = `rgba(${r}, ${g}, ${b}, ${variantStyle.backgroundOpacity})`;
      }
    }
  }

  // Gradient support (for future enhancement)
  if (variantStyle.backgroundGradient) {
    // This could be enhanced with react-native-linear-gradient
    rnStyle.backgroundGradient = variantStyle.backgroundGradient;
  }

  // Border
  if (variantStyle.borderWidth && variantStyle.borderWidth > 0) {
    rnStyle.borderWidth = variantStyle.borderWidth;
    if (variantStyle.borderColor) {
      rnStyle.borderColor = variantStyle.borderColor;
    }
    if (variantStyle.borderStyle) {
      rnStyle.borderStyle = variantStyle.borderStyle;
    }
  }

  // Border radius
  if (variantStyle.borderRadius !== undefined) {
    rnStyle.borderRadius = variantStyle.borderRadius;
  }

  // Padding
  if (variantStyle.padding) {
    if (typeof variantStyle.padding === 'number') {
      rnStyle.padding = variantStyle.padding;
    } else {
      if (variantStyle.padding.horizontal !== undefined) {
        rnStyle.paddingHorizontal = variantStyle.padding.horizontal;
      }
      if (variantStyle.padding.vertical !== undefined) {
        rnStyle.paddingVertical = variantStyle.padding.vertical;
      }
    }
  }

  // Margin
  if (variantStyle.margin) {
    if (typeof variantStyle.margin === 'number') {
      rnStyle.margin = variantStyle.margin;
    } else {
      if (variantStyle.margin.horizontal !== undefined) {
        rnStyle.marginHorizontal = variantStyle.margin.horizontal;
      }
      if (variantStyle.margin.vertical !== undefined) {
        rnStyle.marginVertical = variantStyle.margin.vertical;
      }
    }
  }

  // Dimensions
  if (variantStyle.minHeight) {
    rnStyle.minHeight = variantStyle.minHeight;
  }
  if (variantStyle.maxWidth) {
    rnStyle.maxWidth = variantStyle.maxWidth;
  }

  // Shadow (iOS)
  if (
    variantStyle.shadowColor &&
    variantStyle.shadowOpacity &&
    variantStyle.shadowOpacity > 0
  ) {
    rnStyle.shadowColor = variantStyle.shadowColor;
    rnStyle.shadowOpacity = variantStyle.shadowOpacity;
    rnStyle.shadowRadius = variantStyle.shadowRadius || 4;
    rnStyle.shadowOffset = variantStyle.shadowOffset || { width: 0, height: 2 };
  }

  // Elevation (Android)
  if (variantStyle.elevation) {
    rnStyle.elevation = variantStyle.elevation;
  }

  return rnStyle;
};

/**
 * Gets text styles from variant
 */
export const getVariantTextStyles = (
  variantStyle: VariantStyle,
  isTitle: boolean = false
): Record<string, any> => {
  const textStyle: Record<string, any> = {};

  if (isTitle && variantStyle.titleColor) {
    textStyle.color = variantStyle.titleColor;
  } else if (!isTitle && variantStyle.textColor) {
    textStyle.color = variantStyle.textColor;
  }

  if (variantStyle.textAlign) {
    textStyle.textAlign = variantStyle.textAlign;
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
  return {
    shouldShowIcon:
      resolvedVariant.iconConfig.showIcon &&
      resolvedVariant.style.iconPosition !== 'none',
    iconSize: resolvedVariant.style.iconSize,
    iconColor: resolvedVariant.style.iconColor,
    iconPosition: resolvedVariant.style.iconPosition,
  };
};

/**
 * Gets behavior configuration from resolved variant
 */
export const getVariantBehavior = (resolvedVariant: ResolvedVariant) => {
  return {
    autoDismiss: resolvedVariant.behavior.autoDismiss,
    defaultDuration: resolvedVariant.behavior.defaultDuration,
    dismissOnTap: resolvedVariant.behavior.dismissOnTap,
    priority: resolvedVariant.behavior.priority,
    stackable: resolvedVariant.behavior.stackable,
    replaceExisting: resolvedVariant.behavior.replaceExisting,
  };
};

/**
 * Smart variant selection based on context
 */
export const selectOptimalVariant = (
  toastType: ToastType,
  _hasTitle: boolean,
  _messageLength: number,
  _theme: Theme
): string => {
  // Smart variant selection logic - only use available variants

  // For type-specific filled variants
  if (['success', 'error', 'warning', 'info'].includes(toastType)) {
    return `${toastType}-filled`;
  }

  // Default fallback
  return 'default';
};

/**
 * Enhanced variant resolution with smart defaults
 */
export const resolveToastVariantSmart = (
  toast: Toast,
  theme: Theme
): ResolvedVariant => {
  // If no variant specified, use smart selection
  if (!toast.config.variant) {
    const optimalVariant = selectOptimalVariant(
      toast.config.type || 'info',
      !!toast.config.title,
      toast.config.message?.length || 0,
      theme
    );

    // Create a new toast config with the optimal variant
    const enhancedToast = {
      ...toast,
      config: {
        ...toast.config,
        variant: optimalVariant,
      },
    };

    return resolveToastVariant(enhancedToast, theme);
  }

  return resolveToastVariant(toast, theme);
};
