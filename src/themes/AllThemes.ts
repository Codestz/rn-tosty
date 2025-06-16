import { DefaultTheme } from './presets/DefaultTheme';
import { LiquidGlassTheme } from './presets/LiquidGlassTheme';
import { MinimalistTheme } from './presets/MinimalistTheme';

export const Themes = {
  default: DefaultTheme,
  minimalist: MinimalistTheme,
  liquidGlass: LiquidGlassTheme,
} as const;
