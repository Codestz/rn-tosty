// ToastIcon - Component-specific types
import type { ToastProviderConfig } from '../../types/ConfigTypes';
import type { IconConfig } from '../../types/IconTypes';
import type { Theme } from '../../types/ThemeTypes';
import type { Toast, ToastType } from '../../types/ToastTypes';

export interface ToastIconProps {
  type: ToastType;
  theme: Theme;
  size?: 'small' | 'medium' | 'large' | number;
  animated?: boolean;
  color?: string;
  iconConfig?: IconConfig; // Global icon configuration
  toastIconOverride?: any; // Per-toast icon override
}

export interface IconSizes {
  small: number;
  medium: number;
  large: number;
}

export interface IconComponentProps {
  iconSize: number;
  iconColor: string;
}

export interface ToastIconContainerProps {
  toast: Toast;
  theme: Theme;
  config: ToastProviderConfig;
  iconConfig: {
    shouldShowIcon: boolean;
    iconPosition: 'left' | 'right' | 'top' | 'none';
    iconSize: 'small' | 'medium' | 'large' | number;
    iconColor?: string;
  };
  layout: {
    spacing: any;
  };
}
