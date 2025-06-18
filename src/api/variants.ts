// Variants API - Public interface for the Toast Variants System
import { VariantManager } from '../services/VariantManager';
import type {
  CustomVariantConfig,
  PredefinedVariantName,
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
   *   theme: {
   *     light: {
   *       name: 'my-custom-light',
   *       mode: 'light',
   *       colors: {
   *         surface: '#FF6B6B',
   *         onSurface: '#FFFFFF',
   *         // ... other theme properties
   *       },
   *       // ... rest of theme
   *     },
   *     dark: {
   *       // ... dark theme
   *     }
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
   *   extends: 'success',
   *   themeOverrides: {
   *     light: {
   *       borderRadius: 'xl',
   *       shadows: '0 8px 16px rgba(0,0,0,0.1)',
   *     }
   *   }
   * });
   * ```
   */
  registerCustom: (config: CustomVariantConfig): void => {
    variantManager.registerCustomVariant(config);
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
   *   .setTheme(myCustomTheme)
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

  /**
   * Reset a user override for a predefined variant
   * This allows the variant to be theme-aware again
   * @param variantName - Name of the predefined variant to reset
   * @example
   * ```typescript
   * // User overrode success variant
   * variants.register({
   *   name: 'success',
   *   theme: myCustomTheme,
   *   // ... other config
   * });
   *
   * // Later, reset to make it theme-aware again
   * variants.resetOverride('success');
   * ```
   */
  resetOverride: (variantName: PredefinedVariantName): void => {
    variantManager.resetVariantOverride(variantName);
  },

  /**
   * Check if a predefined variant has been overridden by the user
   * @param variantName - Name of the predefined variant to check
   * @returns True if overridden, false if still theme-aware
   * @example
   * ```typescript
   * const isOverridden = variants.isOverridden('success');
   * if (isOverridden) {
   *   console.log('success variant has been customized by user');
   * } else {
   *   console.log('success variant adapts to current theme');
   * }
   * ```
   */
  isOverridden: (variantName: PredefinedVariantName): boolean => {
    return variantManager.isVariantOverridden(variantName);
  },
};

// Export predefined variant names for convenience
export const PREDEFINED_VARIANTS: Record<
  PredefinedVariantName,
  PredefinedVariantName
> = {
  default: 'default',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
} as const;

// Export types for external use
export type {
  CustomVariantConfig,
  PredefinedVariantName,
  ToastVariantDefinition,
  VariantBuilder,
  VariantName,
} from '../types/VariantTypes';
