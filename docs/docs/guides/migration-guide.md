# Migration Guide 🔄

Moving to RN-Tosty from another toast library? This guide covers the most common migration scenarios and helps you transition smoothly while taking advantage of RN-Tosty's advanced features.

## 🎯 Quick Migration Path

1. **[Identify your current library](#identify-your-current-setup)**
2. **[Install RN-Tosty](#installation)**
3. **[Replace provider setup](#provider-migration)**
4. **[Update toast calls](#toast-api-migration)**
5. **[Migrate configuration](#configuration-migration)**
6. **[Test & verify](#testing--verification)**

**Estimated time:** 15-30 minutes for most projects

## 📚 Supported Migration Sources

| From Library                       | Difficulty | Time    | Status             |
| ---------------------------------- | ---------- | ------- | ------------------ |
| `react-native-toast-message`       | Easy       | ~15 min | ✅ Fully Supported |
| `react-native-simple-toast`        | Easy       | ~10 min | ✅ Fully Supported |
| `react-native-flash-message`       | Medium     | ~20 min | ✅ Fully Supported |
| `react-native-root-toast`          | Easy       | ~10 min | ✅ Fully Supported |
| `react-native-toast-notifications` | Medium     | ~25 min | ✅ Fully Supported |
| Custom Toast Solutions             | Variable   | ~30 min | ⚠️ Case by Case    |

## 🔍 Identify Your Current Setup

First, let's identify what you're currently using:

```bash
# Check your package.json for current toast library
grep -i toast package.json

# Or search your codebase for toast imports
grep -r "react-native-toast" src/
grep -r "FlashMessage" src/
grep -r "Toast." src/
```

Common indicators:

- **react-native-toast-message**: `Toast.show()`, `<Toast />` component
- **react-native-simple-toast**: `Toast.show()` or `Toast.showWithGravity()`
- **react-native-flash-message**: `<FlashMessage />`, `showMessage()`
- **react-native-root-toast**: `Toast.show()` with duration constants
- **react-native-toast-notifications**: `<ToastProvider />`, `toast.show()`

## 🛠️ Installation

Install RN-Tosty alongside your current library (we'll remove the old one later):

```bash
# Using yarn (recommended)
yarn add rn-tosty

# Using npm
npm install rn-tosty

# Using pnpm
pnpm add rn-tosty
```

**Note:** We'll keep both libraries temporarily to ensure a smooth transition.

---

# 📦 Migration from react-native-toast-message

## Provider Migration

### Before (react-native-toast-message)

```tsx
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <YourApp />
      <Toast />
    </>
  );
}
```

### After (RN-Tosty)

```tsx
import { ToastProvider } from 'rn-tosty';

export default function App() {
  return (
    <ToastProvider theme="default">
      <YourApp />
    </ToastProvider>
  );
}
```

## API Migration

### Basic Toast Calls

```tsx
// Before
import Toast from 'react-native-toast-message';

Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'This is a success message',
});

Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'This is an error message',
});

// After
import { toast } from 'rn-tosty';

toast.success('Success: This is a success message');
toast.error('Error: This is an error message');
```

### Advanced Options

```tsx
// Before
Toast.show({
  type: 'info',
  text1: 'Info',
  text2: 'Custom message',
  visibilityTime: 3000,
  position: 'bottom',
  topOffset: 30,
  bottomOffset: 40,
});

// After
toast.info('Info: Custom message', {
  duration: 3000,
  position: 'bottom',
  // Offset handled automatically via theme configuration
});
```

### Custom Toast Types

```tsx
// Before
const toastConfig = {
  success: (props) => (
    <BaseToast {...props} style={{ borderLeftColor: 'pink' }} />
  ),
  customType: ({ text1, text2, props }) => (
    <CustomToast text1={text1} text2={text2} {...props} />
  ),
};

Toast.show({
  type: 'customType',
  text1: 'Custom',
  text2: 'This is custom',
});

// After
import { toast, defineVariant } from 'rn-tosty';

// Define custom variant (one-time setup)
const customVariant = defineVariant({
  style: {
    backgroundColor: 'pink',
    borderLeftWidth: 4,
    borderLeftColor: '#FF1493',
  },
  icon: {
    component: MyCustomIcon,
    color: '#FF1493',
  },
});

// Use custom variant
toast.success('Custom: This is custom', {
  variant: customVariant,
});
```

---

# 📦 Migration from react-native-simple-toast

## API Migration

### Basic Usage

```tsx
// Before
import Toast from 'react-native-simple-toast';

Toast.show('This is a simple toast');
Toast.showWithGravity('Toast with gravity', Toast.LONG, Toast.TOP);
Toast.showWithGravityAndOffset(
  'Toast with offset',
  Toast.LONG,
  Toast.BOTTOM,
  25,
  50
);

// After
import { toast } from 'rn-tosty';

toast.info('This is a simple toast');
toast.info('Toast with gravity', { duration: 6000, position: 'top' });
toast.info('Toast with offset', {
  duration: 6000,
  position: 'bottom',
  // Offset handled by theme configuration
});
```

### Duration Constants

```tsx
// Before
Toast.SHORT; // 2000ms
Toast.LONG; // 3500ms

// After
toast.info('Short message', { duration: 2000 });
toast.info('Long message', { duration: 3500 });

// Or use RN-Tosty's semantic approach
toast.success('Quick confirmation'); // Auto-optimized duration
toast.info('Detailed information', { duration: 6000 });
```

---

# 📦 Migration from react-native-flash-message

## Provider Migration

### Before (react-native-flash-message)

```tsx
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <YourApp />
      <FlashMessage position="top" />
    </View>
  );
}
```

### After (RN-Tosty)

```tsx
import { ToastProvider } from 'rn-tosty';

export default function App() {
  return (
    <ToastProvider theme="default" config={{ defaultPosition: 'top' }}>
      <YourApp />
    </ToastProvider>
  );
}
```

## API Migration

### Basic Messages

```tsx
// Before
import { showMessage } from 'react-native-flash-message';

showMessage({
  message: 'Success!',
  description: 'This is a success message',
  type: 'success',
});

showMessage({
  message: 'Error!',
  description: 'This is an error message',
  type: 'danger',
});

// After
import { toast } from 'rn-tosty';

toast.success('Success! This is a success message');
toast.error('Error! This is an error message');
```

### Advanced Configuration

```tsx
// Before
showMessage({
  message: 'Custom message',
  description: 'With custom styling',
  type: 'default',
  backgroundColor: '#FF6347',
  color: '#FFFFFF',
  duration: 3000,
  position: 'bottom',
  floating: true,
  icon: { icon: 'success', position: 'left' },
});

// After
import { toast, defineVariant } from 'rn-tosty';

const customVariant = defineVariant({
  style: {
    backgroundColor: '#FF6347',
  },
  text: {
    color: '#FFFFFF',
  },
  icon: {
    position: 'left',
    component: SuccessIcon,
  },
});

toast('Custom message: With custom styling', {
  variant: customVariant,
  duration: 3000,
  position: 'bottom',
});
```

---

# 📦 Migration from react-native-root-toast

## API Migration

### Basic Usage

```tsx
// Before
import Toast from 'react-native-root-toast';

let toast = Toast.show('This is a message', {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
});

// Hide toast
Toast.hide(toast);

// After
import { toast } from 'rn-tosty';

const toastId = toast.info('This is a message', {
  duration: 3500, // LONG duration equivalent
  position: 'bottom',
  // shadow, animation, hideOnPress are handled automatically
});

// Hide toast
toast.dismiss(toastId);
```

### Duration Constants

```tsx
// Before
Toast.durations.SHORT; // 2000
Toast.durations.LONG; // 3500

// After
// Use explicit values or let RN-Tosty optimize
toast.info('Short message', { duration: 2000 });
toast.info('Long message', { duration: 3500 });

// Or use semantic durations (recommended)
toast.success('Quick action'); // Auto-optimized
toast.info('Important info', { duration: 5000 });
```

### Position Constants

```tsx
// Before
Toast.positions.TOP; // 20
Toast.positions.BOTTOM; // -20
Toast.positions.CENTER; // 0

// After
toast.info('Top message', { position: 'top' });
toast.info('Bottom message', { position: 'bottom' });
// Center position not directly supported - use custom variant if needed
```

---

# 📦 Migration from react-native-toast-notifications

## Provider Migration

### Before (react-native-toast-notifications)

```tsx
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### After (RN-Tosty)

```tsx
import { ToastProvider } from 'rn-tosty';

export default function App() {
  return (
    <ToastProvider theme="default">
      <YourApp />
    </ToastProvider>
  );
}
```

## API Migration

### Hook Usage

```tsx
// Before
import { useToast } from 'react-native-toast-notifications';

function MyComponent() {
  const toast = useToast();

  const showSuccess = () => {
    toast.show("Success message", {
      type: "success",
      placement: "top",
      duration: 4000,
    });
  };

  // After
  import { toast } from 'rn-tosty';

  function MyComponent() {
    const showSuccess = () => {
      toast.success("Success message", {
        position: 'top',
        duration: 4000,
      });
    };
```

### Custom Components

```tsx
// Before
<ToastProvider
  renderToast={(toastOptions) => (
    <CustomToast {...toastOptions} />
  )}
>

// After
import { defineVariant } from 'rn-tosty';

const customVariant = defineVariant({
  component: CustomToast, // Your custom component
});

<ToastProvider
  theme="default"
  config={{
    defaultVariant: customVariant
  }}
>
```

---

# 🔧 Configuration Migration

## Global Configuration

### Most Libraries → RN-Tosty

```tsx
// Before (various approaches)
// - react-native-toast-message: Toast config
// - react-native-flash-message: FlashMessage props
// - Others: Various global settings

// After (RN-Tosty unified approach)
<ToastProvider
  theme="warmSunset"
  config={{
    // Display settings
    maxToasts: 3,
    defaultDuration: 4000,
    defaultPosition: 'top',

    // Visual settings
    progressBar: { enabled: true },

    // Layout settings
    verticalOffset: VerticalOffsetPresets.safe(),
    layout: ToastLayoutPresets.balanced(),

    // Queue management
    queue: QueuePresets.default(),

    // Accessibility
    accessibility: { enabled: true },
  }}
>
```

## Theme Configuration

### Migrating Custom Styles

```tsx
// Before (most libraries)
// Custom styles were often scattered or limited

// After (RN-Tosty comprehensive theming)
import { defineTheme } from 'rn-tosty';

const customTheme = defineTheme({
  light: {
    colors: {
      // Map your old colors here
      primary: '#your-brand-color',
      success: '#your-success-color',
      error: '#your-error-color',
      // ... etc
    },
    typography: {
      // Centralized typography settings
    },
    spacing: {
      // Consistent spacing system
    },
    borderRadius: {
      // Unified border radius values
    }
  },
  dark: {
    // Dark mode variants
  }
});

<ToastProvider theme={customTheme}>
```

## Animation Migration

```tsx
// Most libraries had limited animation control

// RN-Tosty provides comprehensive animation control
<ToastProvider
  config={{
    animations: {
      entrance: 'slideFromTop',    // or custom animation
      exit: 'slideToTop',
      duration: 300,
      easing: 'ease-out',
    }
  }}
>
```

---

# 🧪 Testing & Verification

## Step-by-Step Verification

### 1. Side-by-Side Testing

Keep both libraries temporarily:

```tsx
// Temporarily test both
import OldToast from 'react-native-toast-message';
import { toast as newToast } from 'rn-tosty';

const testBothToasts = () => {
  // Test old implementation
  OldToast.show({
    type: 'success',
    text1: 'Old Toast',
  });

  // Test new implementation
  newToast.success('New Toast');
};
```

### 2. Automated Migration Testing

```tsx
// Create a migration test component
function MigrationTest() {
  const testScenarios = [
    { type: 'success', message: 'Success test' },
    { type: 'error', message: 'Error test' },
    { type: 'warning', message: 'Warning test' },
    { type: 'info', message: 'Info test' },
  ];

  return (
    <View>
      {testScenarios.map((scenario, index) => (
        <Button
          key={index}
          title={`Test ${scenario.type}`}
          onPress={() => {
            // Test your migrated implementation
            toast[scenario.type](scenario.message);
          }}
        />
      ))}
    </View>
  );
}
```

### 3. Regression Checklist

- [ ] All toast types work correctly
- [ ] Positioning matches previous behavior
- [ ] Duration settings are preserved
- [ ] Custom styling is maintained
- [ ] Accessibility features still work
- [ ] Performance is maintained or improved
- [ ] No memory leaks from old library

### 4. Performance Verification

```tsx
// Test performance with multiple toasts
const stressTest = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      toast.info(`Performance test ${i + 1}`);
    }, i * 100);
  }
};
```

---

# 🗑️ Cleanup

## Remove Old Dependencies

After successful migration and testing:

```bash
# Remove old toast library
yarn remove react-native-toast-message
# or whichever library you were using

# Clean up any platform-specific configurations
# Check ios/ and android/ folders for old configurations

# Update imports in your codebase
# Use your IDE's find-and-replace to update remaining imports
```

## Code Cleanup

### Remove Old Imports

```tsx
// Remove these old imports
import Toast from 'react-native-toast-message';
import { showMessage } from 'react-native-flash-message';
import Toast from 'react-native-simple-toast';
// etc.

// Replace with
import { toast } from 'rn-tosty';
```

### Clean Up Old Configuration

Remove old configuration files, custom components that are no longer needed, and legacy styling code.

---

# 🚀 Post-Migration Enhancements

## Take Advantage of New Features

### 1. Advanced Queue Management

```tsx
// Now you can handle complex queuing scenarios
toast.error('Network error', { priority: 'urgent' });
toast.success('Background sync', { priority: 'low' });
```

### 2. Smart Theming

```tsx
// Automatic dark/light mode with beautiful themes
<ToastProvider
  theme="oceanBreeze"
  followSystemAppearance={true}
>
```

### 3. Enhanced Accessibility

```tsx
// Built-in accessibility features
<ToastProvider
  config={{
    accessibility: {
      enabled: true,
      announceMode: 'assertive',
    }
  }}
>
```

### 4. Progress Bars

```tsx
// Visual timing indicators
toast.success('File uploaded', {
  showProgress: true,
  duration: 5000,
});
```

### 5. Promise Integration

```tsx
// Elegant loading states
toast.promise(uploadFile(), {
  loading: 'Uploading file...',
  success: 'File uploaded successfully!',
  error: 'Upload failed',
});
```

---

# ❓ Troubleshooting

## Common Migration Issues

### Issue: Toasts Not Showing

```tsx
// ❌ Forgot to add ToastProvider
function App() {
  return <YourApp />; // Missing provider
}

// ✅ Correct setup
function App() {
  return (
    <ToastProvider theme="default">
      <YourApp />
    </ToastProvider>
  );
}
```

### Issue: Styling Looks Different

```tsx
// ❌ Missing theme configuration
<ToastProvider> // Uses default theme

// ✅ Configure theme to match your app
<ToastProvider theme="warmSunset"> // or custom theme
```

### Issue: Performance Problems

```tsx
// ❌ Too many simultaneous toasts
// RN-Tosty handles this automatically, but you can tune it

// ✅ Configure reasonable limits
<ToastProvider
  config={{
    maxToasts: 3,
    queue: QueuePresets.conservative(),
  }}
>
```

### Issue: Accessibility Regression

```tsx
// ✅ Enable comprehensive accessibility
<ToastProvider
  config={{
    accessibility: {
      enabled: true,
      announceMode: 'auto',
      includeTypeInLabel: true,
    }
  }}
>
```

## Getting Help

- **Documentation Issues**: Check our comprehensive guides
- **Migration Problems**: Create an issue with your old/new code comparison
- **Performance Issues**: Profile your app and share findings
- **Feature Requests**: Let us know what's missing from your old library

---

# ✅ Migration Checklist

Use this checklist to ensure complete migration:

## Pre-Migration

- [ ] Identify current toast library and usage patterns
- [ ] Document current customizations and configurations
- [ ] Create backup branch of current implementation
- [ ] Install RN-Tosty alongside current library

## Migration

- [ ] Replace provider setup
- [ ] Update all toast calls to new API
- [ ] Migrate custom styling to variants/themes
- [ ] Update configuration settings
- [ ] Test all toast types and scenarios

## Post-Migration

- [ ] Verify functionality matches previous behavior
- [ ] Test on multiple devices and screen sizes
- [ ] Check accessibility features
- [ ] Run performance tests
- [ ] Remove old library and clean up code
- [ ] Update documentation and team knowledge

## Enhancements (Optional)

- [ ] Explore new themes and variants
- [ ] Implement queue management strategies
- [ ] Add progress bars and loading states
- [ ] Enhance accessibility features
- [ ] Optimize configuration for your app's needs

---

**🎉 Congratulations!** You've successfully migrated to RN-Tosty and can now enjoy its advanced features, beautiful themes, and robust performance!
