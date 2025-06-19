# Basic Configuration 🔧

Fine-tune RN-Tosty's behavior to perfectly match your app's needs. This guide covers the most important configuration options you'll use regularly.

## 🏗️ Provider Configuration

All global configuration happens at the `ToastProvider` level:

```tsx
import { ToastProvider, QueuePresets, VerticalOffsetPresets } from 'rn-tosty';

<ToastProvider
  theme="warmSunset"
  initialMode="auto"
  followSystemAppearance={true}
  config={{
    // Core settings
    maxToasts: 3,
    defaultDuration: 4000,
    defaultPosition: 'top',

    // Queue management
    queue: QueuePresets.default(),

    // Layout and spacing
    verticalOffset: VerticalOffsetPresets.safe(),
  }}
>
  <App />
</ToastProvider>;
```

## ⚙️ Core Settings

### Maximum Toasts

Control how many toasts can be visible at once:

```tsx
<ToastProvider
  config={{
    maxToasts: 3, // Show max 3 toasts simultaneously
  }}
>
```

**Guidelines:**

- **1-2 toasts**: Minimal, clean experience
- **3-4 toasts**: Balanced (recommended for most apps)
- **5+ toasts**: More information, but can feel overwhelming

### Default Duration

Set the default display time for all toasts:

```tsx
<ToastProvider
  config={{
    defaultDuration: 4000, // 4 seconds (default)
  }}
>
```

**Duration Guidelines:**

- **2000ms**: Quick confirmations ("Saved!", "Copied!")
- **4000ms**: Standard messages (default, works for most cases)
- **6000ms**: Important information that needs reading time
- **0**: Permanent (stays until user dismisses)

### Default Position

Choose where toasts appear by default:

```tsx
<ToastProvider
  config={{
    defaultPosition: 'top', // 'top' | 'bottom'
  }}
>
```

**Position Strategy:**

- **Top**: Best for most notifications, doesn't interfere with navigation
- **Bottom**: Good for action confirmations near bottom UI elements

## 🎯 Per-Toast Configuration

Override global settings for specific toasts:

```tsx
// Override duration
toast.success('Quick confirmation!', { duration: 2000 });

// Override position
toast.info('Action completed!', { position: 'bottom' });

// Override multiple settings
toast.error('Critical error!', {
  duration: 0, // Permanent
  priority: 'urgent', // High priority
  position: 'top', // Override default
});
```

## 📱 Layout Configuration

### Vertical Offset

Control spacing around device-specific areas:

```tsx
import { VerticalOffsetPresets } from 'rn-tosty';

<ToastProvider
  config={{
    verticalOffset: VerticalOffsetPresets.safe(), // Auto device adaptation

    // Or custom configuration
    verticalOffset: {
      top: 20,           // Extra space from top
      bottom: 10,        // Extra space from bottom
      global: 5,         // Applied to both
      adaptToDevice: true, // Smart device handling
      minMargin: 16,     // Minimum safe margin
      maxMargin: 60,     // Maximum margin cap
    },
  }}
>
```

**Preset Options:**

- `VerticalOffsetPresets.safe()`: Automatic adaptation (recommended)
- `VerticalOffsetPresets.spacious()`: Extra breathing room
- `VerticalOffsetPresets.compact()`: Reduced margins
- `VerticalOffsetPresets.avoidTop(30)`: Avoid navigation bars
- `VerticalOffsetPresets.avoidBottom(60)`: Avoid tab bars

### Toast Layout

Configure how individual toasts are laid out:

```tsx
import { ToastLayoutPresets } from 'rn-tosty';

// Use layout presets
<ToastProvider
  config={{
    layout: ToastLayoutPresets.balanced(), // Default
  }}
>

// Or configure manually
<ToastProvider
  config={{
    layout: {
      iconPosition: 'left',     // 'left' | 'right'
      textAlignment: 'left',    // 'left' | 'center' | 'right'
      spacing: 'default',       // 'compact' | 'default' | 'spacious'
    },
  }}
>
```

**Layout Presets:**

- `ToastLayoutPresets.balanced()`: Default balanced layout
- `ToastLayoutPresets.centered()`: Center-aligned text and icon
- `ToastLayoutPresets.minimal()`: Compact spacing
- `ToastLayoutPresets.spacious()`: Extra breathing room
- `ToastLayoutPresets.rightAligned()`: Right-aligned content

## 🎨 Progress Bar Configuration

Control the visual progress indicators:

```tsx
import { ProgressBarPresets } from 'rn-tosty';

<ToastProvider
  config={{
    progressBar: ProgressBarPresets.default(),

    // Or custom configuration
    progressBar: {
      enabled: true,
      position: 'bottom',    // 'top' | 'bottom'
      height: 3,
      showForTypes: {
        success: true,
        error: true,
        warning: true,
        info: true,
        custom: true,
      },
      animation: {
        duration: 100,       // Animation speed
        easing: 'ease-out',  // Animation easing
      },
    },
  }}
>
```

**Progress Bar Presets:**

- `ProgressBarPresets.default()`: Standard progress bars
- `ProgressBarPresets.thick()`: Thicker, more prominent bars
- `ProgressBarPresets.smooth()`: Smooth animations
- `ProgressBarPresets.fast()`: Quick animations
- `ProgressBarPresets.minimal()`: Subtle, thin bars

## 🎵 Icon Configuration

Customize the default icon behavior:

```tsx
import { IconPresets } from 'rn-tosty';

<ToastProvider
  config={{
    icons: IconPresets.default(),

    // Or custom configuration
    icons: {
      defaultSize: 'medium',     // 'small' | 'medium' | 'large' | number
      defaultAnimated: true,     // Enable icon animations
      success: {
        component: MyCustomSuccessIcon,
        size: 'large',
        color: '#10B981',
        animated: true,
      },
      error: {
        component: MyCustomErrorIcon,
        size: 24,
        color: '#EF4444',
      },
    },
  }}
>
```

**Icon Presets:**

- `IconPresets.default()`: Medium size, animated
- `IconPresets.large()`: Large icons for better visibility
- `IconPresets.minimal()`: Small, static icons
- `IconPresets.static()`: No animations for performance

## 🎭 Variant Configuration

Set default variants for different toast types:

```tsx
<ToastProvider
  config={{
    defaultVariant: 'default',
    variants: {
      success: 'celebration',    // Custom success variant
      error: 'urgent',          // Custom error variant
      info: 'subtle',           // Custom info variant
      warning: 'attention',     // Custom warning variant
    },
  }}
>
```

## 🔄 Queue Configuration

Control how multiple toasts are managed:

```tsx
import { QueuePresets } from 'rn-tosty';

<ToastProvider
  config={{
    queue: QueuePresets.default(),

    // Or custom queue configuration
    queue: {
      strategy: 'priority',      // 'fifo' | 'priority' | 'replace'
      priorityOrder: ['urgent', 'high', 'medium', 'low'],
      dismissOldest: true,       // Dismiss old toasts when queue is full
      preserveOrder: false,      // Maintain insertion order within same priority
      maxQueueSize: 10,          // Maximum queued toasts
      processingDelay: 200,      // Delay between processing queued toasts
    },
  }}
>
```

**Queue Presets:**

- `QueuePresets.default()`: Balanced for most apps
- `QueuePresets.conservative()`: Fewer toasts, avoid overwhelming
- `QueuePresets.aggressive()`: More toasts, faster display
- `QueuePresets.simple()`: FIFO without priority ordering
- `QueuePresets.immediate()`: No queuing, immediate display only

## ♿ Accessibility Configuration

Ensure your toasts work for everyone:

```tsx
<ToastProvider
  config={{
    accessibility: {
      enabled: true,
      announceMode: 'auto',      // 'auto' | 'assertive' | 'polite'
      customLabels: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
      },
      customHints: {
        dismissible: 'Tap to dismiss',
        autoDismiss: 'Will auto-dismiss',
        permanent: 'Tap to dismiss',
      },
      includeTypeInLabel: true,
      includeDurationInHint: false,
    },
  }}
>
```

## 🎯 Common Configuration Patterns

### E-commerce App

```tsx
<ToastProvider
  theme="warmSunset"
  config={{
    maxToasts: 2,              // Keep it clean
    defaultDuration: 3000,     // Quick confirmations
    defaultPosition: 'top',

    verticalOffset: VerticalOffsetPresets.safe(),
    layout: ToastLayoutPresets.balanced(),

    progressBar: {
      enabled: true,
      showForTypes: {
        success: true,  // Show progress for purchase confirmations
        error: true,    // Show for payment errors
        warning: false, // Skip for cart warnings
        info: false,    // Skip for general info
      },
    },

    queue: QueuePresets.conservative(), // Don't overwhelm during checkout
  }}
>
```

### Social Media App

```tsx
<ToastProvider
  theme="default"
  config={{
    maxToasts: 4,              // More notifications
    defaultDuration: 2500,     // Quick interactions
    defaultPosition: 'top',

    layout: {
      iconPosition: 'left',
      textAlignment: 'left',
      spacing: 'compact',      // Compact for frequent notifications
    },

    queue: QueuePresets.aggressive(), // Handle lots of notifications

    icons: IconPresets.minimal(),     // Subtle icons
  }}
>
```

### Business/Productivity App

```tsx
<ToastProvider
  theme="default"
  config={{
    maxToasts: 3,
    defaultDuration: 5000,     // Longer for business actions
    defaultPosition: 'top',

    verticalOffset: VerticalOffsetPresets.spacious(),
    layout: ToastLayoutPresets.spacious(),

    progressBar: ProgressBarPresets.thick(), // Prominent progress

    accessibility: {
      enabled: true,
      announceMode: 'assertive', // Important for productivity
      includeTypeInLabel: true,
      includeDurationInHint: true,
    },
  }}
>
```

### Gaming App

```tsx
<ToastProvider
  theme="forestGlow"
  config={{
    maxToasts: 5,              // Lots of game events
    defaultDuration: 3000,
    defaultPosition: 'top',

    layout: {
      iconPosition: 'right',   // Different layout for gaming UI
      textAlignment: 'center',
      spacing: 'spacious',
    },

    progressBar: {
      enabled: true,
      position: 'top',
      height: 4,               // Thicker for game aesthetic
    },

    queue: QueuePresets.immediate(), // Immediate feedback for games
  }}
>
```

## 🔧 Dynamic Configuration

Change configuration at runtime:

```tsx
import { useToastConfig } from 'rn-tosty';

function SettingsScreen() {
  const { updateConfig } = useToastConfig();

  const handleToggleProgressBars = (enabled) => {
    updateConfig({
      progressBar: { enabled },
    });
  };

  const handleChangeMaxToasts = (maxToasts) => {
    updateConfig({ maxToasts });
  };

  return (
    <View>
      <Switch
        value={progressBarsEnabled}
        onValueChange={handleToggleProgressBars}
      />
      <Slider
        value={maxToasts}
        onValueChange={handleChangeMaxToasts}
        minimumValue={1}
        maximumValue={5}
      />
    </View>
  );
}
```

## 🎯 Best Practices

### 1. **Start Simple**

```tsx
// ✅ Begin with minimal configuration
<ToastProvider theme="default">
  <App />
</ToastProvider>

// ❌ Don't over-configure initially
<ToastProvider
  config={{
    maxToasts: 3,
    defaultDuration: 4000,
    // ... 20 more options
  }}
>
```

### 2. **Test with Real Content**

```tsx
// Test your configuration with realistic messages
toast.success(
  'Your order #12345 has been confirmed and will be delivered to 123 Main St on Tuesday, March 15th between 2-4 PM'
);
```

### 3. **Consider Your Users**

```tsx
// Accessibility-first configuration
<ToastProvider
  config={{
    accessibility: { enabled: true },
    defaultDuration: 5000, // Give users time to read
    maxToasts: 2,          // Don't overwhelm
  }}
>
```

### 4. **Match Your App's Personality**

```tsx
// Fast-paced app
{ defaultDuration: 2000, queue: QueuePresets.aggressive() }

// Thoughtful app
{ defaultDuration: 6000, queue: QueuePresets.conservative() }
```

## 🚀 Next Steps

Now that you understand configuration:

- **[Positioning & Layout →](./positioning-layout)** - Master toast positioning
- **[Duration & Timing →](./duration-timing)** - Perfect timing strategies
- **[Queue Management →](../advanced/queue-management)** - Handle multiple toasts
- **[Accessibility →](../advanced/accessibility)** - Inclusive design patterns

---

**🔧 Perfect configuration makes toasts feel like they belong** naturally in your app's experience!
