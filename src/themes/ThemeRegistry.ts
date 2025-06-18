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
  private currentThemeName: ThemeName = 'default';
  private systemColorScheme: 'light' | 'dark' = 'light';

  private constructor() {
    // Default to modern light theme
    this.currentTheme = themeRegistry.default.light;
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
      // Import logger at the top of the file
      const { logWarn } = require('../utils/logger');
      logWarn(`Theme "${themeName}" not found. Falling back to default theme.`);
      return themeRegistry.default.light;
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

  // Set current theme and update variant system
  setTheme(themeName: ThemeName, mode?: 'light' | 'dark' | 'auto'): void {
    this.currentTheme = this.getTheme(themeName, mode);
    this.currentThemeName = themeName;

    // Update predefined variants to use the new theme
    this.updateVariantsForTheme(themeName);
  }

  // Get current theme
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // Get current theme name
  getCurrentThemeName(): ThemeName {
    return this.currentThemeName;
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

  /**
   * Update predefined variants to use the current theme
   * This ensures success/error/warning/info variants adapt to theme changes
   * @param themeName - Name of the theme to update variants for
   */
  private updateVariantsForTheme(themeName: ThemeName): void {
    const themePair = this.getThemePair(themeName);
    if (themePair) {
      // Lazy import to avoid circular dependencies
      const { VariantManager } = require('../services/VariantManager');
      const variantManager = VariantManager.getInstance();
      variantManager.updatePredefinedVariantsTheme(themePair);
    }
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
export const defaultTheme = themeRegistry.default.light;
