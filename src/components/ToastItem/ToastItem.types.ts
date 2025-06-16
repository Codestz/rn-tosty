// ToastItem - Component-specific types
import type { ToastProviderConfig } from '../../types/ConfigTypes';
import type { Theme } from '../../types/ThemeTypes';
import type { Toast } from '../../types/ToastTypes';

export interface ToastItemProps {
  toast: Toast;
  theme: Theme;
  config?: ToastProviderConfig;
  onRemove: (id: string) => void;
}

export interface ToastColors {
  background: string;
  text: string;
  border: string;
}

export interface ToastItemStyles {
  container: object;
  content: object;
  textContainer: object;
  title: object;
  message: object;
  typeIndicator: object;
}

/**
 * Animation configuration for toast animations
 */
export interface ToastAnimationConfig {
  animationDuration: number;
  animationEasing: string;
  autoDismiss: boolean;
  defaultDuration: number;
}

/**
 * Icon configuration for toast icon rendering
 */
export interface ToastIconConfig {
  shouldShowIcon: boolean;
  iconPosition: 'left' | 'right' | 'top' | 'none';
  iconSize: 'small' | 'medium' | 'large' | number;
  iconColor: string;
}

/**
 * Interaction configuration for toast behavior
 */
export interface ToastInteractionConfig {
  dismissOnTap: boolean;
}
