// useToast Hook - Simple hook that returns the toast API
import { useMemo } from 'react';
import { toast } from '../api/toast';
import type { ToastAPI } from '../types/ToastTypes';

export const useToast = (): ToastAPI => {
  // Use useMemo to ensure we always return the same toast instance
  return useMemo(() => {
    if (!toast) {
      throw new Error(
        'Toast API is not initialized. Make sure to wrap your app with ToastProvider.'
      );
    }
    return toast;
  }, []);
};
