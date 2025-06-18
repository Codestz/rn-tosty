// Configuration Type Definitions
import type { ProgressBarConfig } from '../components/ToastProgressBar/ToastProgressBar.types';
import type { AccessibilityConfig } from './AccessibilityTypes';
import type { IconConfig } from './IconTypes';
import type { ToastVariant } from './ToastTypes';

// Essential Safe Area Types (simplified from former SafeAreaTypes.ts)
export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SafeAreaCalculation {
  position: 'top' | 'bottom';
  topMargin: number;
  bottomMargin: number;
  leftMargin: number;
  rightMargin: number;
  maxWidth: number;
  recommendedPosition: 'top' | 'center' | 'bottom';
  deviceOptimizations: Record<string, any>;
}

export interface DeviceInfo {
  platform: 'ios' | 'android';
  model: string;
  brand: string;
  deviceId: string;
  systemVersion: string;
  deviceType: DeviceType;
  screenWidth: number;
  screenHeight: number;
  screenData: any;
  hasNotch: boolean;
  hasHomeButton: boolean;
  hasDynamicIsland: boolean;
  hasSpecialScreen: boolean;
  statusBarHeight: number;
  homeIndicatorHeight: number;
}

export type DeviceType =
  | 'iphone-se'
  | 'iphone-standard'
  | 'iphone-notch'
  | 'iphone-dynamic-island'
  | 'ipad'
  | 'android-standard'
  | 'android-punch-hole'
  | 'android-tablet'
  | 'unknown';

/**
 * Enhanced vertical offset configuration with safe area integration
 */
export interface VerticalOffsetConfig {
  /** Additional top margin (positive = more space from top) */
  top?: number;
  /** Additional bottom margin (positive = more space from bottom) */
  bottom?: number;
  /** Global offset applied to both top and bottom */
  global?: number;
  /** Whether to automatically adapt to device safe areas (default: true) */
  adaptToDevice?: boolean;
  /** Minimum margin to maintain (overrides automatic calculations if needed) */
  minMargin?: number;
  /** Maximum margin to cap at (prevents excessive spacing) */
  maxMargin?: number;
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
  // Enhanced vertical offset configuration with safe area integration
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
