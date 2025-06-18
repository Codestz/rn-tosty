// Variant Manager - Simplified theme-based variant management system
import type { Theme, ThemePair } from '../types/ThemeTypes';
import type { ToastType } from '../types/ToastTypes';
import type {
  CustomVariantConfig,
  VariantBuilder as IVariantBuilder,
  VariantManager as IVariantManager,
  PredefinedVariantName,
  ResolvedVariant,
  ToastVariantDefinition,
  VariantBehavior,
  VariantExtends,
  VariantRegistry,
  VariantResolutionContext,
  VariantStyle,
} from '../types/VariantTypes';
import {
  createPredefinedVariants,
  predefinedVariants,
} from '../variants/PredefinedVariants';

// Unified Variant Builder implementation
class VariantBuilder implements IVariantBuilder {
  private variant: Partial<ToastVariantDefinition> = {
    behavior: {},
    iconConfig: {},
  };

  setName(name: string): IVariantBuilder {
    this.variant.name = name;
    return this;
  }

  setDisplayName(displayName: string): IVariantBuilder {
    this.variant.displayName = displayName;
    return this;
  }

  setDescription(description: string): IVariantBuilder {
    this.variant.description = description;
    return this;
  }

  setTheme(theme: Theme | ThemePair): IVariantBuilder {
    this.variant.theme = theme;
    return this;
  }

  setAutoDismiss(autoDismiss: boolean): IVariantBuilder {
    if (!this.variant.behavior) this.variant.behavior = {};
    this.variant.behavior.autoDismiss = autoDismiss;
    return this;
  }

  setDefaultDuration(duration: number): IVariantBuilder {
    if (!this.variant.behavior) this.variant.behavior = {};
    this.variant.behavior.defaultDuration = duration;
    return this;
  }

  setDismissOnTap(dismissOnTap: boolean): IVariantBuilder {
    if (!this.variant.behavior) this.variant.behavior = {};
    this.variant.behavior.dismissOnTap = dismissOnTap;
    return this;
  }

  setPriority(priority: 'low' | 'medium' | 'high' | 'urgent'): IVariantBuilder {
    if (!this.variant.behavior) this.variant.behavior = {};
    this.variant.behavior.priority = priority;
    return this;
  }

  setShowIcon(showIcon: boolean): IVariantBuilder {
    if (!this.variant.iconConfig) this.variant.iconConfig = {};
    this.variant.iconConfig.showIcon = showIcon;
    return this;
  }

  setIconComponent(iconComponent: any): IVariantBuilder {
    if (!this.variant.iconConfig) this.variant.iconConfig = {};
    this.variant.iconConfig.iconComponent = iconComponent;
    return this;
  }

  setTypeOverride(
    type: ToastType,
    style: Partial<VariantStyle>
  ): IVariantBuilder {
    if (!this.variant.typeOverrides) this.variant.typeOverrides = {};
    this.variant.typeOverrides[type] = style;
    return this;
  }

  extends(extendsFrom: VariantExtends): IVariantBuilder {
    this.variant.extends = extendsFrom;
    return this;
  }

  build(): ToastVariantDefinition {
    if (!this.variant.name) {
      throw new Error('Variant name is required');
    }

    return this.variant as ToastVariantDefinition;
  }
}

// Simplified Variant Manager implementation
export class VariantManager implements IVariantManager {
  private static instance: VariantManager;
  private registry: VariantRegistry;
  private userOverrides: Set<string> = new Set(); // Track which variants users have overridden

  private constructor() {
    this.registry = {
      predefined: { ...predefinedVariants },
      custom: {},
    };
  }

  static getInstance(): VariantManager {
    if (!VariantManager.instance) {
      VariantManager.instance = new VariantManager();
    }
    return VariantManager.instance;
  }

  /**
   * Update predefined variants to use a new theme
   * This makes success/error/warning/info variants adapt to the current theme
   * @param theme - The theme to base predefined variants on
   */
  updatePredefinedVariantsTheme(theme: ThemePair): void {
    const newPredefinedVariants = createPredefinedVariants(theme);

    // Only update variants that haven't been overridden by users
    Object.entries(newPredefinedVariants).forEach(([name, variant]) => {
      if (!this.userOverrides.has(name)) {
        this.registry.predefined[name as PredefinedVariantName] = variant;
      }
    });
  }

  registerVariant(variant: ToastVariantDefinition): void {
    if (this.registry.predefined[variant.name as PredefinedVariantName]) {
      // User is overriding a predefined variant
      this.userOverrides.add(variant.name);
      this.registry.predefined[variant.name as PredefinedVariantName] = variant;
    } else {
      // Add as custom variant
      this.registry.custom[variant.name] = variant;
    }
  }

  registerCustomVariant(config: CustomVariantConfig): void {
    this.registry.custom[config.name] = config;
  }

  getVariant(name: string): ToastVariantDefinition | null {
    return (
      this.registry.predefined[name as PredefinedVariantName] ||
      this.registry.custom[name] ||
      null
    );
  }

  getAllVariants(): Record<string, ToastVariantDefinition> {
    return {
      ...this.registry.predefined,
      ...this.registry.custom,
    };
  }

  getPredefinedVariants(): Record<
    PredefinedVariantName,
    ToastVariantDefinition
  > {
    return this.registry.predefined;
  }

  getCustomVariants(): Record<string, ToastVariantDefinition> {
    return this.registry.custom;
  }

  /**
   * Reset a user override for a predefined variant
   * This allows the variant to be theme-aware again
   * @param variantName - Name of the variant to reset
   */
  resetVariantOverride(variantName: PredefinedVariantName): void {
    this.userOverrides.delete(variantName);
    // Variant will be updated on next theme change
  }

  /**
   * Check if a predefined variant has been overridden by the user
   * @param variantName - Name of the variant to check
   * @returns True if overridden, false otherwise
   */
  isVariantOverridden(variantName: PredefinedVariantName): boolean {
    return this.userOverrides.has(variantName);
  }

  resolveVariant(
    variantName: string,
    context: VariantResolutionContext
  ): ResolvedVariant {
    let variant = this.getVariant(variantName);

    if (!variant) {
      throw new Error(`Variant '${variantName}' not found`);
    }

    // Resolve inheritance
    variant = this.resolveInheritance(variant, context);

    // Get the appropriate theme for current mode
    const resolvedTheme = this.resolveThemeForMode(
      variant.theme || context.currentTheme,
      context.isDarkMode
    );

    // Apply type-specific overrides
    variant = this.applyTypeOverrides(variant, context.toastType);

    // Convert theme to style for backward compatibility
    const style = this.themeToStyle(resolvedTheme);

    return {
      name: variant.name,
      theme: resolvedTheme,
      style: this.getCompleteStyle(style),
      behavior: this.getCompleteBehavior(variant.behavior),
      iconConfig: this.getCompleteIconConfig(variant.iconConfig),
    };
  }

  validateVariant(variant: ToastVariantDefinition): boolean {
    return !!variant.name && (!!variant.theme || !!variant.extends);
  }

  createVariant(): IVariantBuilder {
    return new VariantBuilder();
  }

  private resolveInheritance(
    variant: ToastVariantDefinition,
    _context: VariantResolutionContext
  ): ToastVariantDefinition {
    if (!variant.extends) {
      return variant;
    }

    let parentVariant: ToastVariantDefinition | null;
    let parentTheme: Theme | ThemePair | undefined;

    if (typeof variant.extends === 'string') {
      // Simple string inheritance
      parentVariant = this.getVariant(variant.extends);
      if (!parentVariant) {
        throw new Error(`Parent variant '${variant.extends}' not found`);
      }
      parentTheme = parentVariant.theme;
    } else {
      // Object inheritance with specific mode
      parentVariant = this.getVariant(variant.extends.variant);
      if (!parentVariant) {
        throw new Error(
          `Parent variant '${variant.extends.variant}' not found`
        );
      }

      // Get specific mode from parent theme if specified
      if (variant.extends.mode && parentVariant.theme) {
        if ('light' in parentVariant.theme && 'dark' in parentVariant.theme) {
          // Parent has ThemePair, extract specific mode
          parentTheme = parentVariant.theme[variant.extends.mode];
        } else {
          // Parent has single Theme, use as-is
          parentTheme = parentVariant.theme as Theme;
        }
      } else {
        parentTheme = parentVariant.theme;
      }
    }

    // Merge with inheritance
    return {
      ...parentVariant,
      ...variant,
      theme: variant.theme || parentTheme,
      behavior: {
        ...parentVariant.behavior,
        ...variant.behavior,
      },
      iconConfig: {
        ...parentVariant.iconConfig,
        ...variant.iconConfig,
      },
      typeOverrides: {
        ...parentVariant.typeOverrides,
        ...variant.typeOverrides,
      },
    };
  }

  private resolveThemeForMode(
    theme: Theme | ThemePair | undefined,
    isDarkMode: boolean
  ): Theme {
    if (!theme) {
      throw new Error('No theme available for variant');
    }

    if ('light' in theme && 'dark' in theme) {
      // ThemePair - return appropriate mode
      return isDarkMode ? theme.dark : theme.light;
    }

    // Single Theme - return as-is
    return theme as Theme;
  }

  private applyTypeOverrides(
    variant: ToastVariantDefinition,
    _toastType: ToastType
  ): ToastVariantDefinition {
    // For now, just return the variant as-is
    // Type overrides will be handled in the style resolution phase
    return variant;
  }

  private themeToStyle(theme: Theme): Partial<VariantStyle> {
    // Convert theme properties to style properties for backward compatibility
    return {
      backgroundColor: theme.colors.surface,
      textColor: theme.colors.onSurface,
      titleColor: theme.colors.onSurface,
      borderColor: theme.colors.border,
      borderRadius:
        typeof theme.borderRadius === 'number' ? theme.borderRadius : 8,
      // Add more mappings as needed
    };
  }

  private getCompleteStyle(
    style: Partial<VariantStyle> = {}
  ): Required<VariantStyle> {
    return {
      backgroundColor: style.backgroundColor || 'transparent',
      backgroundOpacity: style.backgroundOpacity || 1,
      backgroundGradient: style.backgroundGradient || '',
      borderColor: style.borderColor || 'transparent',
      borderWidth: style.borderWidth || 0,
      borderStyle: style.borderStyle || 'solid',
      borderRadius: style.borderRadius || 8,
      textColor: style.textColor || '#000000',
      titleColor: style.titleColor || '#000000',
      textAlign: style.textAlign || 'left',
      iconColor: style.iconColor || '#000000',
      iconSize: style.iconSize || 'medium',
      iconPosition: style.iconPosition || 'left',
      padding: style.padding || 16,
      margin: style.margin || 0,
      minHeight: style.minHeight || 0,
      maxWidth: style.maxWidth || 400,
      shadowColor: style.shadowColor || '#000000',
      shadowOpacity: style.shadowOpacity || 0,
      shadowRadius: style.shadowRadius || 0,
      shadowOffset: style.shadowOffset || { x: 0, y: 0 },
      elevation: style.elevation || 0,
      animationDuration: style.animationDuration || 300,
      animationEasing: style.animationEasing || 'ease-out',
    };
  }

  private getCompleteBehavior(
    behavior: VariantBehavior = {}
  ): Required<VariantBehavior> {
    return {
      autoDismiss: behavior.autoDismiss ?? true,
      defaultDuration: behavior.defaultDuration ?? 4000,
      dismissOnTap: behavior.dismissOnTap ?? true,
      allowManualDismiss: behavior.allowManualDismiss ?? true,
      priority: behavior.priority ?? 'medium',
      stackable: behavior.stackable ?? true,
      replaceExisting: behavior.replaceExisting ?? false,
    };
  }

  private getCompleteIconConfig(
    iconConfig: ToastVariantDefinition['iconConfig'] = {}
  ): ResolvedVariant['iconConfig'] {
    return {
      showIcon: iconConfig.showIcon ?? true,
      iconComponent: iconConfig.iconComponent,
      typeIcons: iconConfig.typeIcons || {},
    };
  }
}
