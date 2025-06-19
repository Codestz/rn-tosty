// Base Theme Foundation - Shared design tokens for all themes
import type { ThemeSpacing, ThemeTypography } from '../../types/ThemeTypes';

// Toast-specific spacing system (based on layoutUtils usage)
export const baseSpacing: ThemeSpacing = {
  icon: 12, // Space around icons
  container: 16, // Container padding
  text: 8, // Space between text elements
};

// Simplified typography system for toasts
export const baseTypography: ThemeTypography = {
  title: {
    size: 16,
    weight: '600',
    lineHeight: 20,
  },
  description: {
    size: 14,
    weight: '400',
    lineHeight: 18,
  },
};

// Common color utilities
export const colorUtils = {
  // Add alpha to hex color
  addAlpha: (color: string, alpha: number): string => {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Handle rgb/rgba colors - extract numbers and apply alpha
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
    }

    // Fallback for other formats
    return color;
  },

  // Lighten/darken color (simple utility)
  adjustBrightness: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  },
};

/**
 * Base progress bar configuration - shared foundation
 */
export const baseProgressBar = {
  track: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
    height: 2,
    opacity: 1,
  },
  bar: {
    borderRadius: 1,
    height: 2,
  },
  animation: {
    duration: 100,
    easing: 'linear' as const,
  },
  positioning: {
    defaultPosition: 'bottom' as const,
    marginTop: 0,
    marginBottom: 0,
  },
};
