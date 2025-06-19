import type { IconConfig } from '../types/IconTypes';

// Built-in icon presets
export const IconPresets = {
  // Default rn-tosty icons
  default: (): IconConfig => ({
    defaultSize: 'medium',
    defaultAnimated: true,
  }),

  // Larger icons for better visibility
  large: (): IconConfig => ({
    defaultSize: 'large',
    defaultAnimated: true,
  }),

  // Smaller, subtle icons
  minimal: (): IconConfig => ({
    defaultSize: 'small',
    defaultAnimated: false,
  }),

  // No animations for performance
  static: (): IconConfig => ({
    defaultSize: 'medium',
    defaultAnimated: false,
  }),
} as const;
