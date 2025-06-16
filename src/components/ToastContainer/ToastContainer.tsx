/**
 * Toast Container - Main container safe area integration
 * Orchestrates positioning, grouping, and rendering of toasts
 */
import React, { useCallback, useMemo } from 'react';
import { useToastContext } from '../../context/ToastProvider';
import { useToastGrouping } from '../../hooks/useToastGrouping';
import { useToastPositioning } from '../../hooks/useToastPositioning';
import { ToastManager } from '../../services/ToastManager';
import { PositionContainer } from './PositionContainer';
import type { ToastContainerProps } from './ToastContainer.types';

export const ToastContainer: React.FC<ToastContainerProps> = ({ theme }) => {
  const { toasts, config } = useToastContext();

  // Get ToastManager instance
  const toastManager = useMemo(() => ToastManager.getInstance(), []);

  // Extract positioning logic to custom hook
  const { positioning, isReady } = useToastPositioning(config);

  // Extract toast grouping logic to custom hook
  const groupedToasts = useToastGrouping(toasts, config, positioning);

  // Handle toast removal - actually dismiss the toast from the manager
  const handleRemove = useCallback(
    (id: string) => {
      toastManager.dismiss(id);
    },
    [toastManager]
  );

  // Early return if no toasts or positioning not ready
  if (toasts.length === 0 || !isReady || !theme) {
    return null;
  }

  return (
    <>
      {/* Top positioned toasts */}
      {positioning.top && (
        <PositionContainer
          toasts={groupedToasts.top}
          positioning={positioning.top}
          theme={theme}
          config={config}
          onRemove={handleRemove}
        />
      )}

      {/* Bottom positioned toasts */}
      {positioning.bottom && (
        <PositionContainer
          toasts={groupedToasts.bottom}
          positioning={positioning.bottom}
          theme={theme}
          config={config}
          onRemove={handleRemove}
        />
      )}
    </>
  );
};
