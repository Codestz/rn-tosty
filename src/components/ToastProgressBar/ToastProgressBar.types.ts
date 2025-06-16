// ToastProgressBar - Component-specific types
import type { Theme } from '../../types/ThemeTypes';
import type { ToastType } from '../../types/ToastTypes';

export interface ToastProgressBarProps {
  /**
   * Current progress (0-1, where 1 is full duration remaining)
   */
  progress: number;

  /**
   * Position of the progress bar
   */
  position: 'top' | 'bottom';

  /**
   * Toast type for theme-aware coloring
   */
  type: ToastType;

  /**
   * Theme for color resolution
   */
  theme: Theme;

  /**
   * Whether the progress bar is visible
   */
  visible: boolean;

  /**
   * Custom color override (optional)
   */
  color?: string;

  /**
   * Height of the progress bar in pixels
   */
  height?: number;

  /**
   * Border radius for rounded corners
   */
  borderRadius?: number;
}

/**
 * Global progress bar configuration
 */
export interface ProgressBarConfig {
  /**
   * Enable progress bar globally
   */
  enabled: boolean;

  /**
   * Default position for progress bars
   */
  position: 'top' | 'bottom';

  /**
   * Height of the progress bar
   */
  height: number;

  /**
   * Whether to show progress bar for specific toast types
   */
  showForTypes: {
    success: boolean;
    error: boolean;
    warning: boolean;
    info: boolean;
    custom: boolean;
  };

  /**
   * Animation configuration
   */
  animation: {
    duration: number;
    easing: 'linear' | 'ease-out' | 'ease-in-out';
  };
}

/**
 * Per-toast progress bar configuration
 */
export interface ToastProgressBarConfig {
  /**
   * Enable/disable progress bar for this specific toast
   */
  enabled?: boolean;

  /**
   * Position override for this toast
   */
  position?: 'top' | 'bottom';

  /**
   * Custom color for this toast's progress bar
   */
  color?: string;

  /**
   * Custom height for this toast's progress bar
   */
  height?: number;
}
