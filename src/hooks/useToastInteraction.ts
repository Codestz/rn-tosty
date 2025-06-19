/**
 * Custom hook for managing toast interactions
 * Handles tap interactions based on variant behavior
 */
import { useCallback } from 'react';

interface ToastInteractionConfig {
  dismissOnTap: boolean;
}

export const useToastInteraction = (
  interactionConfig: ToastInteractionConfig,
  onDismiss: () => void
) => {
  const handleTap = useCallback(() => {
    if (interactionConfig.dismissOnTap) {
      onDismiss();
    }
  }, [interactionConfig.dismissOnTap, onDismiss]);

  return {
    handleTap,
  };
};
