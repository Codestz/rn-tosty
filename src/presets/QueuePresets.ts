import type { QueueConfig } from '../types/ConfigTypes';

/**
 * Queue configuration presets for different toast management strategies
 */
export const QueuePresets = {
  // Default queue behavior - balanced for most apps
  default: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 10,
    priorityOrdering: true,
    mergeStrategy: 'similar',
    overflowStrategy: 'dismiss-oldest',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 300,
  }),

  // Conservative - fewer toasts, avoid overwhelming users
  conservative: (): QueueConfig => ({
    maxVisible: 2,
    maxSize: 5,
    priorityOrdering: true,
    mergeStrategy: 'duplicate',
    overflowStrategy: 'dismiss-oldest',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 500,
  }),

  // Aggressive - more toasts, faster display
  aggressive: (): QueueConfig => ({
    maxVisible: 5,
    maxSize: 20,
    priorityOrdering: true,
    mergeStrategy: 'similar',
    overflowStrategy: 'dismiss-lowest-priority',
    placement: 'priority-based',
    autoDismissQueued: true,
    showDelay: 100,
  }),

  // Simple FIFO - no priority ordering, simple queue
  simple: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 10,
    priorityOrdering: false,
    mergeStrategy: 'none',
    overflowStrategy: 'queue',
    placement: 'bottom',
    autoDismissQueued: true,
    showDelay: 200,
  }),

  // No queue - immediate display only, ignore if full
  immediate: (): QueueConfig => ({
    maxVisible: 3,
    maxSize: 3, // Same as maxVisible - no queuing
    priorityOrdering: false,
    mergeStrategy: 'duplicate',
    overflowStrategy: 'ignore-new',
    placement: 'top',
    autoDismissQueued: true,
    showDelay: 0,
  }),
} as const;
