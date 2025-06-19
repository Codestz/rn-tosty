/**
 * Toast Icon Container - Handles icon positioning and rendering
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getIconMargin } from '../../utils/layoutUtils';
import { ToastIcon } from './ToastIcon';
import type { ToastIconContainerProps } from './ToastIcon.types';

export const ToastIconContainer: React.FC<ToastIconContainerProps> = ({
  toast,
  theme,
  config,
  iconConfig,
  layout,
  variantColors,
}) => {
  // Don't render if icon is disabled or position is none
  if (!iconConfig.shouldShowIcon || iconConfig.iconPosition === 'none') {
    return null;
  }

  const iconContainerStyle = [
    styles.iconContainer,
    getIconMargin(
      iconConfig.iconPosition === 'left' ? 'left' : 'right',
      layout.spacing
    ),
    // Icon positioning for 'top' position
    iconConfig.iconPosition === 'top' && styles.iconTop,
  ];

  return (
    <View style={iconContainerStyle}>
      <ToastIcon
        type={toast.config.type || 'info'}
        theme={theme}
        size={iconConfig.iconSize}
        color={iconConfig.iconColor}
        iconConfig={config?.icons}
        toastIconOverride={toast.config.icon}
        variantTextColor={variantColors.textColor}
        variantIconColor={variantColors.iconColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTop: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});
