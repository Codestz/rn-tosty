// Main exports for rn-tosty
export { ToastProvider } from './context/ToastProvider';
export { useToast } from './hooks/useToast';

// Enhanced Toast API exports
export { toast } from './api/toast';

// Variant system exports
export { PREDEFINED_VARIANTS, variants } from './api/variants';

// Type exports
export type { AccessibilityConfig } from './types/AccessibilityTypes';
export type {
  AnimationConfig,
  QueueConfig,
  ToastLayoutConfig,
  ToastProviderConfig,
  VerticalOffsetConfig,
} from './types/ConfigTypes';
export type { SafeAreaConfig } from './types/SafeAreaTypes';
export type { Theme } from './types/ThemeTypes';
export type {
  LoadingIconConfig,
  PromiseConfig,
  PromiseErrorMessage,
  PromiseMessage,
  // Enhanced Promise API types
  PromiseMessages,
  PromiseToastConfig,
  Toast,
  ToastConfig,
  ToastType,
  ToastVariant,
} from './types/ToastTypes';

// Variant system type exports
export type {
  CustomVariantConfig,
  PredefinedVariantName,
  ResolvedVariant,
  ToastVariantDefinition,
  VariantBehavior,
  VariantBuilder,
  VariantName,
  VariantStyle,
} from './types/VariantTypes';

// Icon configuration exports
export type {
  BaseIconProps,
  CustomIconComponent,
  IconConfig,
  IconPreset,
  IconSize,
  IconThemeConfig,
  ResolvedIconConfig,
  ToastTypeIconConfig,
} from './types/IconTypes';

// Utility exports
export {
  createVerticalOffset,
  QueuePresets,
  ToastLayoutPresets,
  VerticalOffsetPresets,
} from './types/ConfigTypes';
export { IconPresets } from './types/IconTypes';
export {
  createIconConfig,
  createVectorIcon,
  resolveIconConfig,
  resolveIconSize,
  validateCustomIcon,
} from './utils/iconResolver';

// Theme exports
export { Themes } from './themes/AllThemes';
export { getAllThemes, getTheme, getThemeNames } from './themes/ThemeRegistry';

// Configuration presets and utilities
export {
  calculateLayout,
  getIconMargin,
  getTextAlignmentStyle,
} from './utils/layoutUtils';

// Component exports (for advanced usage)
export { ToastIcon } from './components/ToastIcon/ToastIcon';
export { ToastLoadingIcon } from './components/ToastLoadingIcon/ToastLoadingIcon';

// Loading icon types
export {
  LOADING_ANIMATION_CONFIGS,
  LOADING_ICON_SIZES,
} from './components/ToastLoadingIcon/ToastLoadingIcon.types';
export type {
  LoadingAnimationConfig,
  LoadingAnimationProps,
  LoadingAnimationType,
  LoadingIconSize,
  ToastLoadingIconProps,
  TransitionState,
} from './components/ToastLoadingIcon/ToastLoadingIcon.types';

// Error handling and logging utilities
export { ToastErrorBoundary } from './components/ErrorBoundary';
export {
  logCritical,
  logDebug,
  logError,
  logger,
  logInfo,
  logWarn,
} from './utils/logger';
export type { LoggerConfig } from './utils/logger';

// Accessibility utilities
export { DEFAULT_ACCESSIBILITY_CONFIG } from './types/AccessibilityTypes';
