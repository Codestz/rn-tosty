// Configuration Type Definitions
import type { ProgressBarConfig } from '../components/ToastProgressBar/ToastProgressBar.types';
import type { AccessibilityConfig } from './AccessibilityTypes';
import type { IconConfig } from './IconTypes';
import type { SafeAreaConfig } from './SafeAreaTypes';
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
  globalAnimationConfig?: AnimationConfig;
  safeAreaConfig?: SafeAreaConfig;
  // Vertical offset configuration
  verticalOffset?: VerticalOffsetConfig;
  // Progress bar configuration
  progressBar?: ProgressBarConfig;
  // Queue management configuration
  queue?: QueueConfig;
  // Accessibility configuration
  accessibility?: AccessibilityConfig;
}

export interface QueueConfig {
  /** Maximum number of toasts visible at once */
  maxVisible?: number;
  /** Maximum number of toasts in queue (including visible ones) */
  maxSize?: number;
  /** Whether to order toasts by priority */
  priorityOrdering?: boolean;
  /** How to handle similar/duplicate toasts */
  mergeStrategy?: 'none' | 'similar' | 'duplicate';
  /** What to do when queue is full */
  overflowStrategy?:
    | 'dismiss-oldest'
    | 'dismiss-lowest-priority'
    | 'queue'
    | 'ignore-new';
  /** Placement strategy for new toasts */
  placement?: 'top' | 'bottom' | 'replace-oldest' | 'priority-based';
  /** Auto-dismiss behavior for queued toasts */
  autoDismissQueued?: boolean;
  /** Delay between showing queued toasts (in ms) */
  showDelay?: number;
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

// Queue configuration presets
export const QueuePresets = {
  // Default queue behavior - balanced for most apps
  default: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 10,
    priorityOrdering: true,
    mergeStrategy: 'similar',
    overflowStrategy: 'dismiss-oldest',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 300,
  }),

  // Conservative - fewer toasts, avoid overwhelming users
  conservative: (): QueueConfig => ({
    maxVisible: 2,
    maxSize: 5,
    priorityOrdering: true,
    mergeStrategy: 'duplicate',
    overflowStrategy: 'dismiss-oldest',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 500,
  }),

  // Aggressive - more toasts, faster display
  aggressive: (): QueueConfig => ({
    maxVisible: 5,
    maxSize: 20,
    priorityOrdering: true,
    mergeStrategy: 'similar',
    overflowStrategy: 'dismiss-lowest-priority',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 100,
  }),

  // Simple FIFO - no priority ordering, simple queue
  simple: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 10,
    priorityOrdering: false,
    mergeStrategy: 'none',
    overflowStrategy: 'queue',
    placement: 'bottom',
    autoDismissQueued: true,
    showDelay: 200,
  }),

  // No queue - immediate display only, ignore if full
  immediate: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 3, // Same as maxVisible - no queuing
    priorityOrdering: false,
    mergeStrategy: 'duplicate',
    overflowStrategy: 'ignore-new',
    placement: 'top',
    autoDismissQueued: true,
    showDelay: 0,
  }),
} as const;
