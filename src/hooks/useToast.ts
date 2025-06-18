// useToast Hook - Enhanced hook with theme management
import { useMemo } from 'react';
import { toast } from '../api/toast';
import { useToastContext } from '../context/ToastProvider';
import type { ThemeName } from '../types/ThemeTypes';
import type { ToastAPI } from '../types/ToastTypes';

export interface UseToastReturn extends ToastAPI {
  // Theme management functions
  theme: {
    current: {
      name: ThemeName;
      mode: 'light' | 'dark' | 'auto';
    };
    setMode: (mode: 'light' | 'dark' | 'auto') => void;
    setTheme: (theme: ThemeName, mode?: 'light' | 'dark' | 'auto') => void;
    toggle: () => void;
  };
}

/**
 * Enhanced useToast hook with theme management
 *
 * @example
 * ```tsx
 * const { success, theme } = useToast();
 *
 * // Show toast
 * success('Hello World!');
 *
 * // Change theme mode
 * theme.setMode('dark');
 *
 * // Switch theme
 * theme.setTheme('liquidGlass', 'dark');
 *
 * // Toggle between light/dark
 * theme.toggle();
 * ```
 */
export const useToast = (): UseToastReturn => {
  const context = useToastContext();

  // Use useMemo to ensure we always return the same toast instance
  return useMemo(() => {
    if (!toast) {
      throw new Error(
        'Toast API is not initialized. Make sure to wrap your app with ToastProvider.'
      );
    }

    return {
      ...toast,
      theme: {
        current: {
          name: context.themeName,
          mode: context.themeMode,
        },
        setMode: context.setThemeMode,
        setTheme: context.setTheme,
        toggle: context.toggleThemeMode,
      },
    };
  }, [context]);
};
