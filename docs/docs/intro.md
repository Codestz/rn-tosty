# Welcome to RN-Tosty 🍞

**The most delicious toast notifications for React Native**

<div style={{textAlign: 'center', margin: '2rem 0'}}>

[![npm version](https://badge.fury.io/js/rn-tosty.svg)](https://badge.fury.io/js/rn-tosty)
[![npm downloads](https://img.shields.io/npm/dm/rn-tosty.svg)](https://www.npmjs.com/package/rn-tosty)
[![license](https://img.shields.io/npm/l/rn-tosty.svg)](https://github.com/Codestz/rn-tosty/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

</div>

---

## ✨ What Makes RN-Tosty Special?

Imagine this: Your user just completed a purchase, uploaded a photo, or finished a workout. Instead of a plain, lifeless toast that barely catches their attention, they see a **beautiful, themed notification** that perfectly matches your app's personality – complete with smooth animations, smart positioning, and delightful interactions.

**That's RN-Tosty. Toast notifications that actually make users smile.**

## 🚀 Quick Peek

```tsx
import { toast } from 'rn-tosty';

// Simple and beautiful
toast.success('Profile updated successfully!');

// Smart async handling
toast.promise(saveUserProfile(), {
  loading: 'Saving your profile...',
  success: (data) => `Welcome back, ${data.name}!`,
  error: 'Oops! Something went wrong',
});
```

**What happens behind the scenes:**

- ✨ Beautiful loading animation appears instantly
- 📱 Smart positioning avoids your device's notch
- ⏱️ Progress bar shows exactly how much time is left
- 🎨 Theme colors automatically match your app
- ♿ Screen reader announces the result
- 🧠 Queue manages multiple toasts intelligently
- 🛡️ Error boundary protects your app if something breaks

**All from one simple function call.**

## 🎯 Built for the Real World

- **🚀 One Line of Code**: `toast.success('Done!')` – seriously, that's it
- **🎨 4 Stunning Themes**: From warm sunsets to ocean breezes, each with unique personality
- **📱 Device-Smart**: Automatically avoids notches, Dynamic Island, and punch-holes
- **⚡ Lightning Fast**: 60fps animations that feel native and responsive
- **🧠 Actually Intelligent**: Smart queuing, priority handling, and duplicate detection
- **♿ Inclusive by Design**: WCAG 2.1 AA compliant with screen reader support
- **🛡️ Production Battle-Tested**: Error boundaries, crash protection, and comprehensive logging

## 🎉 Ready to Get Started?

<div style={{
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: '1rem',
  margin: '2rem 0'
}}>

<div style={{
  border: '1px solid var(--ifm-color-emphasis-200)',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center'
}}>

### 🚀 **New to RN-Tosty?**

Start with our quick installation guide and create your first beautiful toast in minutes.

[Get Started →](./getting-started/installation)

</div>

<div style={{
  border: '1px solid var(--ifm-color-emphasis-200)',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center'
}}>

### 🎨 **Explore Themes**

Discover how to make toasts that perfectly match your app's personality with our theme system.

[View Themes →](./theming/built-in-themes)

</div>

<div style={{
  border: '1px solid var(--ifm-color-emphasis-200)',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center'
}}>

### ⚡ **Power Features**

Learn about promise integration, custom variants, and advanced queue management.

[Advanced Features →](./advanced/promise-integration)

</div>

<div style={{
  border: '1px solid var(--ifm-color-emphasis-200)',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center'
}}>

### 📖 **API Reference**

Complete technical documentation for all methods, hooks, and configuration options.

[API Docs →](./api/toast-methods)

</div>

</div>

## 💡 Popular Use Cases

- **E-commerce**: Beautiful purchase confirmations and error handling
- **Social Apps**: Elegant like notifications and upload confirmations
- **Productivity**: Progress tracking and task completion feedback
- **Health & Fitness**: Motivational messages and achievement celebrations
- **Any App**: Better user experience with delightful notifications

---

**Made with ❤️ for the React Native community**

Ready to make your users smile? Let's start with [installation](./getting-started/installation)!
