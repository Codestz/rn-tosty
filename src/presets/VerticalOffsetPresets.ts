import type { VerticalOffsetConfig } from '../types/ConfigTypes';

/**
 * Predefined vertical offset configurations with enhanced safe area integration
 */
export const VerticalOffsetPresets = {
  /** Default configuration - automatic device adaptation */
  default: (): VerticalOffsetConfig => ({}),

  /** Spacious layout with extra margins */
  spacious: (): VerticalOffsetConfig => ({ global: 20 }),

  /** Compact layout with reduced margins */
  compact: (): VerticalOffsetConfig => ({ global: -8 }),

  /** Avoid top area (useful for navigation bars) */
  avoidTop: (offset: number = 30): VerticalOffsetConfig => ({ top: offset }),

  /** Avoid bottom area (useful for tab bars) */
  avoidBottom: (offset: number = 30): VerticalOffsetConfig => ({
    bottom: offset,
  }),

  /** Custom top and bottom offsets */
  custom: (
    topOffset: number = 0,
    bottomOffset: number = 0
  ): VerticalOffsetConfig => ({
    top: topOffset,
    bottom: bottomOffset,
  }),

  /** Disable automatic device adaptation - use exact safe area values */
  noDeviceAdaptation: (): VerticalOffsetConfig => ({
    adaptToDevice: false,
  }),

  /** Conservative margins - ensures minimum spacing */
  conservative: (): VerticalOffsetConfig => ({
    minMargin: 24,
    global: 8,
  }),

  /** Aggressive positioning - minimal margins with limits */
  aggressive: (): VerticalOffsetConfig => ({
    global: -4,
    minMargin: 8,
    maxMargin: 40,
  }),

  /** Safe positioning - balanced approach with device adaptation */
  safe: (): VerticalOffsetConfig => ({
    adaptToDevice: true,
    minMargin: 16,
    maxMargin: 60,
    global: 4,
  }),

  /** Tablet optimized - larger margins for bigger screens */
  tablet: (): VerticalOffsetConfig => ({
    global: 16,
    minMargin: 32,
    maxMargin: 80,
  }),
} as const;
