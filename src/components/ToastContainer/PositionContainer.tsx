/**
 * Position-specific container component for rendering toasts
 * Handles top and bottom positioning with proper styling
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ToastItem } from '../ToastItem/ToastItem';
import type { PositionContainerProps } from './ToastContainer.types';

export const PositionContainer: React.FC<PositionContainerProps> = ({
  toasts,
  positioning,
  theme,
  config,
  onRemove,
}) => {
  if (toasts.length === 0) {
    return null;
  }

  const isTopPosition = positioning.position === 'top';

  const containerStyle = [
    styles.container,
    isTopPosition
      ? {
          top: 0,
          paddingTop: positioning.topMargin,
          paddingLeft: positioning.leftMargin,
          paddingRight: positioning.rightMargin,
        }
      : {
          bottom: 0,
          paddingBottom: positioning.bottomMargin,
          paddingLeft: positioning.leftMargin,
          paddingRight: positioning.rightMargin,
        },
  ];

  return (
    <View style={containerStyle} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          theme={theme}
          config={config}
          onRemove={onRemove}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
});
