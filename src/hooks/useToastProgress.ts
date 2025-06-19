/**
 * Custom hook for managing toast progress tracking
 * Handles progress calculation and updates for duration-based progress bars
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseToastProgressConfig {
  /**
   * Total duration in milliseconds
   */
  duration: number;

  /**
   * Whether auto-dismiss is enabled
   */
  autoDismiss: boolean;

  /**
   * Update interval in milliseconds
   */
  updateInterval?: number;

  /**
   * Callback when progress completes (reaches 0)
   */
  onComplete?: () => void;
}

export const useToastProgress = (config: UseToastProgressConfig) => {
  const [progress, setProgress] = useState(1); // Start at 100% (1.0)
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const pausedTimeRef = useRef(0);
  const hasCompletedRef = useRef(false);

  const { duration, autoDismiss, updateInterval = 50, onComplete } = config;

  // Stop progress tracking
  const stopProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start progress tracking
  const startProgress = useCallback(() => {
    if (!autoDismiss || duration <= 0) {
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(1);
    hasCompletedRef.current = false;

    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) {
        return; // Skip updates when paused
      }

      const now = Date.now();
      const elapsed =
        now - (startTimeRef.current || now) - pausedTimeRef.current;
      const newProgress = Math.max(0, 1 - elapsed / duration);

      setProgress(newProgress);

      // Stop when progress reaches 0 and trigger completion
      if (newProgress <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        stopProgress();
        onComplete?.();
      }
    }, updateInterval);
  }, [duration, autoDismiss, updateInterval, stopProgress, onComplete]);

  // Pause progress (useful for hover interactions)
  const pauseProgress = useCallback(() => {
    if (!isPausedRef.current) {
      isPausedRef.current = true;
    }
  }, []);

  // Resume progress
  const resumeProgress = useCallback(() => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
    }
  }, []);

  // Reset progress to start
  const resetProgress = useCallback(() => {
    stopProgress();
    setProgress(1);
    pausedTimeRef.current = 0;
    isPausedRef.current = false;
    hasCompletedRef.current = false;
  }, [stopProgress]);

  // Auto-start progress when component mounts
  useEffect(() => {
    startProgress();

    return () => {
      stopProgress();
    };
  }, [startProgress, stopProgress]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopProgress();
    };
  }, [stopProgress]);

  return {
    progress,
    startProgress,
    stopProgress,
    pauseProgress,
    resumeProgress,
    resetProgress,
    isActive: intervalRef.current !== null,
    isPaused: isPausedRef.current,
  };
};
