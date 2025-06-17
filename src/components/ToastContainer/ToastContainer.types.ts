// ToastContainer - Component-specific types
import type { SafeAreaCalculation } from '../../types/SafeAreaTypes';
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

/**
 * Positioning map interface for managing toast positions
 */
export interface PositioningMap {
  top: SafeAreaCalculation | null;
  bottom: SafeAreaCalculation | null;
}

/**
 * Grouped toasts by position for rendering
 */
export interface GroupedToasts {
  top: Toast[];
  bottom: Toast[];
}

/**
 * Props for position-specific container components
 */
export interface PositionContainerProps {
  toasts: Toast[];
  positioning: SafeAreaCalculation;
  theme: Theme;
  config: any; // Will be properly typed based on your config
  onRemove: (id: string) => void;
  onAnimationComplete: (id: string) => void;
}
