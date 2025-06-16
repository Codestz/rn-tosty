// Theme Registry - Lightweight registry with all themes available
import type {
  Theme,
  ThemeName,
  ThemePair,
  ThemeRegistry,
} from '../types/ThemeTypes';
import { Themes } from './AllThemes';

// All themes are available by default
export const themeRegistry: ThemeRegistry = Themes;

// Theme utilities
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme;
  private systemColorScheme: 'light' | 'dark' = 'light';

  private constructor() {
    // Default to modern light theme
    this.currentTheme = themeRegistry.modern.light;
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // Get theme by name and mode
  getTheme(themeName: ThemeName, mode?: 'light' | 'dark' | 'auto'): Theme {
    const themePair = themeRegistry[themeName];
    if (!themePair) {
      console.warn(
        `Theme "${themeName}" not found. Falling back to modern theme.`
      );
      return themeRegistry.modern.light;
    }

    // Determine which mode to use
    let targetMode: 'light' | 'dark';
    if (mode === 'auto') {
      targetMode = this.systemColorScheme;
    } else if (mode) {
      targetMode = mode;
    } else {
      targetMode = 'light'; // Default to light
    }

    return themePair[targetMode];
  }

  // Set current theme
  setTheme(themeName: ThemeName, mode?: 'light' | 'dark' | 'auto'): void {
    this.currentTheme = this.getTheme(themeName, mode);
  }

  // Get current theme
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // Update system color scheme (for auto mode)
  setSystemColorScheme(scheme: 'light' | 'dark'): void {
    this.systemColorScheme = scheme;
  }

  // Get all available theme names
  getAvailableThemes(): ThemeName[] {
    return Object.keys(themeRegistry) as ThemeName[];
  }

  // Get theme pair by name
  getThemePair(themeName: ThemeName): ThemePair | null {
    return themeRegistry[themeName] || null;
  }

  // Check if theme exists
  hasTheme(themeName: ThemeName): boolean {
    return themeName in themeRegistry;
  }
}

// Convenience functions for easy theme access
export const getTheme = (
  themeName: ThemeName,
  mode?: 'light' | 'dark' | 'auto'
): Theme => {
  return ThemeManager.getInstance().getTheme(themeName, mode);
};

export const getAllThemes = (): Partial<ThemeRegistry> => {
  return themeRegistry;
};

export const getThemeNames = (): ThemeName[] => {
  return Object.keys(themeRegistry) as ThemeName[];
};

// Legacy support - convert old theme names to new format
export const parseLegacyThemeName = (
  legacyName: string
): { name: ThemeName; mode: 'light' | 'dark' } | null => {
  const parts = legacyName.split('-');
  if (parts.length !== 2) return null;

  const [name, mode] = parts;
  if (
    !themeRegistry[name as ThemeName] ||
    (mode !== 'light' && mode !== 'dark')
  ) {
    return null;
  }

  return {
    name: name as ThemeName,
    mode: mode as 'light' | 'dark',
  };
};

// Default theme
export const defaultTheme = themeRegistry.modern.light;
