// useTheme Hook - Dedicated theme management hook
import { useToastContext } from '../context/ToastProvider';
import type { Theme, ThemeName } from '../types/ThemeTypes';

export interface UseThemeReturn {
  /** Current active theme object */
  currentTheme: Theme;
  /** Current theme name */
  themeName: ThemeName;
  /** Current theme mode (light/dark/auto) */
  themeMode: 'light' | 'dark' | 'auto';
  /** Change theme mode without changing theme */
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  /** Change theme and optionally the mode */
  setTheme: (theme: ThemeName, mode?: 'light' | 'dark' | 'auto') => void;
  /** Toggle between light and dark modes */
  toggle: () => void;
  /** Check if current mode is dark */
  isDark: boolean;
  /** Check if current mode is light */
  isLight: boolean;
  /** Check if current mode is auto */
  isAuto: boolean;
}

/**
 * Hook for managing toast themes with reactive updates
 *
 * @example
 * ```tsx
 * const {
 *   currentTheme,
 *   themeName,
 *   themeMode,
 *   setMode,
 *   setTheme,
 *   toggle,
 *   isDark
 * } = useTheme();
 *
 * // Check current state
 * console.log('Current theme:', themeName); // 'default'
 * console.log('Current mode:', themeMode);  // 'auto'
 * console.log('Is dark mode?', isDark);     // true/false
 *
 * // Change theme mode
 * setMode('dark');
 *
 * // Switch to different theme
 * setTheme('liquidGlass', 'light');
 *
 * // Toggle between light/dark
 * toggle();
 * ```
 */
export const useTheme = (): UseThemeReturn => {
  const {
    currentTheme,
    themeName,
    themeMode,
    setThemeMode,
    setTheme,
    toggleThemeMode,
  } = useToastContext();

  return {
    currentTheme,
    themeName,
    themeMode,
    setMode: setThemeMode,
    setTheme,
    toggle: toggleThemeMode,
    isDark: currentTheme.mode === 'dark',
    isLight: currentTheme.mode === 'light',
    isAuto: themeMode === 'auto',
  };
};
