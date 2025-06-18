// Variant Manager - Comprehensive variant management system
import type { Theme } from '../types/ThemeTypes';
import type { ToastType } from '../types/ToastTypes';
import type {
  CustomVariantConfig,
  ThemeAwareVariantBuilder as IThemeAwareVariantBuilder,
  VariantBuilder as IVariantBuilder,
  VariantManager as IVariantManager,
  PredefinedVariantName,
  ResolvedVariant,
  SimpleThemeAwareVariantConfig,
  ThemeAwareVariantStyle,
  ToastVariantDefinition,
  VariantBehavior,
  VariantRegistry,
  VariantResolutionContext,
  VariantStyle,
} from '../types/VariantTypes';
import { predefinedVariants } from '../variants/PredefinedVariants';

// Theme-aware Variant Builder implementation
class ThemeAwareVariantBuilder implements IThemeAwareVariantBuilder {
  private variant: Partial<ToastVariantDefinition> = {
    themeAwareStyle: {},
    behavior: {},
    iconConfig: {},
  };

  setName(name: string): IThemeAwareVariantBuilder {
    this.variant.name = name;
    return this;
  }

  setDisplayName(displayName: string): IThemeAwareVariantBuilder {
    this.variant.displayName = displayName;
    return this;
  }

  setDescription(description: string): IThemeAwareVariantBuilder {
    this.variant.description = description;
    return this;
  }

  forLightMode(style: VariantStyle): IThemeAwareVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.light = style;
    return this;
  }

  forDarkMode(style: VariantStyle): IThemeAwareVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.dark = style;
    return this;
  }

  forAllModes(style: VariantStyle): IThemeAwareVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.style = style;
    return this;
  }

  setBehavior(behavior: VariantBehavior): IThemeAwareVariantBuilder {
    this.variant.behavior = behavior;
    return this;
  }

  extends(parentVariantName: string): IThemeAwareVariantBuilder {
    this.variant.extends = parentVariantName;
    return this;
  }

  build(): ToastVariantDefinition {
    if (!this.variant.name) {
      throw new Error('Variant name is required');
    }
    if (!this.variant.themeAwareStyle) {
      throw new Error('Variant theme-aware style is required');
    }

    return this.variant as ToastVariantDefinition;
  }
}

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

  // Enhanced style methods for theme-aware styling
  setLightStyle(style: VariantStyle): IVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.light = style;
    return this;
  }

  setDarkStyle(style: VariantStyle): IVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.dark = style;
    return this;
  }

  setAdaptiveStyle(style: VariantStyle): IVariantBuilder {
    if (!this.variant.themeAwareStyle) {
      this.variant.themeAwareStyle = {};
    }
    this.variant.themeAwareStyle.style = style;
    return this;
  }

  // Legacy style methods (for backward compatibility)
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
    if (!this.variant.style && !this.variant.themeAwareStyle) {
      throw new Error('Variant style or theme-aware style is required');
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

  registerThemeAwareVariant(config: SimpleThemeAwareVariantConfig): void {
    const themeAwareStyle: ThemeAwareVariantStyle = {};

    // Convert simplified config to internal format
    if (config.light) {
      themeAwareStyle.light = config.light;
    }
    if (config.dark) {
      themeAwareStyle.dark = config.dark;
    }
    if (config.style) {
      themeAwareStyle.style = config.style;
    }

    const variant: ToastVariantDefinition = {
      name: config.name,
      displayName: config.displayName,
      description: config.description,
      extends: config.extends,
      themeAwareStyle,
      behavior: config.behavior,
      typeOverrides: config.typeOverrides,
      iconConfig: config.iconConfig,
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

  resolveVariant(
    variantName: string,
    context: VariantResolutionContext
  ): ResolvedVariant {
    let variant = this.getVariant(variantName);
    if (!variant) {
      // Fallback to default variant
      variant = this.getVariant('default');
      if (!variant) {
        throw new Error('Default variant not found');
      }
    }

    // Apply inheritance
    variant = this.resolveInheritance(variant);

    // Apply theme-aware styles
    variant = this.applyThemeAwareStyles(variant, context);

    // Apply theme overrides (legacy)
    variant = this.applyThemeOverrides(variant, context.theme);

    // Apply type overrides
    variant = this.applyTypeOverrides(variant, context.toastType);

    // Resolve theme color references
    variant = this.resolveThemeReferences(variant, context.theme);

    return {
      name: variant.name,
      style: this.getCompleteStyle(variant.style),
      behavior: this.getCompleteBehavior(variant.behavior),
      iconConfig: this.getCompleteIconConfig(variant.iconConfig),
    };
  }

  validateVariant(variant: ToastVariantDefinition): boolean {
    if (!variant.name) return false;
    if (!variant.style && !variant.themeAwareStyle) return false;
    // Additional validation can be added here
    return true;
  }

  applyThemeToVariant(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition {
    // Apply theme-specific styling
    const context: VariantResolutionContext = {
      theme,
      toastType: 'info', // Default type for theme application
      isDarkMode: theme.mode === 'dark',
    };

    return this.applyThemeAwareStyles(variant, context);
  }

  createVariant(): IVariantBuilder {
    return new VariantBuilder();
  }

  createThemeAwareVariant(): IThemeAwareVariantBuilder {
    return new ThemeAwareVariantBuilder();
  }

  // Private helper methods
  private applyThemeAwareStyles(
    variant: ToastVariantDefinition,
    context: VariantResolutionContext
  ): ToastVariantDefinition {
    if (!variant.themeAwareStyle) {
      return variant;
    }

    const { themeAwareStyle } = variant;
    let resolvedStyle: VariantStyle = {};

    // Apply base adaptive style first
    if (themeAwareStyle.style) {
      resolvedStyle = { ...themeAwareStyle.style };
    }

    // Apply mode-specific styles
    const modeStyle = context.isDarkMode
      ? themeAwareStyle.dark
      : themeAwareStyle.light;

    if (modeStyle) {
      resolvedStyle = { ...resolvedStyle, ...modeStyle };
    }

    // Apply theme-specific styles if available
    if (themeAwareStyle.themeStyles) {
      const themeSpecific = themeAwareStyle.themeStyles[context.theme.name];
      if (themeSpecific) {
        const themeSpecificModeStyle = context.isDarkMode
          ? themeSpecific.dark
          : themeSpecific.light;

        if (themeSpecificModeStyle) {
          resolvedStyle = { ...resolvedStyle, ...themeSpecificModeStyle };
        }
      }
    }

    return {
      ...variant,
      style: resolvedStyle,
    };
  }

  private resolveInheritance(
    variant: ToastVariantDefinition
  ): ToastVariantDefinition {
    if (!variant.extends) {
      return variant;
    }

    const parentVariant = this.getVariant(variant.extends);
    if (!parentVariant) {
      console.warn(
        `Parent variant "${variant.extends}" not found for "${variant.name}"`
      );
      return variant;
    }

    // Recursively resolve parent inheritance
    const resolvedParent = this.resolveInheritance(parentVariant);

    // Merge parent and child properties
    return {
      ...resolvedParent,
      ...variant,
      name: variant.name, // Always use child name
      style: {
        ...resolvedParent.style,
        ...variant.style,
      },
      behavior: {
        ...resolvedParent.behavior,
        ...variant.behavior,
      },
      typeOverrides: {
        ...resolvedParent.typeOverrides,
        ...variant.typeOverrides,
      },
      themeOverrides: {
        ...resolvedParent.themeOverrides,
        ...variant.themeOverrides,
      },
      themeAwareStyle:
        variant.themeAwareStyle || resolvedParent.themeAwareStyle,
      iconConfig: {
        ...resolvedParent.iconConfig,
        ...variant.iconConfig,
      },
    };
  }

  private applyThemeOverrides(
    variant: ToastVariantDefinition,
    theme: Theme
  ): ToastVariantDefinition {
    if (!variant.themeOverrides) {
      return variant;
    }

    const themeOverride = variant.themeOverrides[theme.name];
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
    if (!variant.typeOverrides) {
      return variant;
    }

    const typeOverride = variant.typeOverrides[toastType];
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
    if (!variant.style) {
      return variant;
    }

    const resolvedStyle = { ...variant.style };

    // Theme color reference mapping
    const themeColorMap: Record<string, string> = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      error: theme.colors.error,
      warning: theme.colors.warning,
      info: theme.colors.info,
      background: theme.colors.background,
      surface: theme.colors.surface,
      surfaceVariant: theme.colors.surfaceVariant,
      onPrimary: theme.colors.onPrimary,
      onSecondary: theme.colors.onSecondary,
      onSurface: theme.colors.onSurface,
      onSurfaceVariant: theme.colors.onSurfaceVariant,
      border: theme.colors.border,
      borderVariant: theme.colors.borderVariant,
      overlay: theme.colors.overlay,
      shadow: theme.colors.shadow,
    };

    // Resolve color and other theme references
    Object.keys(resolvedStyle).forEach((key) => {
      const value = resolvedStyle[key as keyof VariantStyle];

      if (typeof value === 'string') {
        // Handle theme.colors.xxx references (predefined variants format)
        if (value.startsWith('theme.colors.')) {
          const colorKey = value.replace('theme.colors.', '');
          if (themeColorMap[colorKey]) {
            (resolvedStyle as any)[key] = themeColorMap[colorKey];
          }
        }
        // Handle theme.borderRadius.xxx references
        else if (value.startsWith('theme.borderRadius.')) {
          const borderRadiusKey = value.replace('theme.borderRadius.', '');
          const borderRadiusValue = (theme.borderRadius as any)[
            borderRadiusKey
          ];
          if (borderRadiusValue !== undefined) {
            (resolvedStyle as any)[key] = borderRadiusValue;
          }
        }
        // Handle direct color references (new theme-aware variants format)
        else if (themeColorMap[value]) {
          (resolvedStyle as any)[key] = themeColorMap[value];
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
      backgroundColor: style.backgroundColor || '#FFFFFF',
      backgroundOpacity: style.backgroundOpacity ?? 1,
      backgroundGradient: style.backgroundGradient || '',
      borderColor: style.borderColor || '#E5E7EB',
      borderWidth: style.borderWidth ?? 1,
      borderStyle: style.borderStyle || 'solid',
      borderRadius: style.borderRadius ?? 8,
      textColor: style.textColor || '#1F2937',
      titleColor: style.titleColor || '#1F2937',
      textAlign: style.textAlign || 'left',
      iconColor: style.iconColor || '#6B7280',
      iconSize: style.iconSize || 'medium',
      iconPosition: style.iconPosition || 'left',
      padding: style.padding ?? 16,
      margin: style.margin ?? 8,
      minHeight: style.minHeight ?? 56,
      maxWidth: style.maxWidth ?? 400,
      shadowColor: style.shadowColor || '#000000',
      shadowOpacity: style.shadowOpacity ?? 0.1,
      shadowRadius: style.shadowRadius ?? 4,
      shadowOffset: style.shadowOffset || { x: 0, y: 2 },
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
