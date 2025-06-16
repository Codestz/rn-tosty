/**
 * Custom hook for managing toast positioning and safe area calculations
 * Handles smart positioning, safe area insets, and positioning state
 */
import { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PositioningMap } from '../components/ToastContainer/ToastContainer.types';
import { SmartPositioner } from '../services/SmartPositioner';
import type { ToastProviderConfig } from '../types/ConfigTypes';

export const useToastPositioning = (config: ToastProviderConfig) => {
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

  return {
    positioning,
    insets,
    isReady: positioning.top !== null && positioning.bottom !== null,
  };
};
