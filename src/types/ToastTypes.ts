// Toast Type Definitions
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'custom';

export type ToastPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ToastDuration = number | 'permanent' | 'auto';

export type ToastPosition = 'top' | 'center' | 'bottom' | 'smart';

// Modern variant system - only variant names (predefined or custom)
export type ToastVariant = string;

// Import types from other files
import type { AnimationConfig, ToastLayoutConfig } from './ConfigTypes';
import type { CustomIconComponent, ToastTypeIconConfig } from './IconTypes';

/**
 * Base toast configuration interface containing common properties
 * Used as foundation for other configuration interfaces
 */
export interface BaseToastConfig {
  /** Unique identifier for the toast (auto-generated if not provided) */
  id?: string;
  /** Optional title text displayed above the message */
  title?: string;
  /** Main message content to display */
  message: string;
  /** Visual variant to use (predefined or custom variant name) */
  variant?: ToastVariant;
  /** Priority level affecting display order and behavior */
  priority?: ToastPriority;
  /** Duration in milliseconds, 'permanent' for manual dismiss, or 'auto' for smart duration */
  duration?: ToastDuration;
  /** Screen position where toast should appear */
  position?: ToastPosition;
  /** Layout configuration for this specific toast (icon position, text alignment, etc.) */
  layout?: ToastLayoutConfig;
  /** Animation configuration overrides */
  animationConfig?: AnimationConfig;
  /** Icon override - custom component, type config, or false to hide icon */
  icon?: CustomIconComponent | ToastTypeIconConfig | false;
  /** Progress bar configuration */
  progressBar?: {
    /** Whether to show progress bar */
    enabled?: boolean;
    /** Position of progress bar relative to toast */
    position?: 'top' | 'bottom';
    /** Custom color for progress bar */
    color?: string;
    /** Height of progress bar in pixels */
    height?: number;
  };
}

/**
 * Complete toast configuration used internally by the toast system
 * Includes all properties including type and style overrides
 */
export interface ToastConfig extends BaseToastConfig {
  /** Toast type - set automatically by method calls (success, error, etc.) */
  type?: ToastType;
  /** Fine-grained style overrides for customizing specific visual aspects */
  styleOverrides?: Partial<import('./VariantTypes').VariantStyle>;
}

/**
 * Configuration for method-specific toasts (success, error, info, warning)
 * These don't include 'type' since it's automatically set by the method
 * and don't require 'message' since it's provided as a parameter
 *
 * @example
 * ```typescript
 * // Clean and simple - no redundant properties
 * success('Operation completed!', {
 *   variant: 'default',
 *   duration: 3000,
 *   layout: { iconPosition: 'right', textAlignment: 'center' },
 *   styleOverrides: { backgroundColor: '#custom-color' }
 * });
 * ```
 */
export interface MethodToastConfig extends Omit<BaseToastConfig, 'message'> {
  /** Fine-grained style overrides for customizing specific visual aspects */
  styleOverrides?: Partial<import('./VariantTypes').VariantStyle>;
}

// Enhanced Promise API Types
export interface PromiseToastConfig {
  message: string;
  title?: string;
  /** Toast type - useful for loading toasts to specify appropriate styling */
  type?: ToastType;
  icon?: CustomIconComponent | ToastTypeIconConfig | LoadingIconConfig | false;
  duration?: ToastDuration;
  variant?: ToastVariant;
  /** Layout configuration for this promise toast state */
  layout?: ToastLayoutConfig;
}

export interface LoadingIconConfig {
  type?: 'spinner' | 'dots' | 'bars' | 'pulse';
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  animated?: boolean;
}

// Promise messages can be simple strings or full configurations
export type PromiseMessage<T = any> =
  | string
  | ((data: T) => string)
  | PromiseToastConfig
  | ((data: T) => PromiseToastConfig);

export type PromiseErrorMessage =
  | string
  | ((error: Error) => string)
  | PromiseToastConfig
  | ((error: Error) => PromiseToastConfig);

export interface PromiseMessages<T = any> {
  loading: PromiseMessage<T>;
  success: PromiseMessage<T>;
  error: PromiseErrorMessage;
}

// Enhanced promise configuration
export interface PromiseConfig {
  position?: ToastPosition;
  /** Global layout configuration applied to all promise toast states */
  layout?: ToastLayoutConfig;
}

/**
 * Modern Toast API Methods with clean type definitions
 *
 * Each method automatically sets the appropriate toast type and provides
 * smart default variants. Configuration is simplified - no need to specify
 * redundant properties like 'type' or 'message' when using specific methods.
 *
 * @example
 * ```typescript
 * const { success, error, info, warning } = useToast();
 *
 * // Simple usage - just message
 * success('Operation completed!');
 *
 * // With configuration - clean and type-safe
 * error('Something went wrong', {
 *   variant: 'error-filled',
 *   duration: 5000,
 *   title: 'Error',
 *   styleOverrides: { borderColor: '#ff0000' }
 * });
 * ```
 */
export interface ToastAPI {
  /** Show a success toast with automatic success styling */
  success: (message: string, config?: MethodToastConfig) => string;
  /** Show an error toast with automatic error styling */
  error: (message: string, config?: MethodToastConfig) => string;
  /** Show an info toast with automatic info styling */
  info: (message: string, config?: MethodToastConfig) => string;
  /** Show a warning toast with automatic warning styling */
  warning: (message: string, config?: MethodToastConfig) => string;
  /** Show a fully custom toast with complete control over type and styling */
  custom: (config: ToastConfig) => string;
  /** Dismiss a specific toast by ID, or all toasts if no ID provided */
  dismiss: (id?: string) => void;
  /** Handle promise states with loading, success, and error toasts */
  promise: <T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    config?: PromiseConfig
  ) => Promise<T>;
  /** Get queue statistics (visible, queued, total counts) */
  getQueueStats: () => { visible: number; queued: number; total: number };
}

export interface Toast {
  id: string;
  config: ToastConfig;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
  progress: number;
  isPromiseToast?: boolean; // Track if this is a promise toast
  promiseState?: 'loading' | 'success' | 'error'; // Current promise state
  parentPromiseId?: string; // For linking success/error toasts to loading toast
}
