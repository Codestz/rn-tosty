// Promise Toast Manager - Handles promise toast lifecycle and transitions
import React from 'react';
import { ToastLoadingIcon } from '../components/ToastLoadingIcon/ToastLoadingIcon';
import type { ToastLayoutConfig } from '../types/ConfigTypes';
import type { CustomIconComponent } from '../types/IconTypes';
import type {
  LoadingIconConfig,
  PromiseConfig,
  PromiseErrorMessage,
  PromiseMessage,
  PromiseMessages,
  PromiseToastConfig,
  ToastConfig,
  ToastPosition,
} from '../types/ToastTypes';
import { resolveLoadingIconColor } from '../utils/iconResolver';
import { ToastManager } from './ToastManager';

export class PromiseToastManager {
  private toastManager: ToastManager;

  constructor() {
    this.toastManager = ToastManager.getInstance();
  }

  /**
   * Handles promise-based toasts with enhanced configuration
   */
  async handlePromise<T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    config: PromiseConfig = {}
  ): Promise<T> {
    const { position = 'smart', layout } = config;

    // Create loading toast
    const loadingConfig = this.resolvePromiseMessage(messages.loading);

    const loadingToastConfig: ToastConfig = {
      ...loadingConfig,
      // Use the type from loadingConfig if specified, otherwise default to 'custom'
      // Loading toasts represent a distinct loading state, not info
      type: loadingConfig.type || 'custom',
      duration: 'permanent',
      position,
      // Merge global layout config with loading-specific layout config
      layout: { ...layout, ...loadingConfig.layout },
    };

    // Handle loading icon configuration
    if (loadingConfig.icon !== undefined) {
      // Icon was explicitly configured in loading config
      loadingToastConfig.icon = this.createLoadingIcon(loadingConfig.icon);
    } else {
      // No icon specified, use default loading icon
      loadingToastConfig.icon = this.createLoadingIcon();
    }

    const loadingId = this.toastManager.show(loadingToastConfig);

    try {
      const result = await promise;

      // Resolve success message
      const successConfig = this.resolvePromiseMessage(
        messages.success,
        result
      );

      // Replace immediately with success toast
      this.toastManager.dismiss(loadingId);
      this.showResultToast(successConfig, 'success', position, layout);

      return result;
    } catch (error) {
      // Resolve error message
      const errorConfig = this.resolvePromiseMessage(
        messages.error,
        error as Error
      );

      // Replace immediately with error toast
      this.toastManager.dismiss(loadingId);
      this.showResultToast(errorConfig, 'error', position, layout);

      throw error;
    }
  }

  /**
   * Resolves a promise message to a full toast configuration
   */
  private resolvePromiseMessage<T>(
    message: PromiseMessage<T> | PromiseErrorMessage,
    data?: T | Error
  ): PromiseToastConfig {
    if (typeof message === 'string') {
      return { message };
    }

    if (typeof message === 'function') {
      const result = message(data as any);
      if (typeof result === 'string') {
        return { message: result };
      }
      return result;
    }

    return message;
  }

  /**
   * Creates a loading icon component from configuration
   * The wrapper component receives theme and can access variant context through props
   */
  private createLoadingIcon(
    iconConfig?: CustomIconComponent | LoadingIconConfig | false
  ): CustomIconComponent | false {
    if (iconConfig === false) {
      return false;
    }

    if (typeof iconConfig === 'function') {
      return iconConfig;
    }

    if (iconConfig && typeof iconConfig === 'object' && 'type' in iconConfig) {
      const {
        type = 'spinner',
        size = 'medium',
        color,
        animated = true,
      } = iconConfig;

      return ({ theme, textColor, iconColor }) =>
        React.createElement(ToastLoadingIcon, {
          type,
          size,
          color: resolveLoadingIconColor(theme, color, textColor, iconColor),
          theme,
          animated,
        });
    }

    // Default loading icon (when no config provided or config is not a LoadingIconConfig)
    return ({ theme, textColor, iconColor }) =>
      React.createElement(ToastLoadingIcon, {
        type: 'spinner',
        size: 'medium',
        color: resolveLoadingIconColor(theme, undefined, textColor, iconColor),
        theme,
        animated: true,
      });
  }

  /**
   * Shows the final result toast (success or error) - only used for non-transition mode
   */
  private showResultToast(
    config: PromiseToastConfig,
    type: 'success' | 'error',
    position: ToastPosition,
    globalLayout?: ToastLayoutConfig
  ): string {
    const resultToastConfig: ToastConfig = {
      ...config,
      type,
      position,
      // Merge global layout config with result-specific layout config
      layout: { ...globalLayout, ...config.layout },
    };

    return this.toastManager.show(resultToastConfig);
  }
}

// Export singleton instance
export const promiseToastManager = new PromiseToastManager();
