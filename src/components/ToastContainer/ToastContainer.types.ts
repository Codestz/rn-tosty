// ToastContainer - Component-specific types
import type { Theme } from '../../types/ThemeTypes';
import type { Toast } from '../../types/ToastTypes';

export interface ToastContainerProps {
  theme?: Theme;
}

export interface ToastContainerState {
  toasts: Toast[];
  isVisible: boolean;
}

export interface ContainerPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
