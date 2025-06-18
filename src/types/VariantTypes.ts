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

// Theme-aware style configuration
export interface ThemeAwareVariantStyle {
  // Option 1: Use a single style that adapts automatically to theme
  style?: VariantStyle;

  // Option 2: Define separate styles for light and dark modes
  light?: VariantStyle;
  dark?: VariantStyle;

  // Option 3: Use theme-specific overrides (for multiple themes)
  themeStyles?: {
    [themeName: string]: {
      light?: VariantStyle;
      dark?: VariantStyle;
    };
  };
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

// Complete variant definition (enhanced with theme-aware styles)
export interface ToastVariantDefinition {
  name: string;
  displayName?: string;
  description?: string;

  // Theme-aware style configuration (new enhanced version)
  themeAwareStyle?: ThemeAwareVariantStyle;

  // Legacy style configuration (for backward compatibility)
  style?: VariantStyle;

  // Behavior configuration
  behavior?: VariantBehavior;

  // Type-specific overrides
  typeOverrides?: Partial<Record<ToastType, Partial<VariantStyle>>>;

  // Theme-specific overrides (legacy - will be deprecated)
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

// Enhanced custom variant configuration with theme-aware styles
export interface CustomVariantConfig
  extends Omit<ToastVariantDefinition, 'name'> {
  name: string;

  // Enhanced style options
  themeAwareStyle?: ThemeAwareVariantStyle;

  // For backward compatibility
  style?: VariantStyle;
}

// Simplified theme-aware variant config for easier usage
export interface SimpleThemeAwareVariantConfig {
  name: string;
  displayName?: string;
  description?: string;
  extends?: string;

  // Simple theme-aware style options
  light?: VariantStyle;
  dark?: VariantStyle;

  // Or auto-adapting style
  style?: VariantStyle;

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

// Enhanced variant builder for creating theme-aware custom variants
export interface VariantBuilder {
  // Base configuration
  setName(name: string): VariantBuilder;
  setDisplayName(displayName: string): VariantBuilder;
  setDescription(description: string): VariantBuilder;

  // Enhanced style methods for theme-aware styling
  setLightStyle(style: VariantStyle): VariantBuilder;
  setDarkStyle(style: VariantStyle): VariantBuilder;
  setAdaptiveStyle(style: VariantStyle): VariantBuilder; // Auto-adapts to theme

  // Legacy style methods (for backward compatibility)
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

  // Theme overrides (legacy)
  setThemeOverride(
    themeName: string,
    style: Partial<VariantStyle>
  ): VariantBuilder;

  // Inheritance
  extends(parentVariantName: string): VariantBuilder;

  // Build the variant
  build(): ToastVariantDefinition;
}

// Enhanced variant manager interface
export interface VariantManager {
  // Registration
  registerVariant(variant: ToastVariantDefinition): void;
  registerCustomVariant(config: CustomVariantConfig): void;
  registerThemeAwareVariant(config: SimpleThemeAwareVariantConfig): void; // New method

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
  createThemeAwareVariant(): ThemeAwareVariantBuilder; // New builder
}

// New theme-aware variant builder interface
export interface ThemeAwareVariantBuilder {
  setName(name: string): ThemeAwareVariantBuilder;
  setDisplayName(displayName: string): ThemeAwareVariantBuilder;
  setDescription(description: string): ThemeAwareVariantBuilder;

  // Theme-aware styling
  forLightMode(style: VariantStyle): ThemeAwareVariantBuilder;
  forDarkMode(style: VariantStyle): ThemeAwareVariantBuilder;
  forAllModes(style: VariantStyle): ThemeAwareVariantBuilder; // Auto-adapting

  // Behavior
  setBehavior(behavior: VariantBehavior): ThemeAwareVariantBuilder;

  // Inheritance
  extends(parentVariantName: string): ThemeAwareVariantBuilder;

  // Build
  build(): ToastVariantDefinition;
}

export type VariantName = PredefinedVariantName | string;
export type VariantConfig =
  | ToastVariantDefinition
  | CustomVariantConfig
  | SimpleThemeAwareVariantConfig;
