// rn-tosty - Deliciously interactive React Native toast notifications

// rn-tosty - Main exports
export { toast } from './api/toast';
export { ToastProvider } from './context/ToastProvider';
export { useToast } from './hooks/useToast';

// Advanced services (for custom implementations)
export { DeviceDetector } from './services/DeviceDetector';
export { SmartPositioner } from './services/SmartPositioner';
export { ToastManager } from './services/ToastManager';

// Theme system utilities (lightweight)
export {
  ThemeManager,
  getTheme,
  parseLegacyThemeName,
} from './themes/ThemeRegistry';

// All available themes in one object for easy access
export { Themes } from './themes/AllThemes';

// Export types
export type {
  Toast,
  ToastAPI,
  ToastConfig,
  ToastDuration,
  ToastPosition,
  ToastPriority,
  ToastType,
} from './types/ToastTypes';

export type {
  LegacyThemeName,
  // New theme system types
  Theme,
  ThemeAnimations,
  ThemeBorderRadius,
  ThemeColors,
  ThemeEffects,
  ThemeName,
  ThemePair,
  ThemeRegistry,
  ThemeShadows,
  ThemeSpacing,
  ThemeTypography,
  ToastThemeConfig,
} from './types/ThemeTypes';

export type {
  GestureConfig,
  LongPressGestureConfig,
  PanGestureConfig,
  SwipeGestureConfig,
  TapGestureConfig,
} from './types/GestureTypes';

export type {
  AnimationConfig,
  HapticConfig,
  ToastProviderConfig,
  VerticalOffsetConfig,
} from './types/ConfigTypes';

export type {
  DeviceInfo,
  DeviceType,
  SafeAreaCalculation,
  SafeAreaConfig,
  SafeAreaInsets,
} from './types/SafeAreaTypes';

// Export vertical offset helpers
export {
  VerticalOffsetPresets,
  createVerticalOffset,
} from './types/ConfigTypes';
