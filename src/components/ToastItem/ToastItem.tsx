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

    // Create accessible label combining title and message
    const accessibleText = title ? `${title}. ${message}` : message;

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
      if (variantBehavior.dismissOnTap) {
        return variantBehavior.autoDismiss
          ? 'Tap to dismiss, or will auto-dismiss'
          : 'Tap to dismiss';
      }
      return variantBehavior.autoDismiss ? 'Will auto-dismiss' : undefined;
    };

    return {
      accessible: true,
      accessibilityRole: getAccessibilityRole(),
      accessibilityLabel: accessibleText,
      accessibilityHint: getAccessibilityHint(),
      accessibilityLiveRegion:
        toastType === 'error' || toastType === 'warning'
          ? ('assertive' as const)
          : ('polite' as const),
      // Announce immediately for important toasts
      accessibilityElementsHidden: false,
      importantForAccessibility: 'yes' as const,
    };
  }, [toast.config, variantBehavior]);

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
