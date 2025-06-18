import { PromiseToastManager } from '../services/PromiseToastManager';
import { ToastManager } from '../services/ToastManager';
import type {
  MethodToastConfig,
  PromiseConfig,
  PromiseMessages,
  ToastAPI,
  ToastConfig,
} from '../types/ToastTypes';

// Get manager instances
const manager = ToastManager.getInstance();
const promiseManager = new PromiseToastManager();

/**
 * Modern Toast API with enhanced variant support and clean type definitions
 */
export const toast: ToastAPI = {
  /**
   * Show a success toast with smart variant selection
   */
  success: (message: string, config?: MethodToastConfig): string => {
    return manager.show({
      message,
      type: 'success',
      variant: config?.variant || 'success', // Smart default
      ...config,
    });
  },

  /**
   * Show an error toast with smart variant selection
   */
  error: (message: string, config?: MethodToastConfig): string => {
    return manager.show({
      message,
      type: 'error',
      variant: config?.variant || 'error', // Use available variant
      ...config,
    });
  },

  /**
   * Show an info toast with smart variant selection
   */
  info: (message: string, config?: MethodToastConfig): string => {
    return manager.show({
      message,
      type: 'info',
      variant: config?.variant || 'info', // Smart default
      ...config,
    });
  },

  /**
   * Show a warning toast with smart variant selection
   */
  warning: (message: string, config?: MethodToastConfig): string => {
    return manager.show({
      message,
      type: 'warning',
      variant: config?.variant || 'warning', // Smart default
      ...config,
    });
  },

  /**
   * Show a custom toast
   */
  custom: (config: ToastConfig): string => {
    return manager.show({
      variant: 'default', // Default variant for custom toasts
      ...config,
    });
  },

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (id?: string): void => {
    manager.dismiss(id);
  },

  /**
   * Enhanced promise toast with smart variant selection
   */
  promise: <T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    config?: PromiseConfig
  ): Promise<T> => {
    return promiseManager.handlePromise(promise, messages, config);
  },

  /**
   * Get queue statistics
   */
  getQueueStats: () => {
    return manager.getQueueStats();
  },
};

// Export all toast APIs
export { toast as default };
