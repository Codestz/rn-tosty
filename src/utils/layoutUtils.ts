// Layout Utils - Helper functions for toast layout calculations
import { I18nManager } from 'react-native';
import type { ToastLayoutConfig } from '../types/ConfigTypes';
import type { Theme } from '../types/ThemeTypes';

export interface LayoutCalculation {
  iconPosition: 'left' | 'right';
  textAlignment: 'left' | 'center' | 'right';
  isRTL: boolean;
  spacing: {
    iconMargin: number;
    containerPadding: number;
    textPadding: number;
  };
  flexDirection: 'row' | 'row-reverse';
}

/**
 * Calculates the final layout configuration based on user settings and device RTL
 */
export const calculateLayout = (
  layoutConfig: ToastLayoutConfig = {},
  theme: Theme
): LayoutCalculation => {
  // Get device RTL state
  const deviceIsRTL = I18nManager.isRTL;

  // Determine final direction
  const direction =
    layoutConfig.direction === 'auto'
      ? deviceIsRTL
        ? 'rtl'
        : 'ltr'
      : layoutConfig.direction || 'ltr';

  const isRTL = direction === 'rtl';

  // Determine icon position
  let iconPosition = layoutConfig.iconPosition || 'left';

  // Auto-flip icon position for RTL
  if (isRTL && layoutConfig.iconPosition !== 'right') {
    iconPosition = iconPosition === 'left' ? 'right' : 'left';
  }

  // Determine text alignment
  let textAlignment: 'left' | 'center' | 'right' = 'left';

  if (layoutConfig.textAlignment === 'auto') {
    textAlignment = isRTL ? 'right' : 'left';
  } else {
    textAlignment = layoutConfig.textAlignment || (isRTL ? 'right' : 'left');
  }

  // Calculate spacing based on spacing preference
  const spacing = calculateSpacing(layoutConfig.spacing || 'normal', theme);

  // Determine flex direction
  const flexDirection = iconPosition === 'right' ? 'row-reverse' : 'row';

  return {
    iconPosition,
    textAlignment,
    isRTL,
    spacing,
    flexDirection,
  };
};

/**
 * Calculates spacing values based on spacing preference and theme
 */
const calculateSpacing = (
  spacingType: 'compact' | 'normal' | 'spacious',
  theme: Theme
) => {
  // Use the new toast-specific spacing structure
  const baseIconMargin = theme.spacing.icon;
  const baseContainerPadding = theme.spacing.container;
  const baseTextPadding = theme.spacing.text;

  switch (spacingType) {
    case 'compact':
      return {
        iconMargin: baseIconMargin * 0.75,
        containerPadding: baseContainerPadding * 0.75,
        textPadding: baseTextPadding * 0.5,
      };
    case 'spacious':
      return {
        iconMargin: baseIconMargin * 1.5,
        containerPadding: baseContainerPadding * 1.25,
        textPadding: baseTextPadding * 1.5,
      };
    case 'normal':
    default:
      return {
        iconMargin: baseIconMargin,
        containerPadding: baseContainerPadding,
        textPadding: baseTextPadding,
      };
  }
};

/**
 * Gets the appropriate margin for icon based on position
 */
export const getIconMargin = (
  iconPosition: 'left' | 'right',
  spacing: { iconMargin: number }
) => {
  return iconPosition === 'left'
    ? { marginRight: spacing.iconMargin }
    : { marginLeft: spacing.iconMargin };
};

/**
 * Gets text alignment style
 */
export const getTextAlignmentStyle = (
  textAlignment: 'left' | 'center' | 'right'
) => {
  return { textAlign: textAlignment as any };
};
