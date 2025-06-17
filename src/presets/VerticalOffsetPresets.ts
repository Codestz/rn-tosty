import type { VerticalOffsetConfig } from '../types/ConfigTypes';

/**
 * Common preset configurations for vertical offset spacing
 */
export const VerticalOffsetPresets = {
  // No additional spacing (use default smart positioning)
  default: (): VerticalOffsetConfig => ({}),

  // More breathing room on both sides
  spacious: (): VerticalOffsetConfig => ({ global: 20 }),

  // Tight spacing for more content
  compact: (): VerticalOffsetConfig => ({ global: -8 }),

  // Push away from top (good for apps with custom headers)
  avoidTop: (offset: number = 30): VerticalOffsetConfig => ({ top: offset }),

  // Push away from bottom (good for apps with tab bars)
  avoidBottom: (offset: number = 30): VerticalOffsetConfig => ({
    bottom: offset,
  }),

  // Custom configuration
  custom: (
    top: number,
    bottom: number,
    global: number = 0
  ): VerticalOffsetConfig => ({
    top,
    bottom,
    global,
  }),
} as const;
