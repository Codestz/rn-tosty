// Simple Toast API Implementation
import { promiseToastManager } from '../services/PromiseToastManager';
import { ToastManager } from '../services/ToastManager';
import type {
  PromiseConfig,
  PromiseMessages,
  ToastAPI,
  ToastConfig,
} from '../types/ToastTypes';

class ToastAPIImpl implements ToastAPI {
  private manager: ToastManager;

  constructor() {
    this.manager = ToastManager.getInstance();

    // Bind methods to preserve 'this' context when destructured
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.info = this.info.bind(this);
    this.warning = this.warning.bind(this);
    this.custom = this.custom.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.promise = this.promise.bind(this);
  }

  private ensureManager(): ToastManager {
    if (!this.manager) {
      this.manager = ToastManager.getInstance();
    }
    return this.manager;
  }

  success(message: string, config?: Partial<ToastConfig>): string {
    return this.ensureManager().show({
      message,
      type: 'success',
      ...config,
    });
  }

  error(message: string, config?: Partial<ToastConfig>): string {
    return this.ensureManager().show({
      message,
      type: 'error',
      ...config,
    });
  }

  info(message: string, config?: Partial<ToastConfig>): string {
    return this.ensureManager().show({
      message,
      type: 'info',
      ...config,
    });
  }

  warning(message: string, config?: Partial<ToastConfig>): string {
    return this.ensureManager().show({
      message,
      type: 'warning',
      ...config,
    });
  }

  custom(config: ToastConfig): string {
    return this.ensureManager().show(config);
  }

  dismiss(id?: string): void {
    this.ensureManager().dismiss(id);
  }

  promise<T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    config?: PromiseConfig
  ): Promise<T> {
    return promiseToastManager.handlePromise(promise, messages, config);
  }
}

// Export singleton instance
export const toast = new ToastAPIImpl();
