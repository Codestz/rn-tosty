# First Steps 🚀

Welcome to RN-Tosty! This guide will get you from zero to showing beautiful toasts in just a few minutes. We'll cover everything you need to know to get started confidently.

## 🎯 What You'll Learn

By the end of this guide, you'll be able to:

- ✅ Set up RN-Tosty in your React Native app
- ✅ Show your first toast notification
- ✅ Understand the basic configuration options
- ✅ Choose the right theme for your app
- ✅ Handle different types of notifications

**Time to complete:** ~5 minutes

## 📋 Prerequisites

Before starting, make sure you have:

- React Native 0.65+ project
- Node.js 16+ installed
- Basic knowledge of React Native and TypeScript

## 🛠️ Step 1: Installation

Install RN-Tosty using your preferred package manager:

```bash
# Using npm
npm install rn-tosty

# Using yarn (recommended)
yarn add rn-tosty

# Using pnpm
pnpm add rn-tosty
```

**For React Native 0.68+**, no additional setup required! 🎉

**For React Native 0.65-0.67**, you'll also need to install React Native Reanimated 3:

```bash
yarn add react-native-reanimated
# Follow their platform-specific setup instructions
```

## 🏗️ Step 2: Provider Setup

Wrap your app with the `ToastProvider` - this enables toasts throughout your entire app:

```tsx
// App.tsx or your root component
import React from 'react';
import { ToastProvider } from 'rn-tosty';
import { YourMainApp } from './YourMainApp';

export default function App() {
  return (
    <ToastProvider theme="default">
      <YourMainApp />
    </ToastProvider>
  );
}
```

**Why the provider?** It manages toast state, animations, and theming globally so you can show toasts from anywhere in your component tree.

## 🎊 Step 3: Your First Toast

Show your first toast notification:

```tsx
// Any component in your app
import React from 'react';
import { View, Button } from 'react-native';
import { toast } from 'rn-tosty';

export function WelcomeScreen() {
  const showWelcomeToast = () => {
    toast.success('Welcome to RN-Tosty! 🎉');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Show My First Toast" onPress={showWelcomeToast} />
    </View>
  );
}
```

**🎉 Congratulations!** You just showed your first toast notification!

## 🎨 Step 4: Try Different Types

RN-Tosty provides four built-in toast types:

```tsx
import { toast } from 'rn-tosty';

function ToastExamples() {
  return (
    <View style={styles.container}>
      <Button
        title="✅ Success"
        onPress={() => toast.success('Task completed successfully!')}
      />

      <Button
        title="❌ Error"
        onPress={() => toast.error('Something went wrong!')}
      />

      <Button
        title="⚠️ Warning"
        onPress={() => toast.warning('Please check your connection')}
      />

      <Button
        title="ℹ️ Info"
        onPress={() => toast.info('New update available')}
      />
    </View>
  );
}
```

Each type automatically gets:

- **Appropriate icon** (✅, ❌, ⚠️, ℹ️)
- **Semantic colors** (green, red, orange, blue)
- **Progress bar** showing time remaining
- **Auto-dismiss** after 4 seconds (configurable)

## 🎭 Step 5: Choose Your Theme

RN-Tosty comes with four beautiful themes. Try them out:

```tsx
// Change your ToastProvider theme
<ToastProvider theme="warmSunset"> {/* 🌅 Cozy, welcoming */}
<ToastProvider theme="oceanBreeze"> {/* 🌊 Calm, peaceful */}
<ToastProvider theme="forestGlow">  {/* 🌲 Natural, grounded */}
<ToastProvider theme="default">     {/* 🎯 Professional, clean */}
```

**Which theme to choose?**

- **Default:** Business apps, productivity tools
- **Warm Sunset:** Social media, lifestyle, e-commerce
- **Ocean Breeze:** Health, meditation, wellness
- **Forest Glow:** Outdoor, environmental, nature apps

## ⚡ Step 6: Basic Customization

Customize individual toasts:

```tsx
// Custom duration
toast.success('Quick message!', { duration: 2000 }); // 2 seconds

// Custom position
toast.info('Bottom notification', { position: 'bottom' });

// Permanent toast (until user dismisses)
toast.error('Critical error!', { duration: 0 });

// Multiple options
toast.success('Order confirmed!', {
  duration: 5000,
  position: 'bottom',
  priority: 'high',
});
```

## 🔧 Step 7: Provider Configuration

Configure global behavior:

```tsx
<ToastProvider
  theme="warmSunset"
  config={{
    // Maximum toasts shown at once
    maxToasts: 3,

    // Default duration for all toasts
    defaultDuration: 4000,

    // Default position
    defaultPosition: 'top',

    // Enable/disable progress bars
    progressBar: { enabled: true },
  }}
>
  <App />
</ToastProvider>
```

## 🎯 Step 8: Common Patterns

Here are some patterns you'll use frequently:

### Loading States

```tsx
const handleAsyncAction = async () => {
  const toastId = toast.loading('Saving...');

  try {
    await saveData();
    toast.success('Saved successfully!', { id: toastId });
  } catch (error) {
    toast.error('Failed to save', { id: toastId });
  }
};
```

### User Actions

```tsx
const handleLikePost = () => {
  toast.success('Post liked! ❤️', { duration: 2000 });
};

const handleCopyLink = () => {
  Clipboard.setString(link);
  toast.success('Link copied to clipboard');
};
```

### Form Validation

```tsx
const handleSubmit = () => {
  if (!email) {
    toast.error('Please enter your email');
    return;
  }

  if (!isValidEmail(email)) {
    toast.warning('Please enter a valid email address');
    return;
  }

  toast.success('Form submitted successfully!');
};
```

## 📱 Step 9: Test on Device

Make sure to test your toasts on actual devices:

```bash
# Run on iOS
npx react-native run-android

# Run on Android
npx react-native run-ios
```

**Key things to check:**

- ✅ Toasts appear in the right position
- ✅ Text is readable at different font sizes
- ✅ Toasts don't overlap with status bars
- ✅ Touch interactions work correctly
- ✅ Accessibility features work (try VoiceOver/TalkBack)

## 🔍 Step 10: Debug & Troubleshoot

### Common Issues

**Toasts not showing?**

```tsx
// ❌ Missing ToastProvider
function App() {
  return <YourApp />; // Toasts won't work
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

**Styling looks wrong?**

```tsx
// Make sure your theme is loaded
import { Themes } from 'rn-tosty';
console.log('Available themes:', Object.keys(Themes));
```

**Performance issues with many toasts?**

```tsx
// Limit simultaneous toasts
<ToastProvider config={{ maxToasts: 2 }}>
```

### Enable Debug Mode

```tsx
<ToastProvider
  theme="default"
  config={{
    debug: true // Shows helpful console logs
  }}
>
```

## 🚀 Next Steps

Great job! You've successfully set up RN-Tosty. Here's what to explore next:

### **Essential Reading:**

- **[Basic Usage →](../basic-usage)** - Master the core toast methods
- **[Configuration →](../configuration)** - Fine-tune behavior and appearance
- **[Built-in Themes →](../theming/built-in-themes)** - Explore all theme options

### **Level Up:**

- **[Toast Variants →](../features/variants)** - Custom styling and behavior
- **[Progress Bars →](../features/progress-bars)** - Visual timing indicators
- **[Queue Management →](../features/queue-management)** - Handle multiple toasts

### **Advanced Topics:**

- **[Custom Themes →](../theming/custom-themes)** - Create your own themes
- **[Accessibility →](../advanced/accessibility)** - Inclusive design patterns
- **[Performance →](../advanced/performance)** - Optimize for smooth animations

## 💡 Quick Tips

### **Do's ✅**

- Keep toast messages concise and actionable
- Use appropriate toast types (success, error, warning, info)
- Test on different screen sizes and orientations
- Consider users with accessibility needs

### **Don'ts ❌**

- Don't overwhelm users with too many toasts
- Avoid very long messages in toasts
- Don't rely solely on color to convey meaning
- Don't use toasts for critical app flow information

## 🆘 Need Help?

- **Documentation:** Browse our comprehensive guides
- **Examples:** Check out the example app in `/example`
- **Issues:** Report bugs on GitHub
- **Community:** Join discussions and get help

---

**🎉 You're now ready to create amazing toast experiences!** Start with simple toasts and gradually explore more advanced features as your needs grow.
