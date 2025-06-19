import type { ToastLayoutConfig } from '../types/ConfigTypes';

/**
 * Layout configuration presets for toast positioning and styling
 */
export const ToastLayoutPresets = {
  // Default layout (icon on left)
  default: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'normal',
  }),

  // Icon on the right
  iconRight: (): ToastLayoutConfig => ({
    iconPosition: 'right',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'normal',
  }),

  // RTL layout (right-to-left)
  rtl: (): ToastLayoutConfig => ({
    iconPosition: 'right',
    textAlignment: 'right',
    direction: 'rtl',
    spacing: 'normal',
  }),

  // Compact layout
  compact: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'compact',
  }),

  // Spacious layout
  spacious: (): ToastLayoutConfig => ({
    iconPosition: 'left',
    textAlignment: 'auto',
    direction: 'auto',
    spacing: 'spacious',
  }),
} as const;
