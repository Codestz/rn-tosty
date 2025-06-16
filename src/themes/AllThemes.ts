// All Themes - Single export for all available themes
import { GlassmorphismTheme } from './presets/GlassmorphismTheme';
import { MinimalistTheme } from './presets/MinimalistTheme';
import { ModernTheme } from './presets/ModernTheme';
import { ProfessionalTheme } from './presets/ProfessionalTheme';
import { VibrantTheme } from './presets/VibrantTheme';

// Export all themes in a single object for easy access
export const Themes = {
  modern: ModernTheme,
  glassmorphism: GlassmorphismTheme,
  minimalist: MinimalistTheme,
  vibrant: VibrantTheme,
  professional: ProfessionalTheme,
} as const;
