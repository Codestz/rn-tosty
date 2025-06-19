/**
 * Progress Bar Utilities - Color resolution and configuration helpers
 */
import type { ProgressBarConfig } from '../components/ToastProgressBar/ToastProgressBar.types';
import type { Theme } from '../types/ThemeTypes';
import type { ToastType } from '../types/ToastTypes';

/**
 * Resolves the progress bar color based on toast type and theme
 */
export const resolveProgressBarColor = (
  type: ToastType,
  theme: Theme,
  customColor?: string
): string => {
  // Use custom color if provided
  if (customColor) {
    return customColor;
  }

  // Theme-aware color resolution
  switch (type) {
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.info;
    case 'custom':
    default:
      return theme.colors.primary;
  }
};

/**
 * Default progress bar configuration
 */
export const getDefaultProgressBarConfig = (): ProgressBarConfig => ({
  enabled: true,
  position: 'bottom',
  height: 2,
  showForTypes: {
    success: true,
    error: true,
    warning: true,
    info: true,
    custom: true,
  },
  animation: {
    duration: 100, // Smooth updates every 100ms
    easing: 'linear',
  },
});
