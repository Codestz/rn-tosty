// Toast Manager - Core business logic with simple API
import type { Toast, ToastConfig } from '../types/ToastTypes';

export class ToastManager {
  private static instance: ToastManager;
  private toasts: Map<string, Toast> = new Map();
  private listeners: Set<(toasts: Toast[]) => void> = new Set();
  private dismissTimers: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    if (!ToastManager.instance) {
      throw new Error('Failed to create ToastManager instance');
    }
    return ToastManager.instance;
  }

  show(config: ToastConfig): string {
    const id = config.id || this.generateId();
    const toast: Toast = {
      id,
      config: {
        ...this.getDefaultConfig(),
        ...config,
        id,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isVisible: true,
      progress: 0,
    };

    this.toasts.set(id, toast);
    this.notifyListeners();

    // Auto-dismiss logic
    this.scheduleAutoDismiss(id, toast.config);

    return id;
  }

  dismiss(id?: string): void {
    if (id) {
      // Clear any pending dismiss timer
      this.clearDismissTimer(id);
      this.toasts.delete(id);
    } else {
      // Clear all timers
      this.dismissTimers.forEach((timer) => clearTimeout(timer));
      this.dismissTimers.clear();
      this.toasts.clear();
    }
    this.notifyListeners();
  }

  update(id: string, config: Partial<ToastConfig>): void {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.config = { ...toast.config, ...config };
      toast.updatedAt = new Date();
      this.toasts.set(id, toast);
      this.notifyListeners();

      // If duration was updated, reschedule auto-dismiss
      if (config.duration !== undefined) {
        this.scheduleAutoDismiss(id, toast.config);
      }
    }
  }

  getToasts(): Toast[] {
    return Array.from(this.toasts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  subscribe(listener: (toasts: Toast[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
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

  private notifyListeners(): void {
    const toasts = this.getToasts();
    this.listeners.forEach((listener) => listener(toasts));
  }

  private generateId(): string {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
      // Auto-calculate based on message length
      const messageLength = (config.title || '').length + config.message.length;
      const baseTime = 3000; // 3 seconds base
      const readingTime = messageLength * 50; // ~50ms per character
      return Math.min(Math.max(baseTime + readingTime, 2000), 8000); // 2-8 seconds
    }

    // Default duration
    return 4000;
  }
}
