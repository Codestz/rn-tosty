/**
 * Custom hook for managing toast styles
 * Handles variant resolution, container styles, text styles, and layout calculations
 */
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Theme } from '../types/ThemeTypes';
import type { Toast } from '../types/ToastTypes';
import { calculateLayout, getTextAlignmentStyle } from '../utils/layoutUtils';
import {
  getVariantBehavior,
  getVariantIconConfig,
  getVariantTextStyles,
  resolveToastVariantSmart,
  variantStyleToRNStyle,
} from '../utils/variantResolver';

export const useToastStyles = (
  toast: Toast,
  theme: Theme,
  config: ToastProviderConfig
) => {
  // Resolve variant configuration with smart defaults
  const resolvedVariant = useMemo(() => {
    return resolveToastVariantSmart(toast, theme, config);
  }, [toast, theme, config]);

  // Get variant-based configurations
  const variantBehavior = useMemo(() => {
    return getVariantBehavior(resolvedVariant);
  }, [resolvedVariant]);

  const iconConfig = useMemo(() => {
    return getVariantIconConfig(resolvedVariant);
  }, [resolvedVariant]);

  // Calculate layout configuration - merge global config with per-toast config
  const layout = useMemo(() => {
    // Merge global layout config with per-toast layout config
    // Per-toast config takes precedence over global config
    const mergedLayoutConfig = {
      ...config?.layout,
      ...toast.config.layout,
    };
    return calculateLayout(mergedLayoutConfig, theme);
  }, [config?.layout, toast.config.layout, theme]);

  // Create container style using modern variant system
  const variantContainerStyle = useMemo(() => {
    return variantStyleToRNStyle(resolvedVariant.theme, theme);
  }, [resolvedVariant.theme, theme]);

  const containerStyle = useMemo(
    () => [
      baseStyles.container,
      variantContainerStyle,
      {
        flexDirection: layout.flexDirection,
      },
    ],
    [variantContainerStyle, layout.flexDirection]
  );

  // Create text container style with layout-aware alignment
  const textContainerStyle = useMemo(
    () => [
      baseStyles.textContainer,
      {
        paddingHorizontal: layout.spacing.textPadding,
      },
      iconConfig.iconPosition === 'top' && baseStyles.textContainerWithTopIcon,
    ],
    [layout.spacing.textPadding, iconConfig.iconPosition]
  );

  // Create text styles using variant system
  const titleStyle = useMemo(
    () => [
      baseStyles.title,
      {
        fontSize: theme.typography.title.size,
        fontWeight: theme.typography.title.weight,
        lineHeight: theme.typography.title.lineHeight,
      },
      getVariantTextStyles(resolvedVariant.theme, true),
      getTextAlignmentStyle(layout.textAlignment),
    ],
    [theme.typography, resolvedVariant.theme, layout.textAlignment]
  );

  const messageStyle = useMemo(
    () => [
      baseStyles.message,
      {
        fontSize: theme.typography.description.size,
        fontWeight: theme.typography.description.weight,
        lineHeight: theme.typography.description.lineHeight,
      },
      getVariantTextStyles(resolvedVariant.theme, false),
      getTextAlignmentStyle(layout.textAlignment),
    ],
    [theme.typography, resolvedVariant.theme, layout.textAlignment]
  );

  // Determine number of lines based on variant intelligently
  const getMessageLines = (): number => {
    switch (resolvedVariant.name) {
      case 'minimal':
      case 'compact':
        return 1;
      default:
        return 3;
    }
  };

  return {
    resolvedVariant,
    variantBehavior,
    iconConfig,
    layout,
    containerStyle,
    textContainerStyle,
    titleStyle,
    messageStyle,
    getMessageLines,
    // Expose variant colors for custom icons (including loading icons)
    variantColors: {
      textColor: resolvedVariant.theme.colors.onSurface,
      iconColor: iconConfig.iconColor || resolvedVariant.theme.colors.onSurface,
    },
  };
};

const baseStyles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainerWithTopIcon: {
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: 2,
  },
  message: {
    // Base message styles
  },
});
