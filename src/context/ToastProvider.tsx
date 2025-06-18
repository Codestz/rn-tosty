// Toast Provider - Main provider with performance optimization and dynamic theme switching
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ColorSchemeName } from 'react-native';
import { Appearance } from 'react-native';
import { ToastContainer } from '../components/ToastContainer';
import { ToastManager } from '../services/ToastManager';
import { getTheme, ThemeManager } from '../themes/ThemeRegistry';
import type { ToastProviderConfig } from '../types/ConfigTypes';
import type { Theme, ThemeName, ThemePair } from '../types/ThemeTypes';
import type { Toast } from '../types/ToastTypes';

interface ToastContextValue {
  toasts: Toast[];
  config: ToastProviderConfig;
  // Theme management
  currentTheme: Theme;
  themeName: ThemeName;
  themeMode: 'light' | 'dark' | 'auto';
  // Theme switching functions
  setThemeMode: (mode: 'light' | 'dark' | 'auto') => void;
  setTheme: (theme: ThemeName, mode?: 'light' | 'dark' | 'auto') => void;
  toggleThemeMode: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastProviderConfig;
  theme?: ThemeName | ThemePair | Theme;
  initialMode?: 'light' | 'dark' | 'auto';
  /**
   * Whether to automatically follow system appearance changes
   * @default true
   */
  followSystemAppearance?: boolean;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  config = {},
  theme = 'default',
  initialMode = 'auto',
  followSystemAppearance = true,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );
  const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'auto'>(
    initialMode
  );
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>(() => {
    // Extract theme name from different input types
    if (typeof theme === 'string') {
      return theme as ThemeName;
    }
    if (typeof theme === 'object' && 'light' in theme && 'dark' in theme) {
      return 'default'; // Default fallback for ThemePair
    }
    if (typeof theme === 'object' && 'name' in theme) {
      // Extract theme name from Theme object
      const themeName = (theme as Theme).name
        .replace('-light', '')
        .replace('-dark', '');
      return themeName as ThemeName;
    }
    return 'default';
  });

  const manager = useMemo(() => ToastManager.getInstance(), []);
  const themeManager = useMemo(() => ThemeManager.getInstance(), []);

  // Listen to system appearance changes
  useEffect(() => {
    if (!followSystemAppearance) return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
      if (themeMode === 'auto') {
        // Update theme manager with new system color scheme
        themeManager.setSystemColorScheme(colorScheme || 'light');
      }
    });

    return () => subscription.remove();
  }, [followSystemAppearance, themeMode, themeManager]);

  // Calculate current theme based on mode and system preferences
  const currentTheme = useMemo((): Theme => {
    let targetMode: 'light' | 'dark';

    if (themeMode === 'auto') {
      targetMode = systemColorScheme === 'dark' ? 'dark' : 'light';
    } else {
      targetMode = themeMode;
    }

    // Handle different theme input types
    if (typeof theme === 'object' && 'light' in theme && 'dark' in theme) {
      // ThemePair provided directly
      return (theme as ThemePair)[targetMode];
    }

    if (typeof theme === 'object' && 'colors' in theme) {
      // Direct Theme object - use as is but check if mode matches
      const themeObj = theme as Theme;
      if (themeObj.mode === targetMode) {
        return themeObj;
      }
      // If mode doesn't match, try to get the correct variant from registry
      return getTheme(currentThemeName, targetMode);
    }

    // Theme name string or fallback
    return getTheme(currentThemeName, targetMode);
  }, [theme, themeMode, systemColorScheme, currentThemeName]);

  // Theme switching functions
  const setThemeMode = useCallback(
    (mode: 'light' | 'dark' | 'auto') => {
      setThemeModeState(mode);
      if (mode !== 'auto') {
        themeManager.setSystemColorScheme(mode);
      }
    },
    [themeManager]
  );

  const setTheme = useCallback(
    (themeName: ThemeName, mode?: 'light' | 'dark' | 'auto') => {
      setCurrentThemeName(themeName);
      if (mode) {
        setThemeMode(mode);
      }
      themeManager.setTheme(themeName, mode || themeMode);
    },
    [setThemeMode, themeMode, themeManager]
  );

  const toggleThemeMode = useCallback(() => {
    if (themeMode === 'auto') {
      // If auto, switch to opposite of current system
      const newMode = systemColorScheme === 'dark' ? 'light' : 'dark';
      setThemeMode(newMode);
    } else {
      // Toggle between light and dark
      setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    }
  }, [themeMode, systemColorScheme, setThemeMode]);

  useEffect(() => {
    const unsubscribe = manager.subscribe(setToasts);

    // Configure queue management if provided
    if (config.queue) {
      manager.configureQueue(config.queue);
    }

    return unsubscribe;
  }, [manager, config.queue]);

  const contextValue = useMemo(
    () => ({
      toasts,
      config: {
        maxToasts: 5,
        defaultDuration: 4000,
        defaultPosition: 'smart' as const,
        ...config,
      },
      // Theme management
      currentTheme,
      themeName: currentThemeName,
      themeMode,
      setThemeMode,
      setTheme,
      toggleThemeMode,
    }),
    [
      toasts,
      config,
      currentTheme,
      currentThemeName,
      themeMode,
      setThemeMode,
      setTheme,
      toggleThemeMode,
    ]
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
