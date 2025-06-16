// Toast Provider - Main provider with performance optimization
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ToastContainer } from '../components/ToastContainer';
import { ToastManager } from '../services/ToastManager';
import { getTheme } from '../themes/ThemeRegistry';
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Theme, ThemeName, ThemePair } from '../types/ThemeTypes';
import type { Toast } from '../types/ToastTypes';

interface ToastContextValue {
  toasts: Toast[];
  config: ToastProviderConfig;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastProviderConfig;
  theme?: ThemeName | ThemePair | Theme; // Accept theme name, theme pair, or theme object
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  config = {},
  theme = 'modern',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const manager = useMemo(() => ToastManager.getInstance(), []);

  // Get the theme object - handle different theme types
  const getCurrentTheme = (): Theme => {
    if (!theme) {
      return getTheme('default');
    }

    // If it's already a Theme object, use it directly
    if (typeof theme === 'object' && 'name' in theme && 'colors' in theme) {
      return theme as Theme;
    }

    // If it's a ThemePair, use the light version by default
    if (typeof theme === 'object' && 'light' in theme && 'dark' in theme) {
      return (theme as ThemePair).light;
    }

    // If it's a theme name string, get it from registry
    if (typeof theme === 'string') {
      return getTheme(theme as ThemeName);
    }

    // Fallback to modern theme
    return getTheme('default');
  };

  const currentTheme = getCurrentTheme();

  useEffect(() => {
    const unsubscribe = manager.subscribe(setToasts);
    return unsubscribe;
  }, [manager]);

  const contextValue = useMemo(
    () => ({
      toasts,
      config: {
        maxToasts: 5,
        defaultDuration: 4000,
        defaultPosition: 'smart' as const,
        ...config,
      },
    }),
    [toasts, config]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer theme={currentTheme} />
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
