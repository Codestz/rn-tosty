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
