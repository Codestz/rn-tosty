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

  // Standard border radius
  standardBorderRadius: 12,
  cardBorderRadius: 16,
  minimalBorderRadius: 8,
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
      borderRadius: baseStyles.standardBorderRadius,
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

  // Minimal variant - clean and simple
  'minimal': {
    name: 'minimal',
    displayName: 'Minimal',
    description: 'Clean and simple design with minimal visual elements',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderWidth: 0,
      borderRadius: baseStyles.minimalBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconPosition: 'none',
      padding: baseStyles.compactPadding,
      minHeight: baseStyles.compactMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { x: 0, y: 1 },
      elevation: 1,
    },
    behavior: {
      ...defaultBehavior,
    },
    iconConfig: {
      showIcon: false,
    },
  },

  // Outlined variant - emphasis on borders
  'outlined': {
    name: 'outlined',
    displayName: 'Outlined',
    description: 'Emphasis on borders with transparent background',
    style: {
      backgroundColor: 'transparent',
      borderColor: 'theme.colors.border',
      borderWidth: 2,
      borderRadius: baseStyles.standardBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
    typeOverrides: {
      success: {
        borderColor: 'theme.colors.success',
        iconColor: 'theme.colors.success',
      },
      error: {
        borderColor: 'theme.colors.error',
        iconColor: 'theme.colors.error',
      },
      warning: {
        borderColor: 'theme.colors.warning',
        iconColor: 'theme.colors.warning',
      },
      info: {
        borderColor: 'theme.colors.info',
        iconColor: 'theme.colors.info',
      },
    },
  },

  // Filled variant - solid background colors
  'filled': {
    name: 'filled',
    displayName: 'Filled',
    description: 'Solid background colors for high impact',
    style: {
      backgroundColor: 'theme.colors.primary',
      borderWidth: 0,
      borderRadius: baseStyles.standardBorderRadius,
      textColor: 'theme.colors.onPrimary',
      titleColor: 'theme.colors.onPrimary',
      iconColor: 'theme.colors.onPrimary',
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
    typeOverrides: {
      success: { backgroundColor: 'theme.colors.success' },
      error: { backgroundColor: 'theme.colors.error' },
      warning: { backgroundColor: 'theme.colors.warning' },
      info: { backgroundColor: 'theme.colors.info' },
    },
  },

  // Glass variant - glassmorphism effect
  'glass': {
    name: 'glass',
    displayName: 'Glass',
    description: 'Glassmorphism effect with blur and transparency',
    style: {
      backgroundColor: 'theme.colors.surface',
      backgroundOpacity: 0.8,
      borderColor: 'theme.colors.border',
      borderWidth: 1,
      borderRadius: baseStyles.cardBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { x: 0, y: 8 },
      elevation: 8,
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
    themeOverrides: {
      glassmorphism: {
        backgroundOpacity: 0.25,
        borderWidth: 1,
      },
    },
  },

  // Card variant - elevated card design
  'card': {
    name: 'card',
    displayName: 'Card',
    description: 'Elevated card design with generous spacing',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderWidth: 0,
      borderRadius: baseStyles.cardBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'large',
      iconPosition: 'left',
      padding: baseStyles.spaciousPadding,
      minHeight: baseStyles.standardMinHeight + 8,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { x: 0, y: 4 },
      elevation: 6,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 5000, // Longer duration for card style
    },
    iconConfig: {
      showIcon: true,
    },
  },

  // Banner variant - full-width notification style
  'banner': {
    name: 'banner',
    displayName: 'Banner',
    description: 'Full-width notification banner style',
    style: {
      backgroundColor: 'theme.colors.surfaceVariant',
      borderWidth: 0,
      borderRadius: 0,
      textColor: 'theme.colors.onSurfaceVariant',
      titleColor: 'theme.colors.onSurfaceVariant',
      iconColor: 'theme.colors.primary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.bannerMinHeight,
      maxWidth: undefined, // Full width
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 6000, // Longer for banner
    },
    iconConfig: {
      showIcon: true,
    },
  },

  // Floating variant - floating above content
  'floating': {
    name: 'floating',
    displayName: 'Floating',
    description: 'Floating design that hovers above content',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderWidth: 0,
      borderRadius: baseStyles.cardBorderRadius + 4,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.25,
      shadowRadius: 20,
      shadowOffset: { x: 0, y: 10 },
      elevation: 12,
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },

  // Compact variant - space-efficient design
  'compact': {
    name: 'compact',
    displayName: 'Compact',
    description: 'Space-efficient design for dense layouts',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderColor: 'theme.colors.border',
      borderWidth: 1,
      borderRadius: baseStyles.minimalBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.primary',
      iconSize: 'small',
      iconPosition: 'left',
      padding: baseStyles.compactPadding,
      minHeight: baseStyles.compactMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { x: 0, y: 1 },
      elevation: 1,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 3000, // Shorter for compact
    },
    iconConfig: {
      showIcon: true,
    },
  },

  // Notification variant - system notification style
  'notification': {
    name: 'notification',
    displayName: 'Notification',
    description: 'System notification style with subtle appearance',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderColor: 'theme.colors.borderVariant',
      borderWidth: 1,
      borderRadius: baseStyles.standardBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.onSurface',
      iconColor: 'theme.colors.secondary',
      iconSize: 'medium',
      iconPosition: 'left',
      padding: baseStyles.standardPadding,
      minHeight: baseStyles.standardMinHeight,
      shadowColor: 'theme.colors.shadow',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { x: 0, y: 2 },
      elevation: 2,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 5000,
    },
    iconConfig: {
      showIcon: true,
    },
  },

  // Alert variant - high-priority alerts
  'alert': {
    name: 'alert',
    displayName: 'Alert',
    description: 'High-priority alert with strong visual emphasis',
    style: {
      backgroundColor: 'theme.colors.surface',
      borderColor: 'theme.colors.error',
      borderWidth: 2,
      borderRadius: baseStyles.standardBorderRadius,
      textColor: 'theme.colors.onSurface',
      titleColor: 'theme.colors.error',
      iconColor: 'theme.colors.error',
      iconSize: 'large',
      iconPosition: 'left',
      padding: baseStyles.spaciousPadding,
      minHeight: baseStyles.standardMinHeight + 8,
      shadowColor: 'theme.colors.error',
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { x: 0, y: 4 },
      elevation: 6,
    },
    behavior: {
      ...defaultBehavior,
      defaultDuration: 8000, // Longer for alerts
      priority: 'urgent',
    },
    iconConfig: {
      showIcon: true,
    },
  },

  // Type-specific filled variants
  'success-filled': {
    name: 'success-filled',
    displayName: 'Success Filled',
    description: 'Filled variant specifically for success messages',
    extends: 'filled',
    style: {
      backgroundColor: 'theme.colors.success',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
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
    extends: 'filled',
    style: {
      backgroundColor: 'theme.colors.error',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
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
    extends: 'filled',
    style: {
      backgroundColor: 'theme.colors.warning',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
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
    extends: 'filled',
    style: {
      backgroundColor: 'theme.colors.info',
      textColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      iconColor: '#FFFFFF',
    },
    behavior: defaultBehavior,
    iconConfig: {
      showIcon: true,
    },
  },
};
