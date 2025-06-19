import type { ProgressBarConfig } from '../components/ToastProgressBar';
import { getDefaultProgressBarConfig } from '../utils/progressBarUtils';

/**
 * Progress bar configuration presets - now theme-aware
 */
export const ProgressBarPresets = {
  /**
   * Default - uses theme-defined progress bar styling
   */
  default: (): ProgressBarConfig => getDefaultProgressBarConfig(),

  /**
   * Thicker progress bar for better visibility
   * Works great for accessibility and outdoor/bright environments
   */
  thick: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    // Note: Height will be overridden by theme's progressBar.bar.height
    // This preset mainly affects the behavior configuration
    showForTypes: {
      success: true,
      error: true,
      warning: true,
      info: true,
      custom: true,
    },
  }),

  /**
   * Progress bar at top of toast
   * Useful for bottom-positioned toasts or when you want progress at top
   */
  top: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    position: 'top',
  }),

  /**
   * Minimal - only show for error and warning toasts
   * Good for reducing visual clutter while keeping important feedback
   */
  minimal: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    showForTypes: {
      success: false,
      error: true,
      warning: true,
      info: false,
      custom: false,
    },
  }),

  /**
   * Critical only - only show for error toasts
   * Most minimal approach, only shows progress for errors
   */
  critical: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    showForTypes: {
      success: false,
      error: true,
      warning: false,
      info: false,
      custom: false,
    },
  }),

  /**
   * Fast animation - quicker updates for dynamic content
   * Good for data-heavy apps or real-time updates
   */
  fast: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    animation: {
      duration: 50, // Very fast updates
      easing: 'linear',
    },
  }),

  /**
   * Smooth animation - slower, more elegant updates
   * Great for premium apps or when you want polished feel
   */
  smooth: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    animation: {
      duration: 200, // Slower, smoother updates
      easing: 'ease-out',
    },
  }),

  /**
   * Disabled - no progress bars
   * For minimal UI or when progress indication is not needed
   */
  disabled: (): ProgressBarConfig => ({
    ...getDefaultProgressBarConfig(),
    enabled: false,
  }),

  /**
   * Theme optimized - uses all theme-defined styling
   * This preset provides the most theme-integrated experience
   */
  themeOptimized: (): ProgressBarConfig => ({
    enabled: true,
    position: 'bottom', // Will be overridden by theme.progressBar.positioning.defaultPosition
    height: 2, // Will be overridden by theme.progressBar.bar.height
    showForTypes: {
      success: true,
      error: true,
      warning: true,
      info: true,
      custom: true,
    },
    animation: {
      duration: 100, // Will be overridden by theme.progressBar.animation
      easing: 'linear',
    },
  }),
};
