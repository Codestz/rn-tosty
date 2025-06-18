// Variants API - Public interface for the Toast Variants System
import { VariantManager } from '../services/VariantManager';
import type {
  CustomVariantConfig,
  PredefinedVariantName,
  SimpleThemeAwareVariantConfig,
  ThemeAwareVariantBuilder,
  ToastVariantDefinition,
  VariantBuilder,
  VariantName,
} from '../types/VariantTypes';

// Get the singleton variant manager
const variantManager = VariantManager.getInstance();

/**
 * Variants API - Comprehensive variant management for toast customization
 */
export const variants = {
  /**
   * Register a custom variant
   * @param variant - Complete variant definition
   * @example
   * ```typescript
   * variants.register({
   *   name: 'my-custom-variant',
   *   displayName: 'My Custom Variant',
   *   style: {
   *     backgroundColor: '#FF6B6B',
   *     textColor: '#FFFFFF',
   *     borderRadius: 20,
   *   },
   *   behavior: {
   *     defaultDuration: 5000,
   *   }
   * });
   * ```
   */
  register: (variant: ToastVariantDefinition): void => {
    variantManager.registerVariant(variant);
  },

  /**
   * Register a custom variant with simplified configuration
   * @param config - Custom variant configuration
   * @example
   * ```typescript
   * variants.registerCustom({
   *   name: 'success-card',
   *   extends: 'card',
   *   style: {
   *     backgroundColor: '#10B981',
   *     textColor: '#FFFFFF',
   *   }
   * });
   * ```
   */
  registerCustom: (config: CustomVariantConfig): void => {
    variantManager.registerCustomVariant(config);
  },

  /**
   * Register a theme-aware variant with separate styles for light and dark modes
   * @param config - Theme-aware variant configuration
   * @example
   * ```typescript
   * variants.registerThemeAware({
   *   name: 'my-adaptive-card',
   *   displayName: 'My Adaptive Card',
   *   light: {
   *     backgroundColor: '#F3F4F6',
   *     textColor: '#1F2937',
   *     borderColor: '#D1D5DB',
   *   },
   *   dark: {
   *     backgroundColor: '#1F2937',
   *     textColor: '#F9FAFB',
   *     borderColor: '#374151',
   *   },
   *   behavior: {
   *     defaultDuration: 4000,
   *   }
   * });
   * ```
   */
  registerThemeAware: (config: SimpleThemeAwareVariantConfig): void => {
    variantManager.registerThemeAwareVariant(config);
  },

  /**
   * Register a variant that automatically adapts to the current theme
   * @param config - Variant config with auto-adapting style
   * @example
   * ```typescript
   * variants.registerAdaptive({
   *   name: 'auto-success',
   *   extends: 'success-filled',
   *   style: {
   *     // These colors will be automatically adjusted for light/dark themes
   *     backgroundColor: 'success', // Uses theme's success color
   *     textColor: 'onSurface',     // Uses theme's onSurface color
   *     borderColor: 'border',      // Uses theme's border color
   *   }
   * });
   * ```
   */
  registerAdaptive: (config: SimpleThemeAwareVariantConfig): void => {
    variantManager.registerThemeAwareVariant(config);
  },

  /**
   * Get a specific variant by name
   * @param name - Variant name
   * @returns Variant definition or null if not found
   */
  get: (name: VariantName): ToastVariantDefinition | null => {
    return variantManager.getVariant(name);
  },

  /**
   * Get all available variants (predefined + custom)
   * @returns Record of all variants
   */
  getAll: (): Record<string, ToastVariantDefinition> => {
    return variantManager.getAllVariants();
  },

  /**
   * Get all predefined variants
   * @returns Record of predefined variants
   */
  getPredefined: (): Record<PredefinedVariantName, ToastVariantDefinition> => {
    return variantManager.getPredefinedVariants();
  },

  /**
   * Get all custom variants
   * @returns Record of custom variants
   */
  getCustom: (): Record<string, ToastVariantDefinition> => {
    return variantManager.getCustomVariants();
  },

  /**
   * Create a new variant using the builder pattern
   * @returns VariantBuilder instance
   * @example
   * ```typescript
   * const myVariant = variants.create()
   *   .setName('my-variant')
   *   .setBackgroundColor('#3B82F6')
   *   .setTextColor('#FFFFFF')
   *   .setBorderRadius(12)
   *   .setIconPosition('left')
   *   .setDefaultDuration(4000)
   *   .build();
   *
   * variants.register(myVariant);
   * ```
   */
  create: (): VariantBuilder => {
    return variantManager.createVariant();
  },

  /**
   * Create a theme-aware variant using the enhanced builder pattern
   * @returns ThemeAwareVariantBuilder instance
   * @example
   * ```typescript
   * const adaptiveVariant = variants.createThemeAware()
   *   .setName('adaptive-card')
   *   .setDisplayName('Adaptive Card')
   *   .forLightMode({
   *     backgroundColor: '#FFFFFF',
   *     textColor: '#1F2937',
   *     borderColor: '#E5E7EB',
   *   })
   *   .forDarkMode({
   *     backgroundColor: '#1F2937',
   *     textColor: '#F9FAFB',
   *     borderColor: '#374151',
   *   })
   *   .setBehavior({ defaultDuration: 5000 })
   *   .build();
   *
   * variants.register(adaptiveVariant);
   * ```
   */
  createThemeAware: (): ThemeAwareVariantBuilder => {
    return variantManager.createThemeAwareVariant();
  },

  /**
   * Validate a variant definition
   * @param variant - Variant to validate
   * @returns True if valid, false otherwise
   */
  validate: (variant: ToastVariantDefinition): boolean => {
    return variantManager.validateVariant(variant);
  },

  /**
   * List all available predefined variant names
   * @returns Array of predefined variant names
   */
  listPredefined: (): PredefinedVariantName[] => {
    return Object.keys(
      variantManager.getPredefinedVariants()
    ) as PredefinedVariantName[];
  },

  /**
   * List all available custom variant names
   * @returns Array of custom variant names
   */
  listCustom: (): string[] => {
    return Object.keys(variantManager.getCustomVariants());
  },

  /**
   * Check if a variant exists
   * @param name - Variant name to check
   * @returns True if variant exists, false otherwise
   */
  exists: (name: VariantName): boolean => {
    return variantManager.getVariant(name) !== null;
  },
};

// Export predefined variant names for convenience
export const PREDEFINED_VARIANTS: Record<
  PredefinedVariantName,
  PredefinedVariantName
> = {
  'default': 'default',
  'success-filled': 'success-filled',
  'error-filled': 'error-filled',
  'warning-filled': 'warning-filled',
  'info-filled': 'info-filled',
} as const;

// Export types for external use
export type {
  CustomVariantConfig,
  PredefinedVariantName,
  SimpleThemeAwareVariantConfig,
  ThemeAwareVariantBuilder,
  ToastVariantDefinition,
  VariantBuilder,
  VariantName,
} from '../types/VariantTypes';
