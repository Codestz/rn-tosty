# Theme System Overview 🎨

RN-Tosty's theme system is designed to make your toasts feel like a natural part of your app. Instead of generic notifications, you get beautiful, cohesive experiences that match your app's personality.

## 🧠 The Philosophy

Traditional toast libraries give you "light" and "dark" modes. **RN-Tosty gives you personalities.**

Each theme tells a story and evokes specific emotions:

- **Default**: Clean, professional, versatile
- **Warm Sunset**: Cozy, welcoming, comfortable
- **Ocean Breeze**: Calm, flowing, peaceful
- **Forest Glow**: Natural, grounded, organic

## 🏗️ Architecture

### Theme Structure

Every theme contains both light and dark variants:

```tsx
interface Theme {
  light: ThemeVariant;
  dark: ThemeVariant;
}

interface ThemeVariant {
  name: string;
  mode: 'light' | 'dark';
  borderRadius: BorderRadius;
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  shadows: ShadowConfig;
  progressBar: ProgressBarConfig;
}
```

### Smart Adaptation

RN-Tosty automatically:

- **Follows system appearance** by default
- **Switches themes instantly** without flickering
- **Maintains visual consistency** across all toasts
- **Adapts to device characteristics** (OLED displays, etc.)

## 🎨 Theme Properties Explained

### Colors: The Foundation

Colors define the emotional tone and visual hierarchy:

```tsx
interface ThemeColors {
  // Core brand colors
  primary: string; // Main accent color
  secondary: string; // Supporting color

  // Semantic colors (adapt to context)
  success: string; // Green tones for positive actions
  error: string; // Red tones for errors/warnings
  warning: string; // Orange/yellow for warnings
  info: string; // Blue tones for information

  // Surface colors
  background: string; // App background color
  surface: string; // Toast background

  // Text colors (high contrast for accessibility)
  onPrimary: string; // Text on primary color
  onSecondary: string; // Text on secondary color
  onSurface: string; // Text on surface

  // Structural colors
  border: string; // Borders and dividers
  overlay: string; // Backdrop overlays
  shadow: string; // Drop shadow color
}
```

#### Color Psychology in Themes

**Default Theme**: Professional blues and grays create trust and reliability.

**Warm Sunset**: Oranges and warm reds create comfort and energy.

**Ocean Breeze**: Blues and teals create calm and freshness.

**Forest Glow**: Greens and earth tones create grounding and nature connection.

### Typography: Readable & Harmonious

Typography ensures your toasts are easy to read and feel consistent:

```tsx
interface Typography {
  title: {
    size: number; // Font size in points
    weight: string; // Font weight ('400', '600', 'bold')
    lineHeight: number; // Line height for readability
  };
  description: {
    size: number;
    weight: string;
    lineHeight: number;
  };
}
```

### Spacing: Breathing Room

Proper spacing creates visual hierarchy and comfort:

```tsx
interface Spacing {
  icon: number; // Space around icons
  container: number; // Toast padding
  text: number; // Space between text elements
}
```

### Shadows: Depth & Elevation

Shadows make toasts feel elevated above content:

```tsx
interface ShadowConfig {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  elevation: number; // Android elevation
}
```

### Progress Bars: Visual Feedback

Progress bars show time remaining and provide visual feedback:

```tsx
interface ProgressBarConfig {
  track: {
    backgroundColor: string;
    borderRadius: number;
    height: number;
    opacity: number;
  };
  bar: {
    borderRadius: number;
    height: number;
    gradient?: {
      colors: string[];
      start: { x: number; y: number };
      end: { x: number; y: number };
    };
  };
  animation: {
    duration: number;
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  };
  positioning: {
    defaultPosition: 'top' | 'bottom';
    marginTop: number;
    marginBottom: number;
  };
}
```

## 🎯 How Themes Work

### 1. Theme Selection

```tsx
import { ToastProvider } from 'rn-tosty';

// Use theme by name
<ToastProvider theme="warmSunset">
  <App />
</ToastProvider>;

// Use theme object
import { Themes } from 'rn-tosty';
<ToastProvider theme={Themes.oceanBreeze}>
  <App />
</ToastProvider>;
```

### 2. Mode Management

```tsx
// Follow system appearance (default)
<ToastProvider
  theme="default"
  followSystemAppearance={true}
>

// Force specific mode
<ToastProvider
  theme="forestGlow"
  initialMode="dark"
  followSystemAppearance={false}
>

// Start with auto-detection
<ToastProvider
  theme="oceanBreeze"
  initialMode="auto" // Detects system preference
>
```

### 3. Dynamic Theme Switching

```tsx
import { useTheme } from 'rn-tosty';

function ThemeSelector() {
  const { setTheme, setMode, toggle, currentTheme } = useTheme();

  return (
    <View>
      <Button title="Warm Sunset" onPress={() => setTheme('warmSunset')} />
      <Button title="Toggle Dark Mode" onPress={toggle} />
      <Text>Current: {currentTheme.name}</Text>
    </View>
  );
}
```

## 🎨 Theme Adaptation Examples

### Default Theme Adaptation

```tsx
// In light mode
{
  colors: {
    primary: '#3B82F6',
    surface: '#FFFFFF',
    onSurface: '#1F2937',
    success: '#10B981',
    error: '#EF4444'
  }
}

// In dark mode (automatically adapts)
{
  colors: {
    primary: '#60A5FA',
    surface: '#1F2937',
    onSurface: '#F9FAFB',
    success: '#34D399',
    error: '#F87171'
  }
}
```

### Theme Context Usage

All toast components automatically receive the current theme:

```tsx
// Inside any toast component
const MyCustomToast = () => {
  const theme = useThemeContext();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius,
        ...theme.shadows,
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
};
```

## 🚀 Advanced Theme Features

### Responsive Themes

Themes adapt to different screen sizes and device types:

```tsx
// Tablet adaptations
const tabletSpacing = {
  icon: theme.spacing.icon * 1.2,
  container: theme.spacing.container * 1.3,
  text: theme.spacing.text * 1.1,
};

// Large text adaptations
const largeTextTypography = {
  title: {
    ...theme.typography.title,
    size: theme.typography.title.size * 1.15,
  },
};
```

### OLED Optimizations

For devices with OLED displays, dark themes use true black:

```tsx
// Standard dark theme
surface: '#1F2937';

// OLED-optimized dark theme
surface: '#000000'; // True black saves battery on OLED
```

### Accessibility Enhancements

Themes automatically enhance contrast for better accessibility:

```tsx
// High contrast mode adaptations
const highContrastColors = {
  ...theme.colors,
  onSurface: theme.mode === 'dark' ? '#FFFFFF' : '#000000',
  border: theme.mode === 'dark' ? '#FFFFFF' : '#000000',
};
```

## 🎯 Choosing the Right Theme

### Default Theme

**Best for:** Business apps, productivity tools, professional applications
**Personality:** Clean, trustworthy, versatile
**Use when:** You want reliable, professional-looking notifications

### Warm Sunset Theme

**Best for:** Social apps, lifestyle apps, e-commerce
**Personality:** Cozy, welcoming, energetic
**Use when:** You want to create warmth and positive emotions

### Ocean Breeze Theme

**Best for:** Health apps, meditation apps, wellness tools
**Personality:** Calm, flowing, peaceful
**Use when:** You want to create tranquility and focus

### Forest Glow Theme

**Best for:** Outdoor apps, nature apps, environmental tools
**Personality:** Natural, grounded, organic
**Use when:** You want to connect with nature and sustainability

## 🔧 Performance & Optimization

### Theme Switching Performance

- **Instant switching**: No re-renders of existing toasts
- **Smooth transitions**: New toasts appear with new theme
- **Memory efficient**: Only active theme is kept in memory
- **Lazy loading**: Theme assets loaded on demand

### Bundle Size Impact

- **Base themes included**: ~8KB total for all 4 themes
- **Tree shaking support**: Unused themes are excluded
- **Custom themes**: Only add size when you create them

## 🚀 Next Steps

Now that you understand the theme system:

- **[Built-in Themes →](./built-in-themes)** - Explore all available themes
- **[Custom Themes →](./custom-themes)** - Create your own theme
- **[Light/Dark Mode →](./light-dark-mode)** - Control mode switching
- **[Theme Properties →](./theme-properties)** - Deep dive into configuration

---

**🎨 Your toasts will never look generic again!** The theme system ensures every notification feels like it belongs in your app.
