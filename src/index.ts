// Core API exports
export { toast } from './api/toast';
export { ToastProvider } from './context/ToastProvider';
export { useToast as useTosty } from './hooks/useToast';

// Presets exports - All user configuration presets
export * from './presets';

// Variant system exports - Only the user-facing variant utility
export { variants } from './api/variants';

// Theme exports
export { Themes } from './themes/AllThemes';

// Icon utilities - User-facing icon configuration helpers
export { createIconConfig, createVectorIcon } from './utils/iconResolver';

// Essential Type exports for user configuration
export type { AccessibilityConfig } from './types/AccessibilityTypes';
export type { SafeAreaConfig } from './types/SafeAreaTypes';
export type { Theme } from './types/ThemeTypes';

// Configuration types - What users need to configure the provider
export type {
  AnimationConfig,
  QueueConfig,
  ToastLayoutConfig,
  ToastProviderConfig,
  VerticalOffsetConfig,
} from './types/ConfigTypes';

// Toast core types - Essential for creating and configuring toasts
export type {
  LoadingIconConfig,
  PromiseConfig,
  PromiseErrorMessage,
  PromiseMessage,
  PromiseMessages,
  PromiseToastConfig,
  Toast,
  ToastConfig,
  ToastType,
  ToastVariant,
} from './types/ToastTypes';

// Variant system types - User-facing variant configuration
export type {
  CustomVariantConfig,
  PredefinedVariantName,
  ToastVariantDefinition,
  VariantBuilder,
  VariantName,
  VariantStyle,
} from './types/VariantTypes';

// Icon configuration types - What users need for custom icons
export type {
  BaseIconProps,
  CustomIconComponent,
  IconConfig,
  IconPreset,
  IconSize,
  ToastTypeIconConfig,
} from './types/IconTypes';

// Loading animation types - User-facing animation configuration
export type {
  LoadingAnimationType,
  LoadingIconSize,
  ToastLoadingIconProps,
} from './components/ToastLoadingIcon/ToastLoadingIcon.types';
