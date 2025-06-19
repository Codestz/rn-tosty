/**
 * Custom hook for grouping toasts by their resolved position
 * Handles smart positioning resolution and toast filtering
 */
import { useMemo } from 'react';
import type {
  GroupedToasts,
  PositioningMap,
} from '../components/ToastContainer/ToastContainer.types';
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Toast } from '../types/ToastTypes';

export const useToastGrouping = (
  toasts: Toast[],
  config: ToastProviderConfig,
  positioning: PositioningMap
): GroupedToasts => {
  const visibleToasts = toasts
    .filter((toast) => toast.isVisible)
    .slice(0, config.maxToasts || 5);

  // Group toasts by their resolved position
  const groupedToasts = useMemo(() => {
    const groups: GroupedToasts = {
      top: [],
      bottom: [],
    };

    visibleToasts.forEach((toast) => {
      const toastPosition =
        toast.config.position || config.defaultPosition || 'smart';

      // Resolve smart positioning
      if (toastPosition === 'smart') {
        const smartPos =
          positioning.top?.recommendedPosition === 'top' ? 'top' : 'bottom';
        groups[smartPos].push(toast);
      } else if (toastPosition === 'top' || toastPosition === 'bottom') {
        groups[toastPosition].push(toast);
      } else {
        // Default to top for center or other positions (not yet supported)
        groups.top.push(toast);
      }
    });

    return groups;
  }, [visibleToasts, positioning, config.defaultPosition]);

  return groupedToasts;
};
