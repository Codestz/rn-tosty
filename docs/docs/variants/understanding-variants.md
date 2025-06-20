# Understanding Variants 🔧

Variants are one of RN-Tosty's most powerful features, yet often misunderstood. This guide explains what variants are, how they differ from themes, and why they're essential for creating perfect toast notifications.

## 🤔 What Are Variants?

**Variants are contextual adaptations of themes.** While themes define the overall personality of your toasts, variants define how specific types of toasts should look and behave within that theme.

Think of it this way:

- **Theme** = Your app's personality (warm, professional, calm, natural)
- **Variant** = How a specific toast type expresses that personality (success, error, custom branding)

## 🎭 Themes vs Variants: The Key Difference

### Themes: Global Personality

```tsx
// Theme affects ALL toasts globally
<ToastProvider theme="warmSunset">
  <App />
</ToastProvider>;

// All toasts now have warm, sunset-inspired colors
toast.success('Success!'); // Warm orange/yellow success
toast.error('Error!'); // Warm red error
toast.info('Info!'); // Warm blue info
```

### Variants: Contextual Adaptation

```tsx
// Variant affects SPECIFIC toast instances
toast.success('Success!', { variant: 'celebration' }); // Special celebration styling
toast.success('Success!', { variant: 'subtle' }); // Minimal, subtle styling
toast.success('Success!'); // Default success styling
```

## 🏗️ How Variants Work

### Built-in Variants

Every toast type has a default variant that adapts to the current theme:

```tsx
// These all use built-in variants
toast.success('Default success variant');
toast.error('Default error variant');
toast.warning('Default warning variant');
toast.info('Default info variant');
```

**What happens internally:**

1. RN-Tosty looks up the current theme (e.g., "warmSunset")
2. Applies the theme's success variant styling
3. Renders a success toast with warm sunset colors and styling

### Custom Variants

You can create variants for specific use cases:

```tsx
// Register a custom variant
variants.register({
  name: 'brand-success',
  displayName: 'Brand Success',
  description: 'Success variant with brand colors',
  theme: {
    // Theme-aware configuration
    light: {
      /* light mode styling */
    },
    dark: {
      /* dark mode styling */
    },
  },
});

// Use your custom variant
toast.success('Brand action completed!', { variant: 'brand-success' });
```

## 🎯 When to Use Variants

### ✅ Good Use Cases for Variants

#### 1. **Brand-Specific Actions**

```tsx
// Special branding for premium features
variants.register({
  name: 'premium-success',
  theme: {
    light: {
      colors: { primary: '#FFD700', surface: '#FFF9E6' }, // Gold colors
      // ... other premium styling
    },
  },
});

toast.success('Premium feature unlocked!', { variant: 'premium-success' });
```

#### 2. **Contextual Importance**

```tsx
// Subtle variant for background operations
toast.success('Auto-save complete', { variant: 'subtle' });

// Celebration variant for achievements
toast.success('Level up! 🎉', { variant: 'celebration' });
```

#### 3. **Integration with Other Libraries**

```tsx
// Variant that matches your payment provider's branding
toast.success('Payment successful via PayPal', { variant: 'paypal-success' });
```

#### 4. **A/B Testing**

```tsx
// Test different success styles
const variant = experimentGroup === 'A' ? 'success-v1' : 'success-v2';
toast.success('Action completed!', { variant });
```

### ❌ When NOT to Use Variants

#### Don't Use Variants For:

- **Global color changes** → Use themes instead
- **Temporary styling** → Use inline styles or custom components
- **One-off modifications** → Consider if it's worth the complexity

## 🔄 Variant Inheritance

Variants inherit from themes and can override specific properties:

```tsx
// Base theme: Ocean Breeze (calm blues)
<ToastProvider theme="oceanBreeze">

// This variant inherits ocean breeze colors but adds custom touches
variants.register({
  name: 'urgent-error',
  theme: {
    light: {
      // Inherits oceanBreeze light theme
      colors: {
        ...OceanBreezeTheme.light.colors,
        // But overrides error color to be more urgent
        error: '#DC2626',        // Brighter red
        surface: '#FEE2E2',      // Light red background
        onSurface: '#7F1D1D'     // Dark red text
      },
      // Inherits everything else (typography, spacing, shadows)
    }
  }
});
```

## 🎨 Variant Types

### 1. **Theme-Adaptive Variants**

Work with any theme, adapting their colors automatically:

```tsx
variants.register({
  name: 'subtle',
  theme: {
    light: {
      colors: {
        // Uses theme's primary color but with lower opacity
        primary: 'rgba({{ theme.colors.primary }}, 0.6)',
        surface: 'rgba({{ theme.colors.surface }}, 0.8)',
      },
    },
    dark: {
      // Automatically adapts for dark mode
    },
  },
});
```

### 2. **Fixed-Style Variants**

Maintain consistent appearance regardless of theme:

```tsx
variants.register({
  name: 'github-success',
  theme: {
    // Same styling for both light and dark themes
    name: 'github-success',
    mode: 'light',
    colors: {
      primary: '#28a745',
      surface: '#d4edda',
      onSurface: '#155724',
      // ... GitHub green color scheme
    },
  },
});
```

### 3. **Conditional Variants**

Different styling based on conditions:

```tsx
// Variant that changes based on device type
variants.register({
  name: 'responsive-success',
  theme: Device.isTablet()
    ? {
        // Tablet styling
        spacing: { container: 32, icon: 20 },
        typography: { title: { size: 18 } },
      }
    : {
        // Phone styling
        spacing: { container: 24, icon: 16 },
        typography: { title: { size: 16 } },
      },
});
```

## 🛠️ Building Your Variant Strategy

### Step 1: Identify Patterns

Look for repeated custom styling in your app:

```tsx
// If you often do this:
toast.success('User created', {
  duration: 2000,
  layout: { iconPosition: 'right' },
  progressBar: { enabled: false },
});

// Consider creating a variant:
variants.register({
  name: 'quick-confirmation',
  // ... variant configuration
});

toast.success('User created', { variant: 'quick-confirmation' });
```

### Step 2: Group by Context

Create variants for different contexts:

- **Admin actions**: `admin-success`, `admin-error`
- **User actions**: `user-success`, `user-error`
- **System events**: `system-info`, `system-warning`
- **Marketing**: `promotion-info`, `feature-announcement`

### Step 3: Consider Theme Compatibility

Decide if your variants should:

- **Adapt to themes** (recommended for most cases)
- **Override themes** (for brand consistency)
- **Work with specific themes only** (for theme-specific features)

## 📚 Real-World Examples

### E-commerce App Variants

```tsx
// Purchase confirmation with celebration feel
variants.register({
  name: 'purchase-success',
  theme: {
    light: {
      colors: {
        primary: '#10B981',
        surface: '#ECFDF5',
        // Add subtle gradient or glow effect
      },
      // Slightly larger for importance
      typography: { title: { size: 17, weight: '600' } },
    },
  },
});

// Cart update - subtle and non-intrusive
variants.register({
  name: 'cart-update',
  theme: {
    light: {
      colors: { surface: 'rgba(59, 130, 246, 0.1)' },
      shadows: { shadowOpacity: 0.05 }, // Very subtle shadow
    },
  },
});

// Usage
toast.success('Order confirmed! 🎉', { variant: 'purchase-success' });
toast.info('Item added to cart', { variant: 'cart-update' });
```

### Social Media App Variants

```tsx
// Like/reaction notifications
variants.register({
  name: 'social-reaction',
  theme: {
    light: {
      colors: {
        primary: '#EC4899', // Pink for social interactions
        surface: '#FDF2F8',
      },
      typography: { title: { size: 15 } }, // Smaller for frequent notifications
    },
  },
});

// New follower - more prominent
variants.register({
  name: 'new-follower',
  theme: {
    light: {
      colors: {
        primary: '#8B5CF6',
        surface: '#F3E8FF',
      },
      spacing: { container: 28 }, // More padding for importance
    },
  },
});
```

## 🚀 Advanced Variant Techniques

### Dynamic Variant Selection

```tsx
const getVariantForUser = (user) => {
  if (user.isPremium) return 'premium-success';
  if (user.isNewUser) return 'welcome-success';
  return 'default';
};

toast.success('Action completed!', {
  variant: getVariantForUser(currentUser),
});
```

## 🎯 Best Practices

### 1. **Name Variants Clearly**

```tsx
// ❌ Vague names
'variant1', 'custom', 'special';

// ✅ Descriptive names
'purchase-success', 'admin-error', 'celebration';
```

### 2. **Document Variant Purpose**

```tsx
variants.register({
  name: 'admin-action',
  displayName: 'Admin Action',
  description:
    'For administrative actions - uses warning colors even for success',
  // ...
});
```

### 3. **Keep Variants Focused**

Each variant should solve one specific styling need, not be a catch-all configuration.

### 4. **Test with All Themes**

Make sure your variants work well with all themes your app uses.

## 🚀 Next Steps

Now that you understand variants:

- **[Built-in Variants →](./built-in-variants)** - Explore what's available
- **[Creating Custom Variants →](./creating-custom-variants)** - Build your own
- **[Variant Examples →](./variant-examples)** - See real-world patterns
- **[Variants vs Themes →](./variants-vs-themes)** - Detailed comparison

---

**🔧 Variants are your secret weapon** for creating perfect, contextual toast notifications that feel custom-built for every situation in your app!
