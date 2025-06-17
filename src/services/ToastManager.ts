// Toast Manager - Core business logic with simple API
import type { QueueConfig } from '../types/ConfigTypes';
import type { Toast, ToastConfig } from '../types/ToastTypes';
import { QueueManager } from './QueueManager';

export class ToastManager {
  private static instance: ToastManager;
  private queueManager: QueueManager;
  private listeners: Set<(toasts: Toast[]) => void> = new Set();
  private dismissTimers: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.queueManager = new QueueManager();

    // Subscribe to queue state changes
    this.queueManager.subscribe((state) => {
      this.notifyListeners(state.visible);

      // Handle auto-dismiss for visible toasts
      state.visible.forEach((toast) => {
        this.scheduleAutoDismiss(toast.id, toast.config);
      });
    });
  }

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  /**
   * Configure queue management
   */
  configureQueue(config: QueueConfig): void {
    this.queueManager.updateConfig(config);
  }

  show(config: ToastConfig): string {
    const result = this.queueManager.enqueue(config);
    return result.id;
  }

  dismiss(id?: string): void {
    if (id) {
      // Clear any pending dismiss timer
      this.clearDismissTimer(id);
      this.queueManager.dequeue(id);
    } else {
      // Clear all timers and toasts
      this.dismissTimers.forEach((timer) => clearTimeout(timer));
      this.dismissTimers.clear();
      this.queueManager.clear();
    }
  }

  update(id: string, config: Partial<ToastConfig>): void {
    const updated = this.queueManager.updateVisible(id, config);
    if (updated) {
      // If duration was updated, reschedule auto-dismiss
      if (config.duration !== undefined) {
        this.scheduleAutoDismiss(id, { ...this.getToastConfig(id), ...config });
      }
    }
  }

  getToasts(): Toast[] {
    return this.queueManager
      .getState()
      .visible.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  subscribe(listener: (toasts: Toast[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get queue statistics
   */
  getQueueStats() {
    const state = this.queueManager.getState();
    return {
      visible: state.visible.length,
      queued: state.queued.length,
      total: state.totalCount,
    };
  }

  private scheduleAutoDismiss(id: string, config: ToastConfig): void {
    // Clear any existing timer for this toast
    this.clearDismissTimer(id);

    // Schedule new auto-dismiss if not permanent
    if (config.duration !== 'permanent') {
      const duration = this.calculateDuration(config);
      const timer = setTimeout(() => {
        this.dismiss(id);
      }, duration);
      this.dismissTimers.set(id, timer);
    }
  }

  private clearDismissTimer(id: string): void {
    const timer = this.dismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.dismissTimers.delete(id);
    }
  }

  private notifyListeners(toasts: Toast[]): void {
    this.listeners.forEach((listener) => listener(toasts));
  }

  private getToastConfig(id: string): ToastConfig {
    const state = this.queueManager.getState();
    const toast = state.visible.find((t) => t.id === id);
    return toast?.config || this.getDefaultConfig();
  }

  private getDefaultConfig(): ToastConfig {
    return {
      message: '',
      type: 'info',
      duration: 'auto',
      position: 'smart',
      priority: 'medium',
    };
  }

  private calculateDuration(config: ToastConfig): number {
    if (typeof config.duration === 'number') {
      return config.duration;
    }

    if (config.duration === 'auto') {
      // Smart duration based on message length
      const messageLength = config.message.length + (config.title?.length || 0);
      const baseTime = 3000;
      const extraTime = Math.min(messageLength * 50, 4000);
      return baseTime + extraTime;
    }

    return 4000; // Default fallback
  }
}
