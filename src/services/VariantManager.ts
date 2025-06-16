// Variant Manager - Comprehensive variant management system
import type { Theme } from '../types/ThemeTypes';
import type { ToastType } from '../types/ToastTypes';
import type {
  CustomVariantConfig,
  VariantBuilder as IVariantBuilder,
  VariantManager as IVariantManager,
  PredefinedVariantName,
  ResolvedVariant,
  ToastVariantDefinition,
  VariantBehavior,
  VariantRegistry,
  VariantResolutionContext,
  VariantStyle,
} from '../types/VariantTypes';
import { predefinedVariants } from '../variants/PredefinedVariants';

// Variant Builder implementation
class VariantBuilder implements IVariantBuilder {
  private variant: Partial<ToastVariantDefinition> = {
    style: {},
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

  setBackgroundColor(color: string): IVariantBuilder {
    this.variant.style!.backgroundColor = color;
    return this;
  }

  setTextColor(color: string): IVariantBuilder {
    this.variant.style!.textColor = color;
    return this;
  }

  setBorderColor(color: string): IVariantBuilder {
    this.variant.style!.borderColor = color;
    return this;
  }

  setBorderWidth(width: number): IVariantBuilder {
    this.variant.style!.borderWidth = width;
    return this;
  }

  setBorderRadius(radius: number): IVariantBuilder {
    this.variant.style!.borderRadius = radius;
    return this;
  }

  setPadding(
    padding: number | { horizontal?: number; vertical?: number }
  ): IVariantBuilder {
    this.variant.style!.padding = padding;
    return this;
  }

  setIconPosition(
    position: 'left' | 'right' | 'top' | 'none'
  ): IVariantBuilder {
    this.variant.style!.iconPosition = position;
    return this;
  }

  setIconSize(size: 'small' | 'medium' | 'large' | number): IVariantBuilder {
    this.variant.style!.iconSize = size;
    return this;
  }

  setIconColor(color: string): IVariantBuilder {
    this.variant.style!.iconColor = color;
    return this;
  }

  setAutoDismiss(autoDismiss: boolean): IVariantBuilder {
    this.variant.behavior!.autoDismiss = autoDismiss;
    return this;
  }

  setDefaultDuration(duration: number): IVariantBuilder {
    this.variant.behavior!.defaultDuration = duration;
    return this;
  }

  setTypeOverride(
    type: ToastType,
    style: Partial<VariantStyle>
  ): IVariantBuilder {
    if (!this.variant.typeOverrides) {
      this.variant.typeOverrides = {};
    }
    this.variant.typeOverrides[type] = style;
    return this;
  }

  setThemeOverride(
    themeName: string,
    style: Partial<VariantStyle>
  ): IVariantBuilder {
    if (!this.variant.themeOverrides) {
      this.variant.themeOverrides = {};
    }
    this.variant.themeOverrides[themeName] = style;
    return this;
  }

  extends(parentVariantName: string): IVariantBuilder {
    this.variant.extends = parentVariantName;
    return this;
  }

  build(): ToastVariantDefinition {
    if (!this.variant.name) {
      throw new Error('Variant name is required');
    }
    if (!this.variant.style) {
      throw new Error('Variant style is required');
    }

    return this.variant as ToastVariantDefinition;
  }
}

// Variant Manager implementation
export class VariantManager implements IVariantManager {
  private static instance: VariantManager;
  private registry: VariantRegistry;

  private constructor() {
    this.registry = {
      predefined: { ...predefinedVariants },
      custom: {},
      themeVariants: {},
    };
  }

  static getInstance(): VariantManager {
    if (!VariantManager.instance) {
      VariantManager.instance = new VariantManager();
    }
    return VariantManager.instance;
  }

  // Registration methods
  registerVariant(variant: ToastVariantDefinition): void {
    if (!this.validateVariant(variant)) {
      throw new Error(`Invalid variant definition: ${variant.name}`);
    }

    // Check if it's a predefined variant name
    if (variant.name in predefinedVariants) {
      this.registry.predefined[variant.name as PredefinedVariantName] = variant;
    } else {
      this.registry.custom[variant.name] = variant;
    }
  }

  registerCustomVariant(config: CustomVariantConfig): void {
    const variant: ToastVariantDefinition = {
      ...config,
      name: config.name,
    };
    this.registerVariant(variant);
  }

  // Retrieval methods
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
    return { ...this.registry.predefined };
  }

  getCustomVariants(): Record<string, ToastVariantDefinition> {
    return { ...this.registry.custom };
  }

  // Resolution with inheritance and theme application
  resolveVariant(
    variantName: string,
    context: VariantResolutionContext
  ): ResolvedVariant {
    const variant = this.getVariant(variantName);
    if (!variant) {
      throw new Error(`Variant not found: ${variantName}`);
    }

    // Resolve inheritance chain
    const resolvedVariant = this.resolveInheritance(variant);

    // Apply theme-specific overrides
    const themedVariant = this.applyThemeOverrides(
      resolvedVariant,
      context.theme
    );

    // Apply type-specific overrides
    const typedVariant = this.applyTypeOverrides(
      themedVariant,
      context.toastType
    );

    // Resolve theme color references
    const finalVariant = this.resolveThemeReferences(
      typedVariant,
      context.theme
    );

    return {
      name: finalVariant.name,
      style: this.getCompleteStyle(finalVariant.style),
      behavior: this.getCompleteBehavior(finalVariant.behavior),
      iconConfig: this.getCompleteIconConfig(finalVariant.iconConfig),
    };
  }

  // Validation
  validateVariant(variant: ToastVariantDefinition): boolean {
    if (!variant.name || typeof variant.name !== 'string') {
      return false;
    }
    if (!variant.style || typeof variant.style !== 'object') {
      return false;
    }
    return true;
  }

  // Theme integration
  applyThemeToVariant(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition {
    const context: VariantResolutionContext = {
      theme,
      toastType: 'info', // Default type for theme application
      isDarkMode: theme.mode === 'dark',
    };

    const resolved = this.resolveVariant(variant.name, context);

    return {
      ...variant,
      style: resolved.style,
      behavior: resolved.behavior,
      iconConfig: resolved.iconConfig,
    };
  }

  // Builder factory
  createVariant(): IVariantBuilder {
    return new VariantBuilder();
  }

  // Private helper methods
  private resolveInheritance(
    variant: ToastVariantDefinition
  ): ToastVariantDefinition {
    if (!variant.extends) {
      return variant;
    }

    const parentVariant = this.getVariant(variant.extends);
    if (!parentVariant) {
      console.warn(`Parent variant not found: ${variant.extends}`);
      return variant;
    }

    // Recursively resolve parent inheritance
    const resolvedParent = this.resolveInheritance(parentVariant);

    // Merge parent and child configurations
    return {
      ...resolvedParent,
      ...variant,
      name: variant.name, // Keep child name
      style: {
        ...resolvedParent.style,
        ...variant.style,
      },
      behavior: {
        ...resolvedParent.behavior,
        ...variant.behavior,
      },
      iconConfig: {
        ...resolvedParent.iconConfig,
        ...variant.iconConfig,
      },
      typeOverrides: {
        ...resolvedParent.typeOverrides,
        ...variant.typeOverrides,
      },
      themeOverrides: {
        ...resolvedParent.themeOverrides,
        ...variant.themeOverrides,
      },
    };
  }

  private applyThemeOverrides(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition {
    const themeOverride = variant.themeOverrides?.[theme.name];
    if (!themeOverride) {
      return variant;
    }

    return {
      ...variant,
      style: {
        ...variant.style,
        ...themeOverride,
      },
    };
  }

  private applyTypeOverrides(
    variant: ToastVariantDefinition,
    toastType: ToastType
  ): ToastVariantDefinition {
    const typeOverride = variant.typeOverrides?.[toastType];
    if (!typeOverride) {
      return variant;
    }

    return {
      ...variant,
      style: {
        ...variant.style,
        ...typeOverride,
      },
    };
  }

  private resolveThemeReferences(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition {
    const resolvedStyle = { ...variant.style };

    // Resolve theme color references (e.g., 'theme.colors.primary')
    Object.keys(resolvedStyle).forEach((key) => {
      const value = resolvedStyle[key as keyof VariantStyle];
      if (typeof value === 'string' && value.startsWith('theme.colors.')) {
        const colorPath = value.replace('theme.colors.', '');
        const resolvedColor = (theme.colors as any)[colorPath];
        if (resolvedColor) {
          (resolvedStyle as any)[key] = resolvedColor;
        }
      }
    });

    return {
      ...variant,
      style: resolvedStyle,
    };
  }

  private getCompleteStyle(style: VariantStyle = {}): Required<VariantStyle> {
    return {
      backgroundColor: style.backgroundColor || 'transparent',
      backgroundOpacity: style.backgroundOpacity ?? 1,
      backgroundGradient: style.backgroundGradient || '',
      borderColor: style.borderColor || 'transparent',
      borderWidth: style.borderWidth ?? 0,
      borderStyle: style.borderStyle || 'solid',
      borderRadius: style.borderRadius ?? 8,
      textColor: style.textColor || '#000000',
      titleColor: style.titleColor || '#000000',
      textAlign: style.textAlign || 'left',
      iconColor: style.iconColor || '#000000',
      iconSize: style.iconSize || 'medium',
      iconPosition: style.iconPosition || 'left',
      padding: style.padding ?? { horizontal: 16, vertical: 12 },
      margin: style.margin ?? { horizontal: 0, vertical: 0 },
      minHeight: style.minHeight ?? 56,
      maxWidth: style.maxWidth ?? 400,
      shadowColor: style.shadowColor || '#000000',
      shadowOpacity: style.shadowOpacity ?? 0.1,
      shadowRadius: style.shadowRadius ?? 4,
      shadowOffset: style.shadowOffset ?? { x: 0, y: 2 },
      elevation: style.elevation ?? 2,
      animationDuration: style.animationDuration ?? 300,
      animationEasing: style.animationEasing || 'ease-in-out',
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
      priority: behavior.priority || 'medium',
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
