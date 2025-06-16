// Variant Detection - Smart logic for determining toast variant
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Theme } from '../types/ThemeTypes';
import type { Toast } from '../types/ToastTypes';

export interface VariantDetectionResult {
  variant: 'simple' | 'styled';
  reason: string; // For debugging/development
}

/**
 * Determines the appropriate variant for a toast based on smart detection rules
 */
export const detectToastVariant = (
  toast: Toast,
  theme: Theme,
  config: ToastProviderConfig
): VariantDetectionResult => {
  const toastConfig = toast.config;

  // 1. Manual override takes precedence
  if (toastConfig.variant === 'simple') {
    return { variant: 'simple', reason: 'Manual override: simple' };
  }

  if (toastConfig.variant === 'styled') {
    return { variant: 'styled', reason: 'Manual override: styled' };
  }

  // 2. Provider default (if not 'auto')
  if (config.defaultVariant === 'simple') {
    return { variant: 'simple', reason: 'Provider default: simple' };
  }

  if (config.defaultVariant === 'styled') {
    return { variant: 'styled', reason: 'Provider default: styled' };
  }

  // 3. Auto-detection rules (default behavior)

  // Rule 1: Promise toasts should be styled (need loading icons)
  if (toast.isPromiseToast) {
    return { variant: 'styled', reason: 'Promise toast needs loading icon' };
  }

  // Rule 2: Toasts with titles should be styled (better hierarchy)
  if (toastConfig.title && toastConfig.title.trim().length > 0) {
    return { variant: 'styled', reason: 'Has title - better with icon' };
  }

  // Rule 3: Glassmorphism theme should always use styled (icons look better)
  if (theme.name.includes('glassmorphism')) {
    return {
      variant: 'styled',
      reason: 'Glassmorphism theme benefits from icons',
    };
  }

  // Rule 4: Custom type toasts should be styled (more flexibility)
  if (toastConfig.type === 'custom') {
    return { variant: 'styled', reason: 'Custom toasts benefit from styling' };
  }

  // Rule 5: Long messages benefit from styled variant (better layout)
  if (toastConfig.message.length > 50) {
    return {
      variant: 'styled',
      reason: 'Long message benefits from icon layout',
    };
  }

  // Default: Simple variant for basic messages
  return { variant: 'simple', reason: 'Simple message - clean text display' };
};

/**
 * Checks if a toast should show an icon based on variant and theme
 */
export const shouldShowIcon = (
  variant: 'simple' | 'styled',
  _theme: Theme
): boolean => {
  if (variant === 'simple') {
    return false;
  }

  // Styled variant always shows icons
  return true;
};

/**
 * Gets the appropriate icon size based on toast content and theme
 */
export const getIconSize = (
  toast: Toast,
  _theme: Theme
): 'small' | 'medium' | 'large' => {
  // Promise toasts might need larger icons for loading states
  if (toast.isPromiseToast) {
    return 'medium';
  }

  // Toasts with titles can use medium icons
  if (toast.config.title) {
    return 'medium';
  }

  // Default to medium for good visibility
  return 'medium';
};
