# Quick Start 🚀

Get your first beautiful toast working in under 5 minutes! This guide assumes you've already [installed RN-Tosty](./installation).

## 🏗️ Basic Setup

### 1. Wrap Your App

The `ToastProvider` must wrap your entire app to manage toast state and provide context:

```tsx
// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'rn-tosty';
import { YourAppContent } from './YourAppContent';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <YourAppContent />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
```

:::tip Provider Placement
The `ToastProvider` should be as high as possible in your component tree, typically wrapping your entire app. This ensures toasts work from any screen.
:::

### 2. Choose Your Import Style

RN-Tosty offers two ways to show toasts - pick the one that fits your style:

#### Option A: Direct Import (Recommended)

```tsx
import { toast } from 'rn-tosty';

// Use anywhere in your app
toast.success('Hello World!');
```

#### Option B: Hook-Based

```tsx
import { useTosty } from 'rn-tosty';

function MyComponent() {
  const { success, error, info, warning } = useTosty();

  const handlePress = () => {
    success('Hello World!');
  };

  return <Button title="Show Toast" onPress={handlePress} />;
}
```

## ✨ Your First Toasts

Let's create some beautiful toasts! Try these examples:

```tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { toast } from 'rn-tosty';

export function QuickStartDemo() {
  return (
    <View style={styles.container}>
      {/* Basic toast types */}
      <Button
        title="Success ✅"
        onPress={() => toast.success('Profile updated successfully!')}
      />

      <Button
        title="Error ❌"
        onPress={() => toast.error('Something went wrong!')}
        color="#EF4444"
      />

      <Button
        title="Warning ⚠️"
        onPress={() => toast.warning('Your session expires in 5 minutes')}
        color="#F59E0B"
      />

      <Button
        title="Info ℹ️"
        onPress={() => toast.info('New feature available!')}
        color="#3B82F6"
      />

      {/* With configuration */}
      <Button
        title="Custom Duration"
        onPress={() =>
          toast.success('This lasts 8 seconds!', { duration: 8000 })
        }
      />

      {/* Different positions */}
      <Button
        title="Bottom Toast"
        onPress={() =>
          toast.info('I appear at the bottom!', { position: 'bottom' })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
});
```

## 🎨 Add Some Style

Let's make it look great with themes:

```tsx
// App.tsx
<ToastProvider theme="warmSunset">
  {' '}
  {/* Try: default, warmSunset, oceanBreeze, forestGlow */}
  <YourAppContent />
</ToastProvider>
```

Now your toasts will have a beautiful warm sunset theme! 🌅

## ⚡ Handle Async Operations

One of RN-Tosty's superpowers is handling promises elegantly:

```tsx
import { toast } from 'rn-tosty';

// Simulate an API call
const saveProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { name: 'Alex', status: 'Premium' };
};

// Show loading, success, or error automatically
const handleSave = () => {
  toast.promise(saveProfile(), {
    loading: 'Saving your profile...',
    success: (data) => `Welcome back, ${data.name}!`,
    error: 'Failed to save profile',
  });
};
```

**What happens:**

1. 🔄 Loading toast appears with a spinner
2. ⏱️ Progress bar shows time remaining
3. ✅ Automatically transitions to success with user data
4. ❌ Or shows error if something goes wrong

## 🎯 Complete Example

Here's a complete working example you can copy and paste:

```tsx
// App.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, toast } from 'rn-tosty';

// Mock API function
const mockApiCall = async (shouldFail = false) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (shouldFail) throw new Error('Network error');
  return { user: 'Alex Chen', points: 1250 };
};

function AppContent() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍞 RN-Tosty Quick Start</Text>

      <View style={styles.buttonContainer}>
        {/* Basic toasts */}
        <Button
          title="✅ Success"
          onPress={() => toast.success('Account created successfully!')}
        />

        <Button
          title="❌ Error"
          onPress={() => toast.error('Invalid email address')}
          color="#EF4444"
        />

        <Button
          title="⚠️ Warning"
          onPress={() => toast.warning('Low battery: 15% remaining')}
          color="#F59E0B"
        />

        <Button
          title="ℹ️ Info"
          onPress={() => toast.info('Update available in App Store')}
          color="#3B82F6"
        />

        {/* Promise examples */}
        <Button
          title="🔄 Promise Success"
          onPress={() =>
            toast.promise(mockApiCall(), {
              loading: 'Syncing your data...',
              success: (data) => `Welcome ${data.user}! Points: ${data.points}`,
              error: 'Sync failed. Please try again.',
            })
          }
          color="#10B981"
        />

        <Button
          title="💥 Promise Error"
          onPress={() =>
            toast.promise(mockApiCall(true), {
              loading: 'Processing payment...',
              success: 'Payment successful!',
              error: (err) => `Payment failed: ${err.message}`,
            })
          }
          color="#DC2626"
        />

        {/* Custom configuration */}
        <Button
          title="🎨 Custom Toast"
          onPress={() =>
            toast.success('Look at me! I am different!', {
              duration: 6000,
              position: 'bottom',
            })
          }
          color="#8B5CF6"
        />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider theme="default">
        <AppContent />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 32,
    color: '#1F2937',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
});
```

## 🎉 You're Ready!

That's it! You now have beautiful, smart toast notifications working in your app.

### 🚀 What's Next?

- **[Your First Toast →](./first-toast)** - Learn more toast patterns
- **[Core Concepts →](../core-concepts/toast-methods)** - Dive deeper into the API
- **[Themes →](../theming/built-in-themes)** - Explore beautiful themes
- **[Advanced Features →](../advanced/promise-integration)** - Unlock powerful features

### 💡 Pro Tips

1. **Always wrap with SafeAreaProvider** - This ensures proper positioning around device notches
2. **Place ToastProvider high** - The higher in your component tree, the more widely available
3. **Start simple** - Use basic toasts first, then explore advanced features
4. **Test on real devices** - See how smart positioning works with notches and Dynamic Island

### 🆘 Need Help?

- **Something not working?** Check the [installation guide](./installation#troubleshooting)
- **Want to customize?** See [configuration options](../core-concepts/basic-configuration)
- **Found a bug?** [Open an issue](https://github.com/Codestz/rn-tosty/issues) on GitHub

---

**🎊 Congratulations!** You've successfully set up RN-Tosty. Your users are going to love these beautiful notifications!
