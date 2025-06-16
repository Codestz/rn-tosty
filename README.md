# 🍞 rn-tosty

> Deliciously interactive React Native toast notifications with gesture controls, haptic feedback, and smart queue management.

## ✨ Features

- **🚀 Simple API** - One-line toast notifications that just work
- **📱 Smart Safe Area Detection** - Perfect positioning on all devices (iPhone notch, Dynamic Island, Android punch-hole)
- **🎨 Simple Theme System** - Beautiful presets with no registration required
- **👆 Gesture-First** - Swipe to dismiss, long press for actions, and more
- **⚡ 60fps Performance** - Smooth animations powered by Reanimated 3
- **♿ Accessibility** - Full screen reader and keyboard navigation support
- **📦 TypeScript** - Complete type safety and IntelliSense support

## 🚀 Installation

```bash
npm install rn-tosty
# or
yarn add rn-tosty
```

### Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-haptic-feedback react-native-safe-area-context react-native-device-info
```

> **Note**: `react-native-safe-area-context` is a peer dependency to avoid conflicts with apps that already use it.

## 📱 Quick Start

```tsx
import React from 'react';
import { Button, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, toast, Themes } from 'rn-tosty';

// 1. Wrap your app with SafeAreaProvider and ToastProvider
export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider theme={Themes.glassmorphism}>
        <YourApp />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

// 2. Use anywhere in your app
function YourApp() {
  return (
    <View>
      <Button
        title="Show Success"
        onPress={() => toast.success('Profile updated!')}
      />
      <Button
        title="Show Info"
        onPress={() => toast.info('This is an info message!')}
      />
    </View>
  );
}
```

## 🎯 Simple API

```tsx
// Basic notifications
toast.success('Profile updated successfully!');
toast.error('Something went wrong!');
toast.info('New message received');
toast.warning('Your session will expire soon');

// With configuration
toast.success('Payment successful!', {
  position: 'smart', // Automatically avoids notch/dynamic island
  duration: 5000,
});

// Custom toast
toast.custom({
  title: 'Custom Notification',
  message: 'This is a custom toast',
  type: 'info',
  duration: 6000,
});

// Promise-based toasts (loading → success/error)
toast.promise(apiCall(), {
  loading: 'Saving changes...',
  success: 'Changes saved!',
  error: 'Failed to save',
});

// Dismiss toasts
toast.dismiss(); // All toasts
toast.dismiss(toastId); // Specific toast
```

## 🎨 Theme System

`rn-tosty` comes with a **simple and powerful theme system** that's easy to use and keeps your bundle optimized.

### Method 1: Simple Theme Names (Recommended for Quick Start)

```tsx
// All themes are available by default - no registration needed!
toast.success('Welcome!', { theme: 'modern' });
toast.success('Welcome!', { theme: 'glassmorphism' });
toast.success('Welcome!', { theme: 'minimalist' });
toast.success('Welcome!', { theme: 'vibrant' });
toast.success('Welcome!', { theme: 'professional' });
```

### Method 2: Direct Theme Objects (Recommended for Production)

```tsx
import { ToastProvider, Themes } from 'rn-tosty';

// Set theme at provider level for your entire app
export default function App() {
  return (
    <ToastProvider theme={Themes.glassmorphism}>
      <YourApp />
    </ToastProvider>
  );
}

// All toasts will use the theme set at provider level
import { toast } from 'rn-tosty';

toast.success('Success message!');
toast.info('Info message!');
toast.warning('Warning message!');
```

### Available Themes

| Theme Name      | Object Access          | Description                                  |
| --------------- | ---------------------- | -------------------------------------------- |
| `modern`        | `Themes.modern`        | Clean, contemporary design (default)         |
| `glassmorphism` | `Themes.glassmorphism` | Frosted glass effects with iOS-inspired feel |
| `minimalist`    | `Themes.minimalist`    | Ultra-clean with lots of whitespace          |
| `vibrant`       | `Themes.vibrant`       | Bold gradients and energetic colors          |
| `professional`  | `Themes.professional`  | Corporate, trustworthy design                |

### Light/Dark Mode Support

All themes automatically support both light and dark modes:

```tsx
// Automatic light mode (default)
<ToastProvider theme={Themes.glassmorphism}>

// Force dark mode
<ToastProvider theme={Themes.glassmorphism.dark}>

// All toasts will use the theme set at provider level
toast.success('Hello!'); // Uses provider theme
```

### Benefits of This Approach

- 🚀 **Super simple** - No registration or complex setup required
- 📦 **Bundle optimized** - Tree-shaking eliminates unused themes
- 🎯 **Type safe** - Full TypeScript support with autocomplete
- ⚡ **Fast** - Direct object access, no string lookups

## 📱 Smart Device Support

rn-tosty automatically detects your device and positions toasts perfectly:

- **iPhone 14 Pro/15 Pro** - Avoids Dynamic Island
- **iPhone X-13 Pro** - Respects notch area
- **iPhone SE** - Classic positioning
- **Android** - Handles punch-hole cameras and various OEMs
- **Tablets** - Optimized for larger screens

### ⚠️ SafeAreaProvider Requirement

rn-tosty requires `SafeAreaProvider` to work properly. If your app already uses it, great! If not, make sure to wrap your app:

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return <SafeAreaProvider>{/* Your app content */}</SafeAreaProvider>;
}
```

**Note**: Only one `SafeAreaProvider` is needed per app. rn-tosty won't create additional providers.

## 🎯 TypeScript Support

```tsx
import { ToastConfig } from 'rn-tosty';

// Full type safety
const config: ToastConfig = {
  message: 'Hello',
  type: 'success', // ✅ Autocomplete
  duration: 'auto', // ✅ Smart duration
  position: 'smart', // ✅ Safe area aware
};
```

## 🎮 Gesture Controls

```tsx
// Built-in gesture support
toast.success('Swipe me away!', {
  gestureConfig: {
    swipe: { enabled: true, direction: 'all' },
    longPress: { enabled: true },
  },
});
```

## 📊 Queue Management

```tsx
// Smart queue with priority
toast.success('Low priority', { priority: 'low' });
toast.error('High priority', { priority: 'high' });
toast.success('Urgent!', { priority: 'urgent' });
```

## 🔧 Configuration

```tsx
import { Themes } from 'rn-tosty';

<ToastProvider
  theme={Themes.glassmorphism} // Set global theme
  config={{
    maxToasts: 3,
    defaultDuration: 4000,
    defaultPosition: 'smart',
  }}
>
  <App />
</ToastProvider>;
```

## 🎯 Roadmap

- [x] **Phase 1**: Simple API & Safe Area Detection
- [ ] **Phase 2**: Advanced Gestures & Haptic Feedback
- [ ] **Phase 3**: Theme Generator & Visual Editor
- [ ] **Phase 4**: Pre-built Industry Patterns
- [ ] **Phase 5**: Performance Optimization & Testing

## 🎛️ Vertical Offset Configuration

Need more or less space around your toasts? Configure custom vertical offsets globally:

```tsx
import { ToastProvider, VerticalOffsetPresets } from 'rn-tosty';

// Using presets
<ToastProvider
  config={{
    verticalOffset: VerticalOffsetPresets.spacious(), // More breathing room
  }}
>
  <App />
</ToastProvider>

// Custom configuration
<ToastProvider
  config={{
    verticalOffset: {
      global: 20,  // Add 20px spacing to both top and bottom
      top: 10,     // Extra 10px spacing from top (total: +30px from top)
      bottom: 5,   // Extra 5px spacing from bottom (total: +25px from bottom)
    }
  }}
>
  <App />
</ToastProvider>
```

### Available Presets

```tsx
// Default smart positioning (no extra offset)
VerticalOffsetPresets.default();

// More breathing room on both sides
VerticalOffsetPresets.spacious();

// Tighter spacing for more content
VerticalOffsetPresets.compact();

// Push away from top (good for custom headers)
VerticalOffsetPresets.avoidTop(30);

// Push away from bottom (good for tab bars)
VerticalOffsetPresets.avoidBottom(60);

// Custom configuration
VerticalOffsetPresets.custom(topOffset, bottomOffset, globalOffset);
```

### Use Cases

- **Apps with custom headers**: Use `avoidTop()` to prevent overlap
- **Apps with tab bars**: Use `avoidBottom()` to ensure visibility
- **Dense UIs**: Use `compact()` for more screen real estate
- **Spacious designs**: Use `spacious()` for better visual breathing room

## 📄 License

MIT © [Codestz](https://github.com/Codestz)

---

**Made with ❤️ for the React Native community**
