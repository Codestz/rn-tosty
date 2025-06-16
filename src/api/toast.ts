// Modern Toast API - Enhanced with variant system and smart defaults
import { PromiseToastManager } from '../services/PromiseToastManager';
import { ToastManager } from '../services/ToastManager';
import type {
  PromiseConfig,
  PromiseMessages,
  ToastAPI,
  ToastConfig,
  ToastType,
  ToastVariant,
} from '../types/ToastTypes';

// Get manager instances
const manager = ToastManager.getInstance();
const promiseManager = new PromiseToastManager();

/**
 * Modern Toast API with enhanced variant support
 */
export const toast: ToastAPI = {
  /**
   * Show a success toast with smart variant selection
   */
  success: (message: string, config?: Partial<ToastConfig>): string => {
    return manager.show({
      message,
      type: 'success',
      variant: config?.variant || 'success-filled', // Smart default
      ...config,
    });
  },

  /**
   * Show an error toast with smart variant selection
   */
  error: (message: string, config?: Partial<ToastConfig>): string => {
    return manager.show({
      message,
      type: 'error',
      variant:
        config?.variant || (message.length > 100 ? 'alert' : 'error-filled'), // Smart default
      ...config,
    });
  },

  /**
   * Show an info toast with smart variant selection
   */
  info: (message: string, config?: Partial<ToastConfig>): string => {
    return manager.show({
      message,
      type: 'info',
      variant: config?.variant || 'info-filled', // Smart default
      ...config,
    });
  },

  /**
   * Show a warning toast with smart variant selection
   */
  warning: (message: string, config?: Partial<ToastConfig>): string => {
    return manager.show({
      message,
      type: 'warning',
      variant: config?.variant || 'warning-filled', // Smart default
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
   * Show a toast with a specific variant
   */
  show: (
    message: string,
    variant: ToastVariant,
    config?: Partial<ToastConfig>
  ): string => {
    return manager.show({
      message,
      variant,
      type: 'custom',
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
};

// Enhanced convenience methods for specific variants
export const variants = {
  /**
   * Show a minimal toast (no icon, compact)
   */
  minimal: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'minimal', config);
  },

  /**
   * Show a card-style toast (elevated, spacious)
   */
  card: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'card', config);
  },

  /**
   * Show a glass-effect toast (glassmorphism)
   */
  glass: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'glass', config);
  },

  /**
   * Show a floating toast (high elevation)
   */
  floating: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'floating', config);
  },

  /**
   * Show a banner-style toast (full width)
   */
  banner: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'banner', config);
  },

  /**
   * Show an alert toast (high priority, prominent)
   */
  alert: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'alert', {
      type: 'error',
      priority: 'urgent',
      ...config,
    });
  },

  /**
   * Show a notification-style toast (subtle)
   */
  notification: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'notification', config);
  },

  /**
   * Show a compact toast (space-efficient)
   */
  compact: (message: string, config?: Partial<ToastConfig>): string => {
    return toast.show(message, 'compact', config);
  },
};

// Smart toast methods that automatically select optimal variants
const smartToast = {
  /**
   * Automatically select the best variant based on content and context
   */
  auto: (
    message: string,
    type: ToastType = 'info',
    config?: Partial<ToastConfig>
  ): string => {
    // Smart variant selection logic
    let variant: ToastVariant;

    const hasTitle = !!config?.title;
    const messageLength = message.length;

    // Long error messages should use alert
    if (type === 'error' && messageLength > 100) {
      variant = 'alert';
    }
    // Success with titles should use card
    else if (type === 'success' && hasTitle) {
      variant = 'card';
    }
    // Short messages without titles should use compact
    else if (!hasTitle && messageLength < 30) {
      variant = 'compact';
    }
    // Default to type-specific filled variants
    else if (['success', 'error', 'warning', 'info'].includes(type)) {
      variant = `${type}-filled`;
    }
    // Fallback to default
    else {
      variant = 'default';
    }

    return manager.show({
      message,
      type,
      variant,
      ...config,
    });
  },

  /**
   * Quick success with optimal variant
   */
  success: (message: string, config?: Partial<ToastConfig>): string => {
    return smartToast.auto(message, 'success', config);
  },

  /**
   * Quick error with optimal variant
   */
  error: (message: string, config?: Partial<ToastConfig>): string => {
    return smartToast.auto(message, 'error', config);
  },

  /**
   * Quick info with optimal variant
   */
  info: (message: string, config?: Partial<ToastConfig>): string => {
    return smartToast.auto(message, 'info', config);
  },

  /**
   * Quick warning with optimal variant
   */
  warning: (message: string, config?: Partial<ToastConfig>): string => {
    return smartToast.auto(message, 'warning', config);
  },
};

// Export all toast APIs
export { toast as default, smartToast, variants as toastVariants };
