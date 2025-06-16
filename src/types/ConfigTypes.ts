// Configuration Type Definitions
import type { IconConfig } from './IconTypes';
import type { ToastVariant } from './ToastTypes';

export interface VerticalOffsetConfig {
  top?: number; // Additional top margin (positive = more space from top)
  bottom?: number; // Additional bottom margin (positive = more space from bottom)
  global?: number; // Global offset applied to both top and bottom
}

export interface ToastLayoutConfig {
  iconPosition?: 'left' | 'right';
  textAlignment?: 'left' | 'center' | 'right' | 'auto';
  direction?: 'ltr' | 'rtl' | 'auto'; // For RTL language support
  spacing?: 'compact' | 'normal' | 'spacious';
}

export interface HapticConfig {
  enabled?: boolean;
  type?:
    | 'selection'
    | 'impactLight'
    | 'impactMedium'
    | 'impactHeavy'
    | 'notificationSuccess'
    | 'notificationWarning'
    | 'notificationError';
  pattern?: 'single' | 'double' | 'triple' | 'custom';
  customPattern?: number[];
}

export interface AnimationConfig {
  enabled?: boolean;
  enterAnimation?: 'slide' | 'fade' | 'scale' | 'bounce' | 'custom';
  exitAnimation?: 'slide' | 'fade' | 'scale' | 'bounce' | 'custom';
  duration?: number;
  easing?:
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'custom';
  customEasing?: string;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export interface ToastProviderConfig {
  maxToasts?: number;
  defaultDuration?: number;
  defaultPosition?: 'top' | 'center' | 'bottom' | 'smart';
  defaultVariant?: ToastVariant; // Default variant for all toasts
  layout?: ToastLayoutConfig; // Layout configuration
  icons?: IconConfig; // Icon configuration
  globalHapticConfig?: HapticConfig;
  globalAnimationConfig?: AnimationConfig;
  safeAreaConfig?: import('./SafeAreaTypes').SafeAreaConfig;
  // Vertical offset configuration
  verticalOffset?: VerticalOffsetConfig;
}

export interface QueueConfig {
  maxSize?: number;
  priorityOrdering?: boolean;
  mergeStrategy?: 'none' | 'similar' | 'duplicate';
  overflowStrategy?: 'dismiss-oldest' | 'dismiss-lowest-priority' | 'queue';
}

// Helper functions for creating vertical offset configurations
export const createVerticalOffset = (
  config: VerticalOffsetConfig
): VerticalOffsetConfig => config;

// Layout configuration presets
export const ToastLayoutPresets = {
  // Default layout (icon on left)
  default: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'normal',
  }),

  // Icon on the right
  iconRight: (): ToastLayoutConfig => ({
    iconPosition: 'right',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'normal',
  }),

  // RTL layout (right-to-left)
  rtl: (): ToastLayoutConfig => ({
    iconPosition: 'right',
    textAlignment: 'right',
    direction: 'rtl',
    spacing: 'normal',
  }),

  // Compact layout
  compact: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'compact',
  }),

  // Spacious layout
  spacious: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'spacious',
  }),
} as const;

// Common preset configurations
export const VerticalOffsetPresets = {
  // No additional spacing (use default smart positioning)
  default: (): VerticalOffsetConfig => ({}),

  // More breathing room on both sides
  spacious: (): VerticalOffsetConfig => ({ global: 20 }),

  // Tight spacing for more content
  compact: (): VerticalOffsetConfig => ({ global: -8 }),

  // Push away from top (good for apps with custom headers)
  avoidTop: (offset: number = 30): VerticalOffsetConfig => ({ top: offset }),

  // Push away from bottom (good for apps with tab bars)
  avoidBottom: (offset: number = 30): VerticalOffsetConfig => ({
    bottom: offset,
  }),

  // Custom configuration
  custom: (
    top: number,
    bottom: number,
    global: number = 0
  ): VerticalOffsetConfig => ({
    top,
    bottom,
    global,
  }),
} as const;
