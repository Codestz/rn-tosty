# Built-in Themes 🎨

RN-Tosty comes with four carefully crafted themes, each designed to evoke specific emotions and work perfectly with different types of apps. Every theme includes both light and dark modes that adapt automatically.

## 🎯 Theme Overview

| Theme            | Personality               | Best For                      | Light Colors         | Dark Colors                |
| ---------------- | ------------------------- | ----------------------------- | -------------------- | -------------------------- |
| **Default**      | Professional, Trustworthy | Business, Productivity        | Blues & Grays        | Muted Blues & Dark Grays   |
| **Warm Sunset**  | Cozy, Welcoming           | Social, Lifestyle, E-commerce | Oranges & Warm Reds  | Deep Oranges & Warm Browns |
| **Ocean Breeze** | Calm, Flowing             | Health, Meditation, Wellness  | Blues & Teals        | Deep Blues & Cyan          |
| **Forest Glow**  | Natural, Grounded         | Outdoor, Environmental        | Greens & Earth Tones | Deep Greens & Forest Tones |

## 🎨 Default Theme

**Personality:** Clean, professional, versatile  
**Use Cases:** Business apps, productivity tools, professional applications

### Light Mode

```tsx
<ToastProvider theme="default">
```

**Color Palette:**

- **Primary:** `#3B82F6` (Professional Blue)
- **Success:** `#10B981` (Trust Green)
- **Error:** `#EF4444` (Clear Red)
- **Warning:** `#F59E0B` (Attention Orange)
- **Info:** `#3B82F6` (Information Blue)
- **Surface:** `#FFFFFF` (Clean White)
- **Background:** `#F9FAFB` (Subtle Gray)

### Dark Mode

**Color Palette:**

- **Primary:** `#60A5FA` (Bright Blue)
- **Success:** `#34D399` (Vibrant Green)
- **Error:** `#F87171` (Soft Red)
- **Warning:** `#FBBF24` (Warm Orange)
- **Info:** `#60A5FA` (Bright Blue)
- **Surface:** `#1F2937` (Dark Gray)
- **Background:** `#0F1419` (Deep Dark)

### Perfect For:

```tsx
// SaaS dashboards
toast.success('Report generated successfully');

// Business applications
toast.info('New team member invitation sent');

// Productivity tools
toast.warning('Meeting starts in 5 minutes');

// Professional services
toast.error('Document upload failed');
```

## 🌅 Warm Sunset Theme

**Personality:** Cozy, welcoming, energetic  
**Use Cases:** Social media apps, lifestyle apps, e-commerce, food delivery

### Light Mode

```tsx
<ToastProvider theme="warmSunset">
```

**Color Palette:**

- **Primary:** `#F97316` (Sunset Orange)
- **Success:** `#10B981` (Warm Green)
- **Error:** `#DC2626` (Warm Red)
- **Warning:** `#F59E0B` (Golden Yellow)
- **Info:** `#2563EB` (Warm Blue)
- **Surface:** `#FFF7ED` (Warm White)
- **Background:** `#FFFBF5` (Cream)

### Dark Mode

**Color Palette:**

- **Primary:** `#FB923C` (Bright Orange)
- **Success:** `#34D399` (Bright Green)
- **Error:** `#F87171` (Soft Red)
- **Warning:** `#FBBF24` (Gold)
- **Info:** `#60A5FA` (Bright Blue)
- **Surface:** `#451A03` (Dark Brown)
- **Background:** `#1C0F08` (Deep Brown)

### Perfect For:

```tsx
// Social media interactions
toast.success('🎉 Your post got 100 likes!');

// E-commerce purchases
toast.success('Order confirmed! Your coffee is on the way ☕');

// Food delivery
toast.info('Your pizza will arrive in 25 minutes 🍕');

// Lifestyle apps
toast.warning("Don't forget your daily meditation 🧘‍♀️");
```

## 🌊 Ocean Breeze Theme

**Personality:** Calm, flowing, peaceful  
**Use Cases:** Health apps, meditation apps, wellness tools, sleep tracking

### Light Mode

```tsx
<ToastProvider theme="oceanBreeze">
```

**Color Palette:**

- **Primary:** `#0891B2` (Ocean Blue)
- **Success:** `#059669` (Sea Green)
- **Error:** `#DC2626` (Coral Red)
- **Warning:** `#D97706` (Sunset Orange)
- **Info:** `#0284C7` (Deep Blue)
- **Surface:** `#F0F9FF` (Light Blue)
- **Background:** `#F8FAFC` (Misty White)

### Dark Mode

**Color Palette:**

- **Primary:** `#22D3EE` (Bright Cyan)
- **Success:** `#10B981` (Aqua Green)
- **Error:** `#F87171` (Soft Coral)
- **Warning:** `#FB923C` (Warm Orange)
- **Info:** `#38BDF8` (Sky Blue)
- **Surface:** `#164E63` (Deep Teal)
- **Background:** `#0F172A` (Ocean Deep)

### Perfect For:

```tsx
// Meditation apps
toast.success('🧘 10-minute meditation completed');

// Health tracking
toast.info('💧 Time for your daily water reminder');

// Sleep apps
toast.warning('😴 Bedtime in 30 minutes for optimal sleep');

// Wellness tools
toast.success('🌱 Weekly fitness goal achieved!');
```

## 🌲 Forest Glow Theme

**Personality:** Natural, grounded, organic  
**Use Cases:** Outdoor apps, environmental tools, nature photography, hiking

### Light Mode

```tsx
<ToastProvider theme="forestGlow">
```

**Color Palette:**

- **Primary:** `#059669` (Forest Green)
- **Success:** `#10B981` (Fresh Green)
- **Error:** `#B91C1C` (Earth Red)
- **Warning:** `#D97706` (Autumn Orange)
- **Info:** `#0369A1` (Sky Blue)
- **Surface:** `#F0FDF4` (Light Green)
- **Background:** `#F9FAFB` (Natural White)

### Dark Mode

**Color Palette:**

- **Primary:** `#34D399` (Bright Green)
- **Success:** `#6EE7B7` (Light Green)
- **Error:** `#F87171` (Soft Red)
- **Warning:** `#FCA5A5` (Warm Orange)
- **Info:** `#7DD3FC` (Bright Blue)
- **Surface:** `#064E3B` (Dark Forest)
- **Background:** `#0F1B0F` (Deep Forest)

### Perfect For:

```tsx
// Hiking apps
toast.success('🥾 Trail completed! 5.2 miles logged');

// Environmental apps
toast.info('🌱 You saved 2.3 kg of CO2 this week');

// Nature photography
toast.success('📸 Photo saved to your nature collection');

// Outdoor activities
toast.warning('🌧️ Rain expected in your area - plan accordingly');
```

## 🔄 Theme Switching

### Static Theme Selection

```tsx
// Set theme at app level
<ToastProvider theme="warmSunset">
  <App />
</ToastProvider>;

// Using theme objects
import { Themes } from 'rn-tosty';
<ToastProvider theme={Themes.oceanBreeze}>
  <App />
</ToastProvider>;
```

### Dynamic Theme Switching

```tsx
import { useTheme } from 'rn-tosty';

function ThemeSelector() {
  const { setTheme, currentTheme, themeName } = useTheme();

  const themes = [
    { key: 'default', name: 'Default', emoji: '🎯' },
    { key: 'warmSunset', name: 'Warm Sunset', emoji: '🌅' },
    { key: 'oceanBreeze', name: 'Ocean Breeze', emoji: '🌊' },
    { key: 'forestGlow', name: 'Forest Glow', emoji: '🌲' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Theme</Text>
      {themes.map((theme) => (
        <TouchableOpacity
          key={theme.key}
          style={[
            styles.themeButton,
            themeName === theme.key && styles.activeTheme,
          ]}
          onPress={() => setTheme(theme.key)}
        >
          <Text style={styles.emoji}>{theme.emoji}</Text>
          <Text style={styles.themeName}>{theme.name}</Text>
          {themeName === theme.key && <Text>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

## 🌗 Light/Dark Mode Management

### Automatic System Following

```tsx
// Follows system appearance automatically (default)
<ToastProvider
  theme="oceanBreeze"
  followSystemAppearance={true}
>
```

### Manual Mode Control

```tsx
import { useTheme } from 'rn-tosty';

function DarkModeToggle() {
  const { setMode, isDark, toggle } = useTheme();

  return (
    <TouchableOpacity style={styles.toggle} onPress={toggle}>
      <Text>{isDark ? '☀️' : '🌙'}</Text>
      <Text>{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
    </TouchableOpacity>
  );
}
```

### Initial Mode Setting

```tsx
<ToastProvider
  theme="forestGlow"
  initialMode="dark"           // 'light', 'dark', 'auto'
  followSystemAppearance={false}
>
```

## 🎨 Theme Customization

### Override Theme Colors

```tsx
import { Themes } from 'rn-tosty';

// Create custom theme based on existing one
const customTheme = {
  ...Themes.warmSunset,
  light: {
    ...Themes.warmSunset.light,
    colors: {
      ...Themes.warmSunset.light.colors,
      primary: '#FF6B35', // Custom brand color
      success: '#4ECDC4', // Custom success color
    }
  }
};

<ToastProvider theme={customTheme}>
```

## 🎯 Choosing the Right Theme

### Consider Your App's Purpose

**Business & Productivity** → Default Theme

- Professional appearance builds trust
- Clean, distraction-free design
- Works well in corporate environments

**Social & Lifestyle** → Warm Sunset Theme

- Creates emotional connection
- Encourages engagement and sharing
- Feels personal and welcoming

**Health & Wellness** → Ocean Breeze Theme

- Promotes calm and focus
- Reduces anxiety and stress
- Supports mindful interactions

**Outdoor & Environmental** → Forest Glow Theme

- Connects with nature
- Promotes environmental awareness
- Feels authentic and grounded

## 🔧 Advanced Theme Features

### Theme Transitions

Themes switch instantly without jarring transitions:

```tsx
// Smooth theme switching
const switchToNightMode = () => {
  setTheme('forestGlow');
  setMode('dark');

  toast.success('🌙 Switched to night mode');
};
```

### Per-Toast Theme Override

```tsx
// Use specific variant that works with any theme
toast.success('Brand message!', { variant: 'brand-primary' });

// Or create theme-specific variants
toast.success('Celebration time!', {
  variant: themeName === 'warmSunset' ? 'celebration' : 'default',
});
```

## 🚀 Next Steps

Explore more theming capabilities:

- **[Theme Properties →](./theme-properties)** - Deep dive into theme structure
- **[Custom Themes →](./custom-themes)** - Create your own themes
- **[Light/Dark Mode →](./light-dark-mode)** - Master mode switching
- **[Theme Overview →](./overview)** - Understanding the theme system

---

**🎨 The right theme makes your app feel cohesive** and creates the perfect emotional context for every user interaction!
