/**
 * Toast Item - Modern component orchestrator with separated concerns
 * Now focused on coordination between hooks and sub-components
 */
import React, { useMemo } from 'react';
import type { AccessibilityRole } from 'react-native';
import Animated from 'react-native-reanimated';
import { useToastAnimation } from '../../hooks/useToastAnimation';
import { useToastInteraction } from '../../hooks/useToastInteraction';
import { useToastProgress } from '../../hooks/useToastProgress';
import { useToastStyles } from '../../hooks/useToastStyles';
import { getDefaultProgressBarConfig } from '../../utils/progressBarUtils';
import { ToastIconContainer } from '../ToastIcon/ToastIconContainer';
import { ToastProgressBar } from '../ToastProgressBar/ToastProgressBar';
import type { ToastItemProps } from './ToastItem.types';
import { ToastTextContent } from './ToastTextContent';

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme,
  config,
  onRemove,
  onAnimationComplete,
}) => {
  // Extract styling logic to custom hook
  const {
    resolvedVariant,
    variantBehavior,
    iconConfig,
    layout,
    containerStyle,
    textContainerStyle,
    titleStyle,
    messageStyle,
    getMessageLines,
    variantColors,
  } = useToastStyles(toast, theme, config || {});

  // Resolve progress bar configuration
  const globalProgressConfig =
    config?.progressBar || getDefaultProgressBarConfig();
  const toastProgressConfig = toast.config.progressBar;

  // Determine if progress bar should be shown
  const shouldShowProgressBar =
    // Check if globally enabled
    globalProgressConfig.enabled &&
    // Check if enabled for this toast type
    globalProgressConfig.showForTypes[toast.config.type || 'info'] &&
    // Check if toast-specific config doesn't disable it
    toastProgressConfig?.enabled !== false &&
    // Only show for auto-dismiss toasts
    variantBehavior.autoDismiss &&
    toast.config.duration !== 'permanent' &&
    // Don't show progress bar if toast is dismissing
    !toast.isDismissing;

  // Get final progress bar position
  const progressPosition =
    toastProgressConfig?.position || globalProgressConfig.position;

  // Calculate duration for progress tracking
  const duration = toast.config.duration || variantBehavior.defaultDuration;
  const actualDuration = typeof duration === 'number' ? duration : 4000;

  // Extract animation logic to custom hook (called first to provide handleDismiss)
  const { animatedStyle, handleDismiss } = useToastAnimation(
    toast,
    {
      animationDuration: resolvedVariant.style.animationDuration,
      animationEasing: resolvedVariant.style.animationEasing,
      autoDismiss: variantBehavior.autoDismiss,
      defaultDuration: variantBehavior.defaultDuration,
    },
    onRemove,
    onAnimationComplete
  );

  // Extract progress tracking logic to custom hook (called after animation to use handleDismiss)
  const { progress } = useToastProgress({
    duration: actualDuration,
    autoDismiss: variantBehavior.autoDismiss && shouldShowProgressBar,
    updateInterval: globalProgressConfig.animation.duration,
    onComplete: handleDismiss, // Trigger dismissal when progress completes
  });

  // Extract interaction logic to custom hook
  const { handleTap } = useToastInteraction(
    {
      dismissOnTap: variantBehavior.dismissOnTap,
    },
    handleDismiss
  );

  // Accessibility configuration
  const accessibilityProps = useMemo(() => {
    const toastType = toast.config.type || 'info';
    const title = toast.config.title;
    const message = toast.config.message;

    // Get accessibility config with defaults
    const accessibilityConfig = {
      enabled: true,
      customLabels: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
      },
      announceMode: 'auto' as const,
      customHints: {
        dismissible: 'Tap to dismiss',
        autoDismiss: 'Will auto-dismiss',
        permanent: 'Tap to dismiss',
      },
      includeTypeInLabel: true,
      includeDurationInHint: false,
      ...(config?.accessibility || {}),
    };

    // If accessibility is disabled, return minimal props
    if (!accessibilityConfig.enabled) {
      return {
        accessible: false,
        importantForAccessibility: 'no' as const,
      };
    }

    // Create accessible label combining title and message
    let accessibleText = title ? `${title}. ${message}` : message;

    // Add type label if enabled
    if (accessibilityConfig.includeTypeInLabel) {
      const typeLabel =
        accessibilityConfig.customLabels[
          toastType as keyof typeof accessibilityConfig.customLabels
        ] || toastType;
      accessibleText = `${typeLabel}. ${accessibleText}`;
    }

    // Determine accessibility role based on toast type
    const getAccessibilityRole = (): AccessibilityRole => {
      switch (toastType) {
        case 'error':
          return 'alert';
        case 'warning':
          return 'alert';
        default:
          return 'text';
      }
    };

    // Create accessibility hint
    const getAccessibilityHint = () => {
      let hint = '';

      if (variantBehavior.dismissOnTap) {
        hint = accessibilityConfig.customHints.dismissible || 'Tap to dismiss';
        if (variantBehavior.autoDismiss) {
          hint += `, or ${accessibilityConfig.customHints.autoDismiss || 'will auto-dismiss'}`;
        }
      } else if (variantBehavior.autoDismiss) {
        hint =
          accessibilityConfig.customHints.autoDismiss || 'Will auto-dismiss';
      } else {
        hint = accessibilityConfig.customHints.permanent || 'Tap to dismiss';
      }

      // Add duration information if enabled
      if (accessibilityConfig.includeDurationInHint && actualDuration) {
        const seconds = Math.round(actualDuration / 1000);
        hint += `. Duration: ${seconds} seconds`;
      }

      return hint;
    };

    // Determine live region based on config and toast type
    const getLiveRegion = () => {
      if (accessibilityConfig.announceMode === 'assertive') {
        return 'assertive' as const;
      } else if (accessibilityConfig.announceMode === 'polite') {
        return 'polite' as const;
      } else {
        // Auto mode: assertive for errors/warnings, polite for others
        return toastType === 'error' || toastType === 'warning'
          ? ('assertive' as const)
          : ('polite' as const);
      }
    };

    return {
      accessible: true,
      accessibilityRole: getAccessibilityRole(),
      accessibilityLabel: accessibleText,
      accessibilityHint: getAccessibilityHint(),
      accessibilityLiveRegion: getLiveRegion(),
      // Announce immediately for important toasts
      accessibilityElementsHidden: false,
      importantForAccessibility: 'yes' as const,
    };
  }, [toast.config, variantBehavior, config?.accessibility, actualDuration]);

  return (
    <Animated.View
      style={[animatedStyle, containerStyle]}
      onTouchEnd={handleTap}
      {...accessibilityProps}
    >
      {/* Progress Bar - Top Position */}
      {shouldShowProgressBar && progressPosition === 'top' && (
        <ToastProgressBar
          progress={progress}
          position="top"
          type={toast.config.type || 'info'}
          theme={theme}
          visible={shouldShowProgressBar}
          color={toastProgressConfig?.color}
          height={toastProgressConfig?.height || globalProgressConfig.height}
          borderRadius={1}
        />
      )}

      {/* Icon Container */}
      <ToastIconContainer
        toast={toast}
        theme={theme}
        config={config || {}}
        iconConfig={iconConfig}
        layout={layout}
        variantColors={variantColors}
      />

      {/* Text Content */}
      <ToastTextContent
        toast={toast}
        textContainerStyle={textContainerStyle}
        titleStyle={titleStyle}
        messageStyle={messageStyle}
        getMessageLines={getMessageLines}
      />

      {/* Progress Bar - Bottom Position */}
      {shouldShowProgressBar && progressPosition === 'bottom' && (
        <ToastProgressBar
          progress={progress}
          position="bottom"
          type={toast.config.type || 'info'}
          theme={theme}
          visible={shouldShowProgressBar}
          color={toastProgressConfig?.color}
          height={toastProgressConfig?.height || globalProgressConfig.height}
          borderRadius={1}
        />
      )}
    </Animated.View>
  );
};
