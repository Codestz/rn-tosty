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
   *   style: {
   *     backgroundColor: '#FF6B6B',
   *     textColor: '#FFFFFF',
   *     borderRadius: 20,
   *   },
   *   behavior: {
   *     defaultDuration: 5000,
   *     hapticFeedback: 'medium',
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
  'minimal': 'minimal',
  'outlined': 'outlined',
  'filled': 'filled',
  'glass': 'glass',
  'card': 'card',
  'banner': 'banner',
  'floating': 'floating',
  'compact': 'compact',
  'notification': 'notification',
  'alert': 'alert',
  'success-filled': 'success-filled',
  'error-filled': 'error-filled',
  'warning-filled': 'warning-filled',
  'info-filled': 'info-filled',
} as const;

// Export types for external use
export type {
  CustomVariantConfig,
  PredefinedVariantName,
  ToastVariantDefinition,
  VariantBuilder,
  VariantName,
} from '../types/VariantTypes';
