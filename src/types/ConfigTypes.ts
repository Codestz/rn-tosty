// Configuration Type Definitions

export interface VerticalOffsetConfig {
  top?: number; // Additional top margin (positive = more space from top)
  bottom?: number; // Additional bottom margin (positive = more space from bottom)
  global?: number; // Global offset applied to both top and bottom
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
  globalHapticConfig?: HapticConfig;
  globalAnimationConfig?: AnimationConfig;
  safeAreaConfig?: import('./SafeAreaTypes').SafeAreaConfig;
  theme?: string | import('./ThemeTypes').ThemeObject;

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
