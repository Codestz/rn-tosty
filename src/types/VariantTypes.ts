// Toast Variants System - Comprehensive variant definitions and management
import type { CustomIconComponent, ToastTypeIconConfig } from './IconTypes';
import type { Theme } from './ThemeTypes';
import type { ToastType } from './ToastTypes';

// Base variant style properties
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

// Complete variant definition
export interface ToastVariantDefinition {
  name: string;
  displayName?: string;
  description?: string;

  // Style configuration
  style: VariantStyle;

  // Behavior configuration
  behavior?: VariantBehavior;

  // Type-specific overrides
  typeOverrides?: Partial<Record<ToastType, Partial<VariantStyle>>>;

  // Theme-specific overrides
  themeOverrides?: Record<string, Partial<VariantStyle>>;

  // Icon configuration
  iconConfig?: {
    showIcon?: boolean;
    iconComponent?: CustomIconComponent;
    typeIcons?: Partial<
      Record<ToastType, CustomIconComponent | ToastTypeIconConfig>
    >;
  };

  // Inheritance
  extends?: string; // Name of parent variant to inherit from
}

// Predefined variant names
export type PredefinedVariantName =
  | 'default'
  | 'success-filled'
  | 'error-filled'
  | 'warning-filled'
  | 'info-filled';

// Custom variant configuration
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

  // Theme-specific variant overrides
  themeVariants: Record<
    string,
    Record<string, Partial<ToastVariantDefinition>>
  >;
}

// Resolved variant (after inheritance and theme application)
export interface ResolvedVariant {
  name: string;
  style: Required<VariantStyle>;
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
  theme: Theme;
  toastType: ToastType;
  isDarkMode: boolean;
  isRTL?: boolean;
}

// Variant builder for creating custom variants
export interface VariantBuilder {
  // Base configuration
  setName(name: string): VariantBuilder;
  setDisplayName(displayName: string): VariantBuilder;
  setDescription(description: string): VariantBuilder;

  // Style methods
  setBackgroundColor(color: string): VariantBuilder;
  setTextColor(color: string): VariantBuilder;
  setBorderColor(color: string): VariantBuilder;
  setBorderWidth(width: number): VariantBuilder;
  setBorderRadius(radius: number): VariantBuilder;
  setPadding(
    padding: number | { horizontal?: number; vertical?: number }
  ): VariantBuilder;

  // Icon methods
  setIconPosition(position: 'left' | 'right' | 'top' | 'none'): VariantBuilder;
  setIconSize(size: 'small' | 'medium' | 'large' | number): VariantBuilder;
  setIconColor(color: string): VariantBuilder;

  // Behavior methods
  setAutoDismiss(autoDismiss: boolean): VariantBuilder;
  setDefaultDuration(duration: number): VariantBuilder;

  // Type overrides
  setTypeOverride(
    type: ToastType,
    style: Partial<VariantStyle>
  ): VariantBuilder;

  // Theme overrides
  setThemeOverride(
    themeName: string,
    style: Partial<VariantStyle>
  ): VariantBuilder;

  // Inheritance
  extends(parentVariantName: string): VariantBuilder;

  // Build the variant
  build(): ToastVariantDefinition;
}

// Variant manager interface
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

  // Theme integration
  applyThemeToVariant(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition;

  // Builder
  createVariant(): VariantBuilder;
}

// Export types for external use
export type VariantName = PredefinedVariantName | string;
export type VariantConfig = ToastVariantDefinition | CustomVariantConfig;
