// Toast Item - Individual toast component with beautiful theme support
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { ToastManager } from '../services/ToastManager';
import { getTheme } from '../themes/ThemeRegistry';
import type { Theme } from '../types/ThemeTypes';
import type { Toast } from '../types/ToastTypes';

interface ToastItemProps {
  toast: Toast;
  theme?: Theme; // Accept theme from parent
}

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme: propTheme,
}) => {
  const manager = ToastManager.getInstance();

  const handleDismiss = () => {
    manager.dismiss(toast.id);
  };

  // Use theme from provider (passed as prop) or fallback to default
  const theme = propTheme || getTheme('modern', 'light');

  // Get colors based on toast type
  const getToastColors = () => {
    const { type } = toast.config;

    switch (type) {
      case 'success':
        return {
          background: theme.colors.success,
          text: theme.colors.onPrimary,
          gradient: theme.effects.gradients.success,
        };
      case 'error':
        return {
          background: theme.colors.error,
          text: theme.colors.onPrimary,
          gradient: theme.effects.gradients.error,
        };
      case 'warning':
        return {
          background: theme.colors.warning,
          text: theme.colors.onPrimary,
          gradient: theme.effects.gradients.warning,
        };
      case 'info':
        return {
          background: theme.colors.info,
          text: theme.colors.onPrimary,
          gradient: theme.effects.gradients.info,
        };
      default:
        return {
          background: theme.colors.primary,
          text: theme.colors.onPrimary,
          gradient: theme.effects.gradients.primary,
        };
    }
  };

  const colors = getToastColors();

  // Create dynamic styles based on theme
  const createStyles = () => {
    const isGlassmorphism = theme.name.includes('glassmorphism');

    return StyleSheet.create({
      container: {
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: isGlassmorphism
          ? theme.colors.surface
          : colors.background,
        borderWidth: isGlassmorphism ? 1 : 0,
        borderColor: isGlassmorphism ? theme.colors.border : 'transparent',
        shadowColor: theme.colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // Glassmorphism effect (Note: blur would need native implementation)
        ...(isGlassmorphism && {
          backgroundColor: theme.colors.surface,
          opacity: 0.95,
        }),
      },
      content: {
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: theme.typography.titleFontSize,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: isGlassmorphism ? theme.colors.onSurface : colors.text,
        marginBottom: theme.spacing.xs,
        lineHeight: theme.typography.titleLineHeight,
      },
      message: {
        fontSize: theme.typography.bodyFontSize,
        fontWeight: theme.typography.fontWeight.regular,
        color: isGlassmorphism ? theme.colors.onSurface : colors.text,
        lineHeight: theme.typography.bodyLineHeight,
      },
      typeIndicator: {
        width: 4,
        height: '100%',
        backgroundColor: colors.background,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.sm,
      },
    });
  };

  const styles = createStyles();

  return (
    <Animated.View
      entering={FadeInUp.springify().damping(15).stiffness(300)}
      exiting={FadeOutUp.springify().damping(15).stiffness(300)}
      style={styles.container}
    >
      <Pressable onPress={handleDismiss} style={styles.content}>
        {/* Type indicator for glassmorphism theme */}
        {theme.name.includes('glassmorphism') && (
          <View style={styles.typeIndicator} />
        )}

        <View style={styles.textContainer}>
          {toast.config.title && (
            <Text style={styles.title}>{toast.config.title}</Text>
          )}
          <Text style={styles.message}>{toast.config.message}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};
