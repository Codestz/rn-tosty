// Predefined Toast Variants - Theme-aware variant definitions
import { DefaultTheme } from '../themes/presets/DefaultTheme';
import type { ThemePair } from '../types/ThemeTypes';
import type {
  PredefinedVariantName,
  ToastVariantDefinition,
  VariantBehavior,
} from '../types/VariantTypes';

// Default behavior configuration
const defaultBehavior: VariantBehavior = {
  autoDismiss: true,
  defaultDuration: 4000,
  dismissOnTap: true,
  allowManualDismiss: true,
  priority: 'medium',
  stackable: true,
  replaceExisting: false,
};

/**
 * Creates theme-aware variant factories that adapt to any theme
 * This allows success/error/warning/info variants to inherit the user's selected theme personality
 */

// Helper function to create success theme variants that adapts to any base theme
const createSuccessTheme = (baseTheme: ThemePair): ThemePair => ({
  light: {
    ...baseTheme.light,
    colors: {
      ...baseTheme.light.colors,
      surface: baseTheme.light.colors.success,
      onSurface: '#FFFFFF',
      border: baseTheme.light.colors.success,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.light.shadows,
      shadowColor: baseTheme.light.colors.success,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  dark: {
    ...baseTheme.dark,
    colors: {
      ...baseTheme.dark.colors,
      surface: baseTheme.dark.colors.success,
      onSurface: '#FFFFFF',
      border: baseTheme.dark.colors.success,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.dark.shadows,
      shadowColor: baseTheme.dark.colors.success,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
});

// Helper function to create error theme variants that adapts to any base theme
const createErrorTheme = (baseTheme: ThemePair): ThemePair => ({
  light: {
    ...baseTheme.light,
    colors: {
      ...baseTheme.light.colors,
      surface: baseTheme.light.colors.error,
      onSurface: '#FFFFFF',
      border: baseTheme.light.colors.error,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.light.shadows,
      shadowColor: baseTheme.light.colors.error,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  dark: {
    ...baseTheme.dark,
    colors: {
      ...baseTheme.dark.colors,
      surface: baseTheme.dark.colors.error,
      onSurface: '#FFFFFF',
      border: baseTheme.dark.colors.error,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.dark.shadows,
      shadowColor: baseTheme.dark.colors.error,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
});

// Helper function to create warning theme variants that adapts to any base theme
const createWarningTheme = (baseTheme: ThemePair): ThemePair => ({
  light: {
    ...baseTheme.light,
    colors: {
      ...baseTheme.light.colors,
      surface: baseTheme.light.colors.warning,
      onSurface: '#FFFFFF',
      border: baseTheme.light.colors.warning,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.light.shadows,
      shadowColor: baseTheme.light.colors.warning,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  dark: {
    ...baseTheme.dark,
    colors: {
      ...baseTheme.dark.colors,
      surface: baseTheme.dark.colors.warning,
      onSurface: '#FFFFFF',
      border: baseTheme.dark.colors.warning,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.dark.shadows,
      shadowColor: baseTheme.dark.colors.warning,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
});

// Helper function to create info theme variants that adapts to any base theme
const createInfoTheme = (baseTheme: ThemePair): ThemePair => ({
  light: {
    ...baseTheme.light,
    colors: {
      ...baseTheme.light.colors,
      surface: baseTheme.light.colors.info,
      onSurface: '#FFFFFF',
      border: baseTheme.light.colors.info,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.light.shadows,
      shadowColor: baseTheme.light.colors.info,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  dark: {
    ...baseTheme.dark,
    colors: {
      ...baseTheme.dark.colors,
      surface: baseTheme.dark.colors.info,
      onSurface: '#FFFFFF',
      border: baseTheme.dark.colors.info,
    },
    borderRadius: 'lg',
    shadows: {
      ...baseTheme.dark.shadows,
      shadowColor: baseTheme.dark.colors.info,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
});

/**
 * Factory function to create theme-aware predefined variants
 * This allows variants to adapt to any theme instead of being hardcoded to DefaultTheme
 * @param baseTheme - The theme to base the variants on
 * @returns Record of predefined variants that inherit the theme's personality
 */
export const createPredefinedVariants = (
  baseTheme: ThemePair = DefaultTheme
): Record<PredefinedVariantName, ToastVariantDefinition> => ({
  // Default variant - uses the base theme as-is
  default: {
    name: 'default',
    displayName: 'Default',
    description: 'Balanced design suitable for most use cases',
    theme: baseTheme,
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },

  // Type-specific variants using theme modifications
  success: {
    name: 'success',
    displayName: 'Success',
    description: 'Optimized variant for success messages',
    theme: createSuccessTheme(baseTheme),
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },

  error: {
    name: 'error',
    displayName: 'Error',
    description: 'Optimized variant for error messages',
    theme: createErrorTheme(baseTheme),
    behavior: {
      ...defaultBehavior,
      defaultDuration: 6000, // Longer for errors
    },
    iconConfig: {
      showIcon: true,
    },
  },

  warning: {
    name: 'warning',
    displayName: 'Warning',
    description: 'Optimized variant for warning messages',
    theme: createWarningTheme(baseTheme),
    behavior: {
      ...defaultBehavior,
      defaultDuration: 5000,
    },
    iconConfig: {
      showIcon: true,
    },
  },

  info: {
    name: 'info',
    displayName: 'Info',
    description: 'Optimized variant for informational messages',
    theme: createInfoTheme(baseTheme),
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },
});

// Default predefined variants using DefaultTheme (for backward compatibility)
export const predefinedVariants = createPredefinedVariants(DefaultTheme);

// Export factory functions for advanced use cases
export {
  createErrorTheme,
  createInfoTheme,
  createSuccessTheme,
  createWarningTheme,
};
