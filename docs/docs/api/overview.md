# API Overview 🔌

Complete reference for all RN-Tosty APIs, hooks, and utilities. This page provides a comprehensive overview of everything available in the library.

## 📚 Quick Reference

| Category      | Import                                                 | Description             |
| ------------- | ------------------------------------------------------ | ----------------------- |
| **Core API**  | `import { toast } from 'rn-tosty'`                     | Main toast methods      |
| **Provider**  | `import { ToastProvider } from 'rn-tosty'`             | App-level configuration |
| **Hooks**     | `import { useToast, useTheme } from 'rn-tosty'`        | React hooks             |
| **Theming**   | `import { Themes, defineTheme } from 'rn-tosty'`       | Theme system            |
| **Variants**  | `import { defineVariant, Variants } from 'rn-tosty'`   | Custom styling          |
| **Presets**   | `import { QueuePresets, IconPresets } from 'rn-tosty'` | Pre-configured options  |
| **Utilities** | `import { ToastManager } from 'rn-tosty'`              | Advanced control        |

---

## 🍞 Core Toast API

### `toast` - Main API

The primary way to show toast notifications.

```tsx
import { toast } from 'rn-tosty';

// Basic usage
toast(message: string, options?: ToastOptions): string
toast.success(message: string, options?: ToastOptions): string
toast.error(message: string, options?: ToastOptions): string
toast.warning(message: string, options?: ToastOptions): string
toast.info(message: string, options?: ToastOptions): string
```

### `toast()` - Generic Toast

```tsx
// Basic toast
toast('Hello world!');

// With options
toast('Custom toast', {
  duration: 3000,
  position: 'bottom',
  variant: 'custom',
  priority: 'high',
});
```

### `toast.success()` - Success Notifications

```tsx
// Simple success
toast.success('Operation completed!');

// With custom duration
toast.success('File saved successfully', { duration: 2000 });

// With custom styling
toast.success('Profile updated!', {
  variant: 'celebration',
  showProgress: true,
});
```

### `toast.error()` - Error Messages

```tsx
// Simple error
toast.error('Something went wrong!');

// Persistent error (stays until dismissed)
toast.error('Network connection failed', { duration: 0 });

// High priority error
toast.error('Critical system error', {
  priority: 'urgent',
  variant: 'critical',
});
```

### `toast.warning()` - Warning Messages

```tsx
// Simple warning
toast.warning('Please check your input');

// Form validation warning
toast.warning('Email format is invalid', {
  duration: 6000,
  position: 'bottom',
});
```

### `toast.info()` - Information Messages

```tsx
// Simple info
toast.info('New update available');

// With custom icon
toast.info('Sync completed', {
  icon: SyncIcon,
  duration: 3000,
});
```

### `toast.loading()` - Loading States

```tsx
// Simple loading
const loadingId = toast.loading('Processing...');

// Update loading toast
toast.success('Processing complete!', { id: loadingId });

// Dismiss loading toast
toast.dismiss(loadingId);
```

### `toast.promise()` - Promise Integration

```tsx
// Automatic loading, success, error handling
toast.promise(fetchUserData(), {
  loading: 'Loading user data...',
  success: 'User data loaded!',
  error: 'Failed to load user data',
});

// With custom options
toast.promise(
  uploadFile(),
  {
    loading: { message: 'Uploading...', showProgress: true },
    success: (data) => `File ${data.filename} uploaded!`,
    error: (err) => `Upload failed: ${err.message}`,
  },
  {
    duration: 5000,
    position: 'bottom',
  }
);
```

### `toast.dismiss()` - Control Toast Visibility

```tsx
// Dismiss specific toast
const toastId = toast.success('Auto-dismiss in 5 seconds');
setTimeout(() => toast.dismiss(toastId), 2000);

// Dismiss all toasts
toast.dismiss();

// Dismiss by type
toast.dismiss('success'); // Dismiss all success toasts
toast.dismiss(['error', 'warning']); // Dismiss multiple types
```

### `toast.update()` - Update Existing Toast

```tsx
// Update toast message
const id = toast.loading('Step 1 of 3...');
toast.update(id, { message: 'Step 2 of 3...' });
toast.update(id, { message: 'Step 3 of 3...' });
toast.success('All steps completed!', { id });

// Update toast type
const loadingId = toast.loading('Saving...');
toast.update(loadingId, {
  type: 'success',
  message: 'Saved successfully!',
});
```

---

## 🎛️ ToastProvider

### Basic Setup

```tsx
import { ToastProvider } from 'rn-tosty';

<ToastProvider
  theme="default" // Theme selection
  initialMode="auto" // Light/dark mode
  followSystemAppearance={true} // Auto theme switching
  config={configObject} // Global configuration
>
  <App />
</ToastProvider>;
```

### Configuration Object

```tsx
interface ToastConfig {
  // Display settings
  maxToasts?: number; // Max simultaneous toasts (default: 3)
  defaultDuration?: number; // Default duration in ms (default: 4000)
  defaultPosition?: 'top' | 'bottom'; // Default position (default: 'top')
  defaultVariant?: string; // Default variant name

  // Queue management
  queue?: QueueConfig; // Queue behavior configuration

  // Visual settings
  progressBar?: ProgressBarConfig; // Progress bar settings
  icons?: IconConfig; // Icon configuration

  // Layout settings
  layout?: LayoutConfig; // Toast layout configuration
  verticalOffset?: VerticalOffsetConfig; // Spacing configuration

  // Accessibility
  accessibility?: AccessibilityConfig; // A11y settings

  // Advanced
  debug?: boolean; // Enable debug logging
  animations?: AnimationConfig; // Animation settings
}
```

---

## 🪝 Hooks

### `useToast()` - Toast Control Hook

```tsx
import { useToast } from 'rn-tosty';

function MyComponent() {
  const {
    show, // Function to show toast
    dismiss, // Function to dismiss toast
    dismissAll, // Function to dismiss all toasts
    update, // Function to update toast
    toasts, // Array of current toasts
    isVisible, // Boolean: are any toasts visible
    count, // Number of visible toasts
  } = useToast();

  return <Button title="Show Toast" onPress={() => show('Hello from hook!')} />;
}
```

### `useTheme()` - Theme Control Hook

```tsx
import { useTheme } from 'rn-tosty';

function ThemeControls() {
  const {
    theme, // Current theme object
    themeName, // Current theme name
    mode, // Current mode ('light' | 'dark')
    isDark, // Boolean: is dark mode active
    setTheme, // Function to change theme
    setMode, // Function to change mode
    toggle, // Function to toggle light/dark
    followSystem, // Boolean: following system appearance
    setFollowSystem, // Function to toggle system following
  } = useTheme();

  return (
    <View>
      <Text>Current theme: {themeName}</Text>
      <Text>Current mode: {mode}</Text>
      <Button title="Toggle Mode" onPress={toggle} />
      <Button title="Ocean Theme" onPress={() => setTheme('oceanBreeze')} />
    </View>
  );
}
```

### `useToastConfig()` - Configuration Hook

```tsx
import { useToastConfig } from 'rn-tosty';

function ConfigControls() {
  const {
    config, // Current configuration
    updateConfig, // Function to update configuration
    resetConfig, // Function to reset to defaults
  } = useToastConfig();

  const handleMaxToastsChange = (maxToasts: number) => {
    updateConfig({ maxToasts });
  };

  return (
    <Slider
      value={config.maxToasts}
      onValueChange={handleMaxToastsChange}
      minimumValue={1}
      maximumValue={5}
    />
  );
}
```

### `useToastAnimation()` - Animation Control

```tsx
import { useToastAnimation } from 'rn-tosty';

function AnimatedComponent({ toastId }: { toastId: string }) {
  const {
    opacity, // Animated opacity value
    translateY, // Animated translation value
    scale, // Animated scale value
    isAnimating, // Boolean: is animation running
    startAnimation, // Function to start animation
    stopAnimation, // Function to stop animation
  } = useToastAnimation(toastId);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      {/* Toast content */}
    </Animated.View>
  );
}
```

### `useToastQueue()` - Queue Management

```tsx
import { useToastQueue } from 'rn-tosty';

function QueueStatus() {
  const {
    queue, // Current queue
    queueSize, // Number of queued toasts
    isProcessing, // Boolean: is queue processing
    clearQueue, // Function to clear queue
    pauseQueue, // Function to pause processing
    resumeQueue, // Function to resume processing
  } = useToastQueue();

  return (
    <View>
      <Text>Queue size: {queueSize}</Text>
      <Text>Processing: {isProcessing ? 'Yes' : 'No'}</Text>
      <Button title="Clear Queue" onPress={clearQueue} />
    </View>
  );
}
```

---

## 🎨 Theming API

### Built-in Themes

```tsx
import { Themes } from 'rn-tosty';

// Available themes
Themes.default        // Professional, clean
Themes.warmSunset     // Cozy, welcoming
Themes.oceanBreeze    // Calm, peaceful
Themes.forestGlow     // Natural, grounded

// Usage
<ToastProvider theme={Themes.oceanBreeze}>
```

### `defineTheme()` - Custom Theme Creation

```tsx
import { defineTheme } from 'rn-tosty';

const customTheme = defineTheme({
  name: 'myCustomTheme',
  light: {
    colors: {
      primary: '#FF6B35',
      success: '#4ECDC4',
      error: '#E74C3C',
      warning: '#F39C12',
      info: '#3498DB',
      surface: '#FFFFFF',
      onSurface: '#2C3E50',
      border: '#BDC3C7',
      background: '#F8F9FA',
    },
    typography: {
      title: { size: 16, weight: '600' },
      message: { size: 14, weight: '400' },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      container: 16,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
    },
    shadows: {
      light: { /* shadow config */ },
      medium: { /* shadow config */ },
    }
  },
  dark: {
    // Dark mode overrides
    colors: {
      surface: '#2C3E50',
      onSurface: '#FFFFFF',
      background: '#1A1A1A',
      // ... other dark mode colors
    }
  }
});

<ToastProvider theme={customTheme}>
```

### `useThemeContext()` - Access Theme Values

```tsx
import { useThemeContext } from 'rn-tosty';

function ThemedComponent() {
  const theme = useThemeContext();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.container,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.light,
      }}
    >
      <Text
        style={{
          color: theme.colors.onSurface,
          fontSize: theme.typography.title.size,
          fontWeight: theme.typography.title.weight,
        }}
      >
        Themed Content
      </Text>
    </View>
  );
}
```

---

## 🎭 Variants API

### `defineVariant()` - Custom Styling

```tsx
import { defineVariant } from 'rn-tosty';

const celebrationVariant = defineVariant({
  name: 'celebration',
  style: {
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 20,
  },
  text: {
    color: '#8B4513',
    fontWeight: '700',
    fontSize: 16,
  },
  icon: {
    component: CelebrationIcon,
    size: 24,
    color: '#FF6347',
    animated: true,
  },
  progressBar: {
    color: '#FF6347',
    height: 4,
  },
  animation: {
    entrance: 'bounceIn',
    exit: 'bounceOut',
    duration: 400,
  },
});

// Usage
toast.success('Celebration!', { variant: celebrationVariant });
```

### Built-in Variants

```tsx
import { Variants } from 'rn-tosty';

// Available variants
Variants.default; // Standard appearance
Variants.minimal; // Reduced styling
Variants.bold; // Enhanced emphasis
Variants.subtle; // Understated appearance
Variants.floating; // Elevated appearance
Variants.compact; // Reduced spacing

// Usage
toast.success('Message', { variant: Variants.bold });
```

---

## ⚙️ Presets API

### Queue Presets

```tsx
import { QueuePresets } from 'rn-tosty';

QueuePresets.default()        // Balanced queue management
QueuePresets.conservative()   // Fewer toasts, less overwhelming
QueuePresets.aggressive()     // More toasts, faster display
QueuePresets.simple()         // Basic FIFO queue
QueuePresets.immediate()      // No queuing, immediate display

// Usage
<ToastProvider config={{ queue: QueuePresets.conservative() }}>
```

### Icon Presets

```tsx
import { IconPresets } from 'rn-tosty';

IconPresets.default()     // Medium size, animated
IconPresets.large()       // Large icons
IconPresets.minimal()     // Small, static icons
IconPresets.static()      // No animations
IconPresets.custom(config) // Custom configuration

// Usage
<ToastProvider config={{ icons: IconPresets.large() }}>
```

### Layout Presets

```tsx
import { ToastLayoutPresets } from 'rn-tosty';

ToastLayoutPresets.balanced()      // Default balanced layout
ToastLayoutPresets.centered()      // Center-aligned content
ToastLayoutPresets.minimal()       // Compact spacing
ToastLayoutPresets.spacious()      // Extra breathing room
ToastLayoutPresets.rightAligned()  // Right-aligned content

// Usage
<ToastProvider config={{ layout: ToastLayoutPresets.spacious() }}>
```

### Vertical Offset Presets

```tsx
import { VerticalOffsetPresets } from 'rn-tosty';

VerticalOffsetPresets.safe()        // Auto device adaptation
VerticalOffsetPresets.spacious()    // Extra margins
VerticalOffsetPresets.compact()     // Minimal margins
VerticalOffsetPresets.avoidTop(px)  // Avoid top elements
VerticalOffsetPresets.avoidBottom(px) // Avoid bottom elements

// Usage
<ToastProvider config={{ verticalOffset: VerticalOffsetPresets.safe() }}>
```

### Progress Bar Presets

```tsx
import { ProgressBarPresets } from 'rn-tosty';

ProgressBarPresets.default()   // Standard progress bars
ProgressBarPresets.thick()     // Thicker bars
ProgressBarPresets.thin()      // Thinner bars
ProgressBarPresets.smooth()    // Smooth animations
ProgressBarPresets.fast()      // Quick animations
ProgressBarPresets.minimal()   // Subtle appearance

// Usage
<ToastProvider config={{ progressBar: ProgressBarPresets.thick() }}>
```

---

## 🔧 Utilities API

### `ToastManager` - Advanced Control

```tsx
import { ToastManager } from 'rn-tosty';

// Direct manager access
const manager = ToastManager.getInstance();

// Advanced methods
manager.showToast(config); // Show with full config object
manager.dismissToast(id); // Dismiss specific toast
manager.dismissAllToasts(); // Dismiss all toasts
manager.updateToast(id, updates); // Update existing toast
manager.getToast(id); // Get toast by ID
manager.getAllToasts(); // Get all current toasts
manager.clearQueue(); // Clear waiting queue
manager.pauseQueue(); // Pause queue processing
manager.resumeQueue(); // Resume queue processing
```

### `VariantManager` - Variant Control

```tsx
import { VariantManager } from 'rn-tosty';

const variantManager = VariantManager.getInstance();

// Variant management
variantManager.registerVariant(name, config); // Register new variant
variantManager.getVariant(name); // Get variant config
variantManager.getAllVariants(); // Get all variants
variantManager.removeVariant(name); // Remove variant
```

### `ThemeRegistry` - Theme Management

```tsx
import { ThemeRegistry } from 'rn-tosty';

const registry = ThemeRegistry.getInstance();

// Theme management
registry.registerTheme(name, theme); // Register custom theme
registry.getTheme(name); // Get theme by name
registry.getAllThemes(); // Get all themes
registry.setActiveTheme(name); // Set active theme
registry.getActiveTheme(); // Get current theme
```

---

## 📊 Type Definitions

### Core Types

```tsx
// Toast configuration
interface ToastOptions {
  id?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  variant?: string | VariantConfig;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  showProgress?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
  icon?: React.ComponentType | IconConfig;
  accessibility?: AccessibilityOptions;
}

// Theme definition
interface Theme {
  name: string;
  light: ThemeMode;
  dark: ThemeMode;
}

interface ThemeMode {
  colors: ColorScheme;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

// Variant definition
interface VariantConfig {
  name?: string;
  style?: ViewStyle;
  text?: TextStyle;
  icon?: IconConfig;
  progressBar?: ProgressBarConfig;
  animation?: AnimationConfig;
  component?: React.ComponentType;
}
```

---

## 🔍 Advanced Usage Examples

### Custom Toast Component

```tsx
import { defineVariant, useThemeContext } from 'rn-tosty';

const CustomToastComponent = ({ message, onDismiss, type }) => {
  const theme = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {message}
      </Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.dismissButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const customVariant = defineVariant({
  component: CustomToastComponent,
});

toast('Custom toast!', { variant: customVariant });
```

### Promise-based Loading

```tsx
const handleAsyncOperation = async () => {
  const result = await toast.promise(
    performAsyncTask(),
    {
      loading: 'Processing your request...',
      success: (data) => `Successfully processed ${data.count} items`,
      error: (err) => `Failed: ${err.message}`,
    },
    {
      duration: 5000,
      showProgress: true,
      priority: 'high',
    }
  );

  console.log('Operation result:', result);
};
```

### Dynamic Configuration

```tsx
const DynamicToastDemo = () => {
  const { updateConfig } = useToastConfig();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Update configuration based on user preferences
    const userPrefs = getUserPreferences();

    updateConfig({
      maxToasts: userPrefs.maxNotifications,
      defaultDuration: userPrefs.notificationDuration,
      progressBar: { enabled: userPrefs.showProgress },
    });

    setTheme(userPrefs.theme);
  }, []);

  return <YourApp />;
};
```

---

**🔌 This API reference covers all available functionality** - from basic toast methods to advanced theming and customization options. Use this as your go-to reference for implementing any toast-related functionality in your app!
