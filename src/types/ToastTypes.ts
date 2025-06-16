// Toast Type Definitions
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'custom';

export type ToastPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ToastDuration = number | 'permanent' | 'auto';

export type ToastPosition = 'top' | 'center' | 'bottom' | 'smart';

export interface ToastConfig {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  priority?: ToastPriority;
  duration?: ToastDuration;
  position?: ToastPosition;
  gestureConfig?: GestureConfig;
  hapticConfig?: HapticConfig;
  animationConfig?: AnimationConfig;
}

// Simple Toast API Methods
export interface ToastAPI {
  success: (message: string, config?: Partial<ToastConfig>) => string;
  error: (message: string, config?: Partial<ToastConfig>) => string;
  info: (message: string, config?: Partial<ToastConfig>) => string;
  warning: (message: string, config?: Partial<ToastConfig>) => string;
  custom: (config: ToastConfig) => string;
  dismiss: (id?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
    config?: Partial<ToastConfig>
  ) => Promise<T>;
}

export interface Toast {
  id: string;
  config: ToastConfig;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
  progress: number;
}

// Import types from other files
import type { AnimationConfig, HapticConfig } from './ConfigTypes';
import type { GestureConfig } from './GestureTypes';
