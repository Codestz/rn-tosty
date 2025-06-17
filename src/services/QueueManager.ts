// Queue Manager - Advanced toast queue management with priority and overflow handling
import type { QueueConfig } from '../types/ConfigTypes';
import type { Toast, ToastConfig, ToastPriority } from '../types/ToastTypes';

export interface QueuedToast {
  config: ToastConfig;
  queuedAt: Date;
  priority: ToastPriority;
}

export interface QueueState {
  visible: Toast[];
  queued: QueuedToast[];
  totalCount: number;
}

export class QueueManager {
  private visible: Map<string, Toast> = new Map();
  private queued: QueuedToast[] = [];
  private config: Required<QueueConfig>;
  private listeners: Set<(state: QueueState) => void> = new Set();
  private showTimer?: NodeJS.Timeout;

  constructor(config: QueueConfig = {}) {
    this.config = this.getDefaultConfig(config);
  }

  /**
   * Update queue configuration
   */
  updateConfig(config: Partial<QueueConfig>): void {
    this.config = { ...this.config, ...config };
    this.processQueue(); // Reprocess queue with new config
  }

  /**
   * Add a toast to the queue
   */
  enqueue(config: ToastConfig): { id: string; queued: boolean } {
    const id = config.id || this.generateId();
    const priority = config.priority || 'medium';

    // Check for duplicates/similar toasts
    if (this.shouldMerge(config)) {
      const existingId = this.findSimilarToast(config);
      if (existingId) {
        return { id: existingId, queued: false };
      }
    }

    // Check if we can show immediately
    if (this.canShowImmediately()) {
      const toast = this.createToast({ ...config, id }, priority);
      this.visible.set(id, toast);
      this.notifyListeners();
      return { id, queued: false };
    }

    // Handle overflow
    if (this.isQueueFull()) {
      const handled = this.handleOverflow(config, priority);
      if (!handled) {
        return { id: '', queued: false }; // Ignored
      }
    }

    // Add to queue
    const queuedToast: QueuedToast = {
      config: { ...config, id },
      queuedAt: new Date(),
      priority,
    };

    this.addToQueue(queuedToast);
    this.notifyListeners();

    return { id, queued: true };
  }

  /**
   * Remove a toast from visible or queue
   */
  dequeue(id: string): boolean {
    // Remove from visible
    if (this.visible.has(id)) {
      this.visible.delete(id);
      this.processQueue(); // Show next queued toast
      this.notifyListeners();
      return true;
    }

    // Remove from queue
    const queueIndex = this.queued.findIndex((item) => item.config.id === id);
    if (queueIndex !== -1) {
      this.queued.splice(queueIndex, 1);
      this.notifyListeners();
      return true;
    }

    return false;
  }

  /**
   * Clear all toasts (visible and queued)
   */
  clear(): void {
    this.visible.clear();
    this.queued = [];
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
    this.notifyListeners();
  }

  /**
   * Get current queue state
   */
  getState(): QueueState {
    return {
      visible: Array.from(this.visible.values()),
      queued: [...this.queued],
      totalCount: this.visible.size + this.queued.length,
    };
  }

  /**
   * Subscribe to queue state changes
   */
  subscribe(listener: (state: QueueState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Update a visible toast
   */
  updateVisible(id: string, updates: Partial<ToastConfig>): boolean {
    const toast = this.visible.get(id);
    if (toast) {
      toast.config = { ...toast.config, ...updates };
      toast.updatedAt = new Date();
      this.visible.set(id, toast);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Private methods

  private getDefaultConfig(config: QueueConfig): Required<QueueConfig> {
    return {
      maxVisible: config.maxVisible ?? 3,
      maxSize: config.maxSize ?? 10,
      priorityOrdering: config.priorityOrdering ?? true,
      mergeStrategy: config.mergeStrategy ?? 'similar',
      overflowStrategy: config.overflowStrategy ?? 'dismiss-oldest',
      placement: config.placement ?? 'priority-based',
      autoDismissQueued: config.autoDismissQueued ?? true,
      showDelay: config.showDelay ?? 300,
    };
  }

  private canShowImmediately(): boolean {
    return this.visible.size < this.config.maxVisible;
  }

  private isQueueFull(): boolean {
    return this.visible.size + this.queued.length >= this.config.maxSize;
  }

  private shouldMerge(_config: ToastConfig): boolean {
    return this.config.mergeStrategy !== 'none';
  }

  private findSimilarToast(config: ToastConfig): string | null {
    const strategy = this.config.mergeStrategy;

    // If merge strategy is 'none', don't look for similar toasts
    if (strategy === 'none') {
      return null;
    }

    // Check visible toasts
    for (const [id, toast] of this.visible) {
      if (this.isToastSimilar(toast.config, config, strategy)) {
        return id;
      }
    }

    // Check queued toasts
    for (const queuedToast of this.queued) {
      if (
        queuedToast.config.id &&
        this.isToastSimilar(queuedToast.config, config, strategy)
      ) {
        return queuedToast.config.id;
      }
    }

    return null;
  }

  private isToastSimilar(
    existing: ToastConfig,
    incoming: ToastConfig,
    strategy: 'similar' | 'duplicate'
  ): boolean {
    if (strategy === 'duplicate') {
      return (
        existing.message === incoming.message &&
        existing.type === incoming.type &&
        existing.title === incoming.title
      );
    }

    if (strategy === 'similar') {
      return (
        existing.message === incoming.message && existing.type === incoming.type
      );
    }

    return false;
  }

  private handleOverflow(
    _config: ToastConfig,
    priority: ToastPriority
  ): boolean {
    const strategy = this.config.overflowStrategy;

    switch (strategy) {
      case 'ignore-new':
        return false;

      case 'dismiss-oldest':
        this.dismissOldest();
        return true;

      case 'dismiss-lowest-priority':
        return this.dismissLowestPriority(priority);

      case 'queue':
        // Just queue it (will be handled by caller)
        return true;

      default:
        return false;
    }
  }

  private dismissOldest(): void {
    if (this.visible.size > 0) {
      // Find oldest visible toast
      let oldestId = '';
      let oldestTime = Date.now();

      for (const [id, toast] of this.visible) {
        if (toast.createdAt.getTime() < oldestTime) {
          oldestTime = toast.createdAt.getTime();
          oldestId = id;
        }
      }

      if (oldestId) {
        this.visible.delete(oldestId);
      }
    } else if (this.queued.length > 0) {
      // Remove oldest queued toast
      this.queued.shift();
    }
  }

  private dismissLowestPriority(incomingPriority: ToastPriority): boolean {
    const priorityOrder: Record<ToastPriority, number> = {
      low: 1,
      medium: 2,
      high: 3,
      urgent: 4,
    };

    const incomingPriorityValue = priorityOrder[incomingPriority];

    // Try to dismiss from visible toasts first
    let lowestPriorityId = '';
    let lowestPriorityValue = 5; // Higher than any valid priority

    for (const [id, toast] of this.visible) {
      const toastPriority = priorityOrder[toast.config.priority || 'medium'];
      if (
        toastPriority < lowestPriorityValue &&
        toastPriority < incomingPriorityValue
      ) {
        lowestPriorityValue = toastPriority;
        lowestPriorityId = id;
      }
    }

    if (lowestPriorityId) {
      this.visible.delete(lowestPriorityId);
      return true;
    }

    // Try to dismiss from queued toasts
    for (let i = this.queued.length - 1; i >= 0; i--) {
      const queuedItem = this.queued[i];
      if (queuedItem) {
        const queuedPriority = priorityOrder[queuedItem.priority];
        if (queuedPriority < incomingPriorityValue) {
          this.queued.splice(i, 1);
          return true;
        }
      }
    }

    return false; // Can't dismiss anything with lower priority
  }

  private addToQueue(queuedToast: QueuedToast): void {
    if (this.config.priorityOrdering) {
      // Insert in priority order
      const priorityOrder: Record<ToastPriority, number> = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1,
      };

      const insertIndex = this.queued.findIndex(
        (item) =>
          priorityOrder[item.priority] < priorityOrder[queuedToast.priority]
      );

      if (insertIndex === -1) {
        this.queued.push(queuedToast);
      } else {
        this.queued.splice(insertIndex, 0, queuedToast);
      }
    } else {
      // Add to end (FIFO)
      this.queued.push(queuedToast);
    }
  }

  private processQueue(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }

    // Show next queued toast if we have space
    if (this.canShowImmediately() && this.queued.length > 0) {
      this.showTimer = setTimeout(() => {
        this.showNextQueued();
      }, this.config.showDelay);
    }
  }

  private showNextQueued(): void {
    if (!this.canShowImmediately() || this.queued.length === 0) {
      return;
    }

    const queuedToast = this.queued.shift()!;
    const toast = this.createToast(queuedToast.config, queuedToast.priority);

    this.visible.set(toast.id, toast);
    this.notifyListeners();

    // Continue processing queue
    this.processQueue();
  }

  private createToast(_config: ToastConfig, priority: ToastPriority): Toast {
    return {
      id: _config.id!,
      config: { ..._config, priority },
      createdAt: new Date(),
      updatedAt: new Date(),
      isVisible: true,
      progress: 0,
    };
  }

  private generateId(): string {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }
}
