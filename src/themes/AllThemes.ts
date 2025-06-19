import { DefaultTheme } from './presets/DefaultTheme';
import { ForestGlowTheme } from './presets/ForestGlowTheme';
import { OceanBreezeTheme } from './presets/OceanBreezeTheme';
import { WarmSunsetTheme } from './presets/WarmSunsetTheme';

export const Themes = {
  default: DefaultTheme,
  warmSunset: WarmSunsetTheme,
  oceanBreeze: OceanBreezeTheme,
  forestGlow: ForestGlowTheme,
} as const;
