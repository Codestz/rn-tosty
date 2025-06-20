# Installation 📦

Get RN-Tosty up and running in your React Native app in just a few minutes.

:::warning Native Modules Required
**RN-Tosty uses native modules** and requires native dependencies. This means it cannot be used in Expo Go but works with **Expo Development Builds**, **EAS Build**, or **ejected Expo projects**.
:::

## 📋 Requirements

Before installing RN-Tosty, make sure your project meets these requirements:

- **React Native**: ^0.70.0 or higher
- **React**: ^18.0.0 or ^19.0.0
- **iOS**: 11.0+
- **Android**: API level 21+
- **Expo**: SDK 49+ (requires Development Build or EAS Build)

## 🚀 Quick Install

### 1. Install RN-Tosty

```bash
# Using npm
npm install rn-tosty

# Using yarn
yarn add rn-tosty

# Using pnpm
pnpm add rn-tosty
```

### 2. Install Peer Dependencies

RN-Tosty requires these peer dependencies to work properly:

```bash
# Using npm
npm install react-native-reanimated react-native-safe-area-context react-native-device-info react-native-svg

# Using yarn
yarn add react-native-reanimated react-native-safe-area-context react-native-device-info react-native-svg

# Using pnpm
pnpm add react-native-reanimated react-native-safe-area-context react-native-device-info react-native-svg
```

:::tip Why These Dependencies?

- **react-native-reanimated**: Powers smooth 60fps animations
- **react-native-safe-area-context**: Smart positioning around device notches
- **react-native-device-info**: Automatic device detection and adaptation
- **react-native-svg**: Beautiful vector icons that scale perfectly
  :::

## 📱 Expo Installation

Since RN-Tosty uses native modules, you cannot use it with **Expo Go**. However, it works perfectly with:

### Option 1: Expo Development Build (Recommended)

1. **Install RN-Tosty and dependencies**:

   ```bash
   npx expo install rn-tosty react-native-reanimated react-native-safe-area-context react-native-device-info react-native-svg
   ```

2. **Configure Reanimated** in your `babel.config.js`:

   ```js
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: [
         'react-native-reanimated/plugin', // This must be last
       ],
     };
   };
   ```

3. **Create a development build**:

   ```bash
   # Install EAS CLI if you haven't
   npm install -g @expo/cli

   # Create development build
   npx expo run:ios
   # or
   npx expo run:android
   ```

### Option 2: EAS Build

1. **Install dependencies**:

   ```bash
   npx expo install rn-tosty react-native-reanimated react-native-safe-area-context react-native-device-info react-native-svg
   ```

2. **Configure Reanimated** in your `babel.config.js` (same as above)

3. **Build with EAS**:

   ```bash
   # Install EAS CLI
   npm install -g eas-cli

   # Configure EAS
   eas build:configure

   # Build for development
   eas build --profile development
   ```

### Option 3: Ejected Expo Project

If you've ejected your Expo project, follow the standard React Native installation instructions below.

### 🔧 Expo Troubleshooting

#### "Cannot resolve module" in Expo

```bash
# Clear Expo cache
npx expo start -c

# Or restart with clean Metro cache
npx expo r -c
```

#### EAS Build fails

Make sure your `eas.json` includes the required native dependencies:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

## 🚀 React Native CLI Installation

### 3. Platform-Specific Setup

#### iOS Setup

1. **Install iOS pods**:

   ```bash
   cd ios && pod install && cd ..
   ```

2. **Enable Reanimated** (if not already done):

   Add this to your `babel.config.js`:

   ```js
   module.exports = {
     plugins: [
       'react-native-reanimated/plugin', // This must be last
     ],
   };
   ```

#### Android Setup

1. **Enable Reanimated** (if not already done):

   Add this to `android/app/src/main/java/.../MainApplication.java`:

   ```java
   import com.swmansion.reanimated.ReanimatedJSIModulePackage;

   @Override
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
       new MainReactPackage(),
       new ReanimatedJSIModulePackage() // Add this line
     );
   }
   ```

2. **Proguard** (if using):
   Add to `android/app/proguard-rules.pro`:
   ```
   -keep class com.swmansion.reanimated.** { *; }
   -keep class com.facebook.react.turbomodule.** { *; }
   ```

## ✅ Verify Installation

Create a simple test to make sure everything is working:

```tsx
// App.tsx or your root component
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, toast } from 'rn-tosty';
import { Button, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button
            title="Test Toast"
            onPress={() => toast.success('🎉 RN-Tosty is working!')}
          />
        </View>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
```

Run your app and tap the button. You should see a beautiful success toast!

## 🛠️ Manual Installation (Advanced)

If you prefer to install dependencies manually or need to use specific versions:

<details>
<summary>Manual Dependency Installation</summary>

### react-native-reanimated

```bash
npm install react-native-reanimated@^3.0.0
```

### react-native-safe-area-context

```bash
npm install react-native-safe-area-context@^4.0.0
```

### react-native-device-info

```bash
npm install react-native-device-info@^10.0.0
```

### react-native-svg

```bash
npm install react-native-svg@^13.0.0
```

</details>

## 🔧 Troubleshooting

### Common Issues

#### "Metro bundler fails to start"

This usually happens with Reanimated. Try:

```bash
# Reset Metro cache
npx react-native start --reset-cache

# Or for Expo
npx expo start -c
```

#### "Module not found: react-native-reanimated"

Make sure Reanimated is properly installed and configured:

```bash
# Reinstall Reanimated
npm uninstall react-native-reanimated
npm install react-native-reanimated

# Rebuild the app
npx react-native run-ios
# or
npx react-native run-android
```

#### iOS Build Errors

1. Clean your build:

   ```bash
   cd ios && xcodebuild clean && cd ..
   ```

2. Reinstall pods:
   ```bash
   cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
   ```

#### Android Build Errors

1. Clean your build:

   ```bash
   cd android && ./gradlew clean && cd ..
   ```

2. Check that MainApplication.java includes the Reanimated package

#### Expo-Specific Issues

#### "RN-Tosty doesn't work in Expo Go"

This is expected behavior. RN-Tosty uses native modules and cannot run in Expo Go. You need to:

1. **Use Expo Development Build**: `npx expo run:ios` or `npx expo run:android`
2. **Use EAS Build**: Build a custom development client
3. **Eject from Expo**: Convert to a bare React Native project

#### "Reanimated not working in Expo"

Make sure your `babel.config.js` is properly configured:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Must be last!
    ],
  };
};
```

Then rebuild your development build:

```bash
npx expo run:ios --clear-cache
# or
npx expo run:android --clear-cache
```

### Version Compatibility

| RN-Tosty Version | React Native | React   | Reanimated |
| ---------------- | ------------ | ------- | ---------- |
| ^1.0.0           | ^0.70.0      | ^18.0.0 | ^3.0.0     |

## 📱 Platform Support

### ✅ Fully Supported

- **iOS**: 11.0+ (iPhone 6s and newer)
- **Android**: API level 21+ (Android 5.0+)
- **All screen types**: Notch, Dynamic Island, punch-hole cameras
- **Tablets**: iPad, Android tablets with proper safe area handling

### 🔄 Tested Configurations

- **React Native**: 0.70.x, 0.71.x, 0.72.x, 0.73.x, 0.74.x
- **Expo**: SDK 49+ (Development Build / EAS Build only)
- **Expo Go**: ❌ Not supported (native modules required)
- **New Architecture**: Partial support (Fabric + TurboModules)

## 🎯 Next Steps

Now that RN-Tosty is installed, let's set it up properly:

1. **[Quick Start →](./quick-start)** - Basic setup and your first toast
2. **[Your First Toast →](./first-toast)** - Create beautiful notifications
3. **[Core Concepts →](../core-concepts/toast-methods)** - Learn the main API

---

## 💡 Pro Tips

### Use TypeScript

RN-Tosty is built with TypeScript and provides excellent type safety:

```tsx
import type { ToastConfig } from 'rn-tosty';

const config: ToastConfig = {
  message: 'Type-safe configuration!',
  duration: 5000,
  position: 'top', // Autocomplete works here!
};
```

### Development vs Production

Consider using different configurations for development and production:

```tsx
<ToastProvider
  config={{
    // More verbose logging in development
    queue: __DEV__ ? QueuePresets.default() : QueuePresets.conservative(),
  }}
>
```

### Performance Optimization

For apps with many toasts, consider configuring the queue system:

```tsx
<ToastProvider
  config={{
    maxToasts: 3, // Limit concurrent toasts
    queue: QueuePresets.conservative(), // Less aggressive queuing
  }}
>
```

---

**Having trouble?** Check our [troubleshooting guide](../guides/troubleshooting) or [open an issue](https://github.com/Codestz/rn-tosty/issues) on GitHub.
