// Toast Variants System - Simplified theme-based variant definitions
import type { CustomIconComponent, ToastTypeIconConfig } from './IconTypes';
import type { Theme, ThemePair } from './ThemeTypes';
import type { ToastType } from './ToastTypes';

// Base variant style properties (keep for backward compatibility in some areas)
export interface VariantStyle {
  // Background styling
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundGradient?: string;

  // Border styling
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderRadius?: number | string;

  // Text styling
  textColor?: string;
  titleColor?: string;
  textAlign?: 'left' | 'center' | 'right';

  // Icon styling
  iconColor?: string;
  iconSize?: 'small' | 'medium' | 'large' | number;
  iconPosition?: 'left' | 'right' | 'top' | 'none';

  // Layout and spacing
  padding?: number | { horizontal?: number; vertical?: number };
  margin?: number | { horizontal?: number; vertical?: number };
  minHeight?: number;
  maxWidth?: number;

  // Shadow and effects
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: { x: number; y: number };
  elevation?: number; // Android elevation

  // Animation overrides
  animationDuration?: number;
  animationEasing?: string;
}

// Variant behavior configuration
export interface VariantBehavior {
  // Auto-dismiss behavior
  autoDismiss?: boolean;
  defaultDuration?: number;

  // Interaction behavior
  dismissOnTap?: boolean;
  allowManualDismiss?: boolean;

  // Priority handling
  priority?: 'low' | 'medium' | 'high' | 'urgent';

  // Stacking behavior
  stackable?: boolean;
  replaceExisting?: boolean;
}

// Flexible extends - can extend from string name or specific theme mode
export type VariantExtends =
  | string // Extend from variant name
  | {
      variant: string;
      mode?: 'light' | 'dark'; // Extend from specific mode of a theme pair
    };

// Simplified variant definition using themes
export interface ToastVariantDefinition {
  name: string;
  displayName?: string;
  description?: string;

  // Theme-based styling - can be single theme or theme pair
  theme?: Theme | ThemePair;

  // Behavior configuration
  behavior?: VariantBehavior;

  // Type-specific overrides
  typeOverrides?: Partial<Record<ToastType, Partial<VariantStyle>>>;

  // Icon configuration
  iconConfig?: {
    showIcon?: boolean;
    iconComponent?: CustomIconComponent;
    typeIcons?: Partial<
      Record<ToastType, CustomIconComponent | ToastTypeIconConfig>
    >;
  };

  // Flexible inheritance
  extends?: VariantExtends;
}

// Predefined variant names - built-in variants that ship with the library
export type PredefinedVariantName =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

// Simplified custom variant configuration
export interface CustomVariantConfig
  extends Omit<ToastVariantDefinition, 'name'> {
  name: string;
}

// Variant registry for managing all variants
export interface VariantRegistry {
  // Predefined variants
  predefined: Record<PredefinedVariantName, ToastVariantDefinition>;

  // Custom variants
  custom: Record<string, ToastVariantDefinition>;
}

// Resolved variant (after inheritance and theme application)
export interface ResolvedVariant {
  name: string;
  theme: Theme; // Always resolved to a single theme for the current mode
  style: Required<VariantStyle>; // Computed style from theme
  behavior: Required<VariantBehavior>;
  iconConfig: {
    showIcon: boolean;
    iconComponent?: CustomIconComponent;
    typeIcons: Partial<
      Record<ToastType, CustomIconComponent | ToastTypeIconConfig>
    >;
  };
}

// Variant resolution context
export interface VariantResolutionContext {
  toastType: ToastType;
  isDarkMode: boolean;
  currentTheme: Theme; // Current theme being used
  isRTL?: boolean;
}

// Unified variant builder
export interface VariantBuilder {
  // Base configuration
  setName(name: string): VariantBuilder;
  setDisplayName(displayName: string): VariantBuilder;
  setDescription(description: string): VariantBuilder;

  // Theme-based styling
  setTheme(theme: Theme | ThemePair): VariantBuilder;

  // Behavior methods
  setAutoDismiss(autoDismiss: boolean): VariantBuilder;
  setDefaultDuration(duration: number): VariantBuilder;
  setDismissOnTap(dismissOnTap: boolean): VariantBuilder;
  setPriority(priority: 'low' | 'medium' | 'high' | 'urgent'): VariantBuilder;

  // Icon configuration
  setShowIcon(showIcon: boolean): VariantBuilder;
  setIconComponent(iconComponent: CustomIconComponent): VariantBuilder;

  // Type overrides
  setTypeOverride(
    type: ToastType,
    style: Partial<VariantStyle>
  ): VariantBuilder;

  // Flexible inheritance
  extends(extendsFrom: VariantExtends): VariantBuilder;

  // Build the variant
  build(): ToastVariantDefinition;
}

// Simplified variant manager interface
export interface VariantManager {
  // Registration
  registerVariant(variant: ToastVariantDefinition): void;
  registerCustomVariant(config: CustomVariantConfig): void;

  // Retrieval
  getVariant(name: string): ToastVariantDefinition | null;
  getAllVariants(): Record<string, ToastVariantDefinition>;
  getPredefinedVariants(): Record<
    PredefinedVariantName,
    ToastVariantDefinition
  >;
  getCustomVariants(): Record<string, ToastVariantDefinition>;

  // Resolution
  resolveVariant(
    variantName: string,
    context: VariantResolutionContext
  ): ResolvedVariant;

  // Validation
  validateVariant(variant: ToastVariantDefinition): boolean;

  // Builder
  createVariant(): VariantBuilder;
}

export type VariantName = PredefinedVariantName | string;
export type VariantConfig = ToastVariantDefinition | CustomVariantConfig;
