// Toast Container - Main container with gesture support and safe area integration
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToastContext } from '../context/ToastProvider';
import { SmartPositioner } from '../services/SmartPositioner';
import type { SafeAreaCalculation } from '../types/SafeAreaTypes';
import type { Theme } from '../types/ThemeTypes';
import { ToastItem } from './ToastItem';

interface ToastContainerProps {
  theme?: Theme;
}

interface PositioningMap {
  top: SafeAreaCalculation | null;
  bottom: SafeAreaCalculation | null;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ theme }) => {
  const { toasts, config } = useToastContext();
  const [positioning, setPositioning] = useState<PositioningMap>({
    top: null,
    bottom: null,
  });

  // Always call useSafeAreaInsets unconditionally
  const safeAreaInsets = useSafeAreaInsets();

  // Safely get safe area insets, fallback to 0 if not available
  const insets = useMemo(() => {
    try {
      return safeAreaInsets;
    } catch (error) {
      // SafeAreaProvider not found, using default insets
      console.warn(
        'rn-tosty: SafeAreaProvider not found. Please wrap your app with SafeAreaProvider from react-native-safe-area-context for optimal positioning.'
      );
      return { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }, [safeAreaInsets]);

  // Create a stable smartPositioner instance
  const smartPositioner = useMemo(() => SmartPositioner.getInstance(), []);

  const visibleToasts = toasts
    .filter((toast) => toast.isVisible)
    .slice(0, config.maxToasts || 5);

  // Group toasts by their resolved position
  const toastsByPosition = useMemo(() => {
    const groups: { top: typeof visibleToasts; bottom: typeof visibleToasts } =
      {
        top: [],
        bottom: [],
      };

    visibleToasts.forEach((toast) => {
      const toastPosition =
        toast.config.position || config.defaultPosition || 'smart';

      // Resolve smart positioning
      if (toastPosition === 'smart') {
        const smartPos =
          positioning.top?.recommendedPosition === 'top' ? 'top' : 'bottom';
        groups[smartPos].push(toast);
      } else if (toastPosition === 'top' || toastPosition === 'bottom') {
        groups[toastPosition].push(toast);
      } else {
        // Default to top for center or other positions (not yet supported)
        groups.top.push(toast);
      }
    });

    return groups;
  }, [visibleToasts, positioning, config.defaultPosition]);

  // Calculate smart positioning for both top and bottom
  useEffect(() => {
    const calculatePositioning = async () => {
      try {
        const [topCalculation, bottomCalculation] = await Promise.all([
          smartPositioner.calculatePosition('top', insets, config),
          smartPositioner.calculatePosition('bottom', insets, config),
        ]);

        setPositioning({
          top: topCalculation,
          bottom: bottomCalculation,
        });
      } catch (error) {
        console.warn(
          'rn-tosty: Failed to calculate smart positioning, using fallback'
        );
        // Fallback positioning with user offsets
        const globalOffset = config.verticalOffset?.global || 0;
        const topOffset = config.verticalOffset?.top || 0;
        const bottomOffset = config.verticalOffset?.bottom || 0;

        setPositioning({
          top: {
            position: 'top',
            topMargin: insets.top + 16 + globalOffset + topOffset,
            bottomMargin: 0,
            leftMargin: 16,
            rightMargin: 16,
            maxWidth: 400,
            recommendedPosition: 'top',
            deviceOptimizations: {},
          },
          bottom: {
            position: 'bottom',
            topMargin: 0,
            bottomMargin: insets.bottom + 16 + globalOffset + bottomOffset,
            leftMargin: 16,
            rightMargin: 16,
            maxWidth: 400,
            recommendedPosition: 'bottom',
            deviceOptimizations: {},
          },
        });
      }
    };

    calculatePositioning();
  }, [insets, smartPositioner, config]);

  if (toasts.length === 0 || (!positioning.top && !positioning.bottom)) {
    return null;
  }

  return (
    <>
      {/* Top positioned toasts */}
      {toastsByPosition.top.length > 0 && positioning.top && (
        <View
          style={[
            styles.container,
            {
              top: 0,
              paddingTop: positioning.top.topMargin,
              paddingLeft: positioning.top.leftMargin,
              paddingRight: positioning.top.rightMargin,
            },
          ]}
          pointerEvents="box-none"
        >
          {toastsByPosition.top.map((toast) => (
            <ToastItem key={toast.id} toast={toast} theme={theme} />
          ))}
        </View>
      )}

      {/* Bottom positioned toasts */}
      {toastsByPosition.bottom.length > 0 && positioning.bottom && (
        <View
          style={[
            styles.container,
            {
              bottom: 0,
              paddingBottom: positioning.bottom.bottomMargin,
              paddingLeft: positioning.bottom.leftMargin,
              paddingRight: positioning.bottom.rightMargin,
            },
          ]}
          pointerEvents="box-none"
        >
          {toastsByPosition.bottom.map((toast) => (
            <ToastItem key={toast.id} toast={toast} theme={theme} />
          ))}
        </View>
      )}
    </>
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
