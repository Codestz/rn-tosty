// Toast Type Definitions
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'custom';

export type ToastPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ToastDuration = number | 'permanent' | 'auto';

export type ToastPosition = 'top' | 'center' | 'bottom' | 'smart';

// Modern variant system - only variant names (predefined or custom)
export type ToastVariant = string;

// Import types from other files
import type { AnimationConfig } from './ConfigTypes';
import type { CustomIconComponent, ToastTypeIconConfig } from './IconTypes';

export interface ToastConfig {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  variant?: ToastVariant;
  priority?: ToastPriority;
  duration?: ToastDuration;
  position?: ToastPosition;
  animationConfig?: AnimationConfig;
  // Icon override for this specific toast
  icon?: CustomIconComponent | ToastTypeIconConfig | false;
  // Variant-specific style overrides
  variantStyle?: Partial<import('./VariantTypes').VariantStyle>;
  // Progress bar configuration
  progressBar?: {
    enabled?: boolean;
    position?: 'top' | 'bottom';
    color?: string;
    height?: number;
  };
}

// Enhanced Promise API Types
export interface PromiseToastConfig {
  message: string;
  title?: string;
  icon?: CustomIconComponent | ToastTypeIconConfig | LoadingIconConfig | false;
  duration?: ToastDuration;
  variant?: ToastVariant;
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
}

// Modern Toast API Methods
export interface ToastAPI {
  success: (message: string, config?: Partial<ToastConfig>) => string;
  error: (message: string, config?: Partial<ToastConfig>) => string;
  info: (message: string, config?: Partial<ToastConfig>) => string;
  warning: (message: string, config?: Partial<ToastConfig>) => string;
  custom: (config: ToastConfig) => string;
  dismiss: (id?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    config?: PromiseConfig
  ) => Promise<T>;
  // New variant-aware methods
  show: (
    message: string,
    variant: ToastVariant,
    config?: Partial<ToastConfig>
  ) => string;
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
