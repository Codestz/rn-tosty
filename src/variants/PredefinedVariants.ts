// Predefined Toast Variants - Ready-to-use variant definitions
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

// Base style configurations
const baseStyles = {
  // Standard padding and spacing
  standardPadding: { horizontal: 16, vertical: 12 },
  compactPadding: { horizontal: 12, vertical: 8 },
  spaciousPadding: { horizontal: 20, vertical: 16 },

  // Standard dimensions
  standardMinHeight: 56,
  compactMinHeight: 44,
  bannerMinHeight: 48,
};

// Predefined variant definitions
export const predefinedVariants: Record<
  PredefinedVariantName,
  ToastVariantDefinition
> = {
  // Default variant - balanced design for most use cases
  'default': {
    name: 'default',
    displayName: 'Default',
    description: 'Balanced design suitable for most use cases',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderColor: 'theme.colors.border',
      borderWidth: 1,
      borderRadius: 'theme.borderRadius.md',
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { x: 0, y: 2 },
      elevation: 2,
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },

  // Type-specific filled variants
  'success-filled': {
    name: 'success-filled',
    displayName: 'Success Filled',
    description: 'Filled variant specifically for success messages',
    style: {
      backgroundColor: 'theme.colors.success',
      borderWidth: 0,
      borderRadius: 'theme.borderRadius.lg',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { x: 0, y: 4 },
      elevation: 4,
    },
    behavior: {
      ...defaultBehavior,
    },
    iconConfig: {
      showIcon: true,
    },
  },

  'error-filled': {
    name: 'error-filled',
    displayName: 'Error Filled',
    description: 'Filled variant specifically for error messages',
    style: {
      backgroundColor: 'theme.colors.error',
      borderWidth: 0,
      borderRadius: 'theme.borderRadius.lg',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { x: 0, y: 4 },
      elevation: 4,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 6000, // Longer for errors
    },
    iconConfig: {
      showIcon: true,
    },
  },

  'warning-filled': {
    name: 'warning-filled',
    displayName: 'Warning Filled',
    description: 'Filled variant specifically for warning messages',
    style: {
      backgroundColor: 'theme.colors.warning',
      borderWidth: 0,
      borderRadius: 'theme.borderRadius.lg',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { x: 0, y: 4 },
      elevation: 4,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 5000,
    },
    iconConfig: {
      showIcon: true,
    },
  },

  'info-filled': {
    name: 'info-filled',
    displayName: 'Info Filled',
    description: 'Filled variant specifically for info messages',
    style: {
      backgroundColor: 'theme.colors.info',
      borderWidth: 0,
      borderRadius: 'theme.borderRadius.lg',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { x: 0, y: 4 },
      elevation: 4,
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },
};
