// ToastLoadingIcon Type Definitions
import type { Theme } from '../../types/ThemeTypes';

export type LoadingAnimationType = 'spinner' | 'dots' | 'bars' | 'pulse';

export type LoadingIconSize = 'small' | 'medium' | 'large' | number;

export type TransitionState = 'loading' | 'success' | 'error' | null;

export interface ToastLoadingIconProps {
  type?: LoadingAnimationType;
  size?: LoadingIconSize;
  color?: string;
  theme: Theme;
  animated?: boolean;
  transitionTo?: TransitionState;
  onTransitionComplete?: () => void;
  duration?: number; // Animation duration in ms
}

export interface LoadingAnimationProps {
  size: number;
  color: string;
  theme: Theme;
  animated: boolean;
  progress?: number; // 0-1 for determinate progress
}

// Size mapping for loading icons
export const LOADING_ICON_SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

// Animation configuration
export interface LoadingAnimationConfig {
  duration: number;
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  iterations: number | 'infinite';
}

// Default animation configurations
export const LOADING_ANIMATION_CONFIGS = {
  spinner: {
    duration: 1000,
    easing: 'linear' as const,
    iterations: 'infinite' as const,
  },
  dots: {
    duration: 1200,
    easing: 'ease-in-out' as const,
    iterations: 'infinite' as const,
  },
  bars: {
    duration: 800,
    easing: 'ease-in-out' as const,
    iterations: 'infinite' as const,
  },
  pulse: {
    duration: 1000,
    easing: 'ease-in-out' as const,
    iterations: 'infinite' as const,
  },
} as const;
