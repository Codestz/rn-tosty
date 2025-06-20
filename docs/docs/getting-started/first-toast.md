# Your First Toast 🍞✨

Now that you have RN-Tosty installed and set up, let's create some beautiful toasts! This guide will show you the most common patterns you'll use in your app.

## 🎯 The Essential Four

RN-Tosty comes with four built-in toast types that cover 95% of use cases:

### ✅ Success Toasts

Perfect for confirmations and positive feedback:

```tsx
import { toast } from 'rn-tosty';

// Basic success
toast.success('Profile updated successfully!');

// With custom duration
toast.success('Changes saved!', { duration: 3000 });

// Success with data
const user = { name: 'Alex', email: 'alex@example.com' };
toast.success(`Welcome back, ${user.name}!`);
```

**Best for:** Account creation, data saving, successful payments, task completion

### ❌ Error Toasts

Clear communication when things go wrong:

```tsx
// Basic error
toast.error('Something went wrong!');

// Specific error message
toast.error('Invalid email address');

// Error with longer duration (users need time to read)
toast.error('Network connection failed. Please check your internet.', {
  duration: 6000,
});
```

**Best for:** Form validation, network errors, permission denied, failed operations

### ⚠️ Warning Toasts

Important information that needs attention:

```tsx
// Basic warning
toast.warning('Your session will expire in 5 minutes');

// Critical warning with longer display
toast.warning('Low storage space: 85% full', {
  duration: 8000,
  priority: 'high',
});

// Actionable warning
toast.warning('Update available! Restart to install.');
```

**Best for:** Expiring sessions, storage warnings, update notifications, security alerts

### ℹ️ Info Toasts

Helpful information and updates:

```tsx
// Basic info
toast.info('New message received');

// Feature announcements
toast.info('🎉 New dark mode available in settings!');

// Status updates
toast.info('Sync completed: 1,247 items updated');
```

**Best for:** New features, status updates, tips, non-critical notifications

## 🎨 Making It Personal

### Custom Messages with Data

Make your toasts dynamic and personal:

```tsx
// User-specific messages
const userName = 'Sarah';
const taskCount = 5;

toast.success(
  `Great job, ${userName}! You completed ${taskCount} tasks today.`
);

// Shopping cart updates
const itemName = 'Vintage Sneakers';
const cartTotal = 3;

toast.info(`${itemName} added to cart (${cartTotal} items)`);

// Progress updates
const uploadProgress = 85;
toast.info(`Upload progress: ${uploadProgress}%`);
```

### Emoji Power 🚀

Emojis make toasts more engaging and easier to scan:

```tsx
// Before: Boring
toast.success('Task completed');

// After: Engaging
toast.success('🎉 Task completed!');

// More examples
toast.error('🚫 Access denied');
toast.warning('⚠️ Battery low: 15%');
toast.info('📧 New email received');
toast.success('💰 Payment successful!');
```

## ⏰ Timing Matters

Different types of information need different display times:

```tsx
// Quick confirmations (2-3 seconds)
toast.success('Saved!', { duration: 2000 });

// Important info (4-5 seconds) - default
toast.warning('Session expires in 5 minutes');

// Critical errors (6-8 seconds) - users need time to read
toast.error(
  'Payment failed: Your card was declined. Please try a different payment method.',
  {
    duration: 7000,
  }
);

// Permanent until dismissed
toast.error('Critical system error occurred', {
  duration: 0, // Stays until user dismisses
});
```

### Smart Duration Guidelines

| Toast Type            | Recommended Duration | Use Case                                 |
| --------------------- | -------------------- | ---------------------------------------- |
| **Quick Success**     | 2-3 seconds          | "Saved!", "Done!", "Copied!"             |
| **Standard Info**     | 4-5 seconds          | Default for most messages                |
| **Important Warning** | 6-7 seconds          | Security warnings, expiring sessions     |
| **Critical Error**    | 7+ seconds           | Complex error messages                   |
| **Permanent**         | `duration: 0`        | Critical errors requiring acknowledgment |

## 📍 Positioning Strategy

Where your toast appears matters for user experience:

```tsx
// Top position (default) - Great for most notifications
toast.success('Account created!'); // Appears at top

// Bottom position - Good for actions that happen at bottom of screen
toast.info('Swipe up for more options', { position: 'bottom' });

// Context-aware positioning
const handleSaveFromTopBar = () => {
  toast.success('Document saved', { position: 'top' });
};

const handleDeleteFromBottomSheet = () => {
  toast.success('Item deleted', { position: 'bottom' });
};
```

## 🎪 Common Patterns

### Form Validation

```tsx
const validateAndSave = async (formData) => {
  // Validation errors
  if (!formData.email) {
    toast.error('Email is required');
    return;
  }

  if (!formData.email.includes('@')) {
    toast.error('Please enter a valid email address');
    return;
  }

  // Success after saving
  try {
    await saveProfile(formData);
    toast.success('Profile updated successfully!');
  } catch (error) {
    toast.error('Failed to save profile. Please try again.');
  }
};
```

### Shopping Cart Updates

```tsx
const addToCart = (product) => {
  cartService.add(product);
  toast.success(`🛒 ${product.name} added to cart`, {
    duration: 3000,
  });
};

const removeFromCart = (product) => {
  cartService.remove(product.id);
  toast.info(`${product.name} removed from cart`);
};
```

### File Operations

```tsx
const handleFileUpload = (file) => {
  toast.info(`📤 Uploading ${file.name}...`);

  uploadFile(file)
    .then(() => {
      toast.success(`✅ ${file.name} uploaded successfully!`);
    })
    .catch(() => {
      toast.error(`❌ Failed to upload ${file.name}`);
    });
};

// Or using promise strategy

promise(uploadFile(file), {
  loading: {
    icon: { type: 'spinner' },
    message: 'We are uploading your file',
  },
  success: (data) => `File uploaded: ${data.id}`,
  error: (err) => `Failed to upload: ${err.message}`,
});
```

### Social Interactions

```tsx
const handleLike = (postId) => {
  toast.success('❤️ Post liked!', { duration: 2000 });
};

const handleFollow = (userName) => {
  toast.success(`🎉 You're now following ${userName}!`);
};

const handleShare = () => {
  toast.info('📱 Link copied to clipboard', { duration: 3000 });
};
```

## 🚀 Ready for More?

Congratulations! You now know how to create beautiful, effective toasts. These patterns will cover most of your app's notification needs.

### 🎯 What's Next?

- **[Core Concepts →](../core-concepts/toast-methods)** - Dive deeper into the full API
- **[Promise Integration →](../advanced/promise-integration)** - Handle async operations elegantly
- **[Theming →](../theming/built-in-themes)** - Make toasts match your app's personality
- **[Custom Configuration →](../core-concepts/basic-configuration)** - Fine-tune behavior

### 💡 Pro Tips

1. **Be Specific**: "Profile updated" is better than "Success"
2. **Use Emojis**: They make toasts more scannable and engaging
3. **Match Duration to Importance**: Critical messages need more time
4. **Consider Context**: Position toasts near related UI elements
5. **Test on Real Devices**: See how they feel in actual use

### 🎨 Inspiration

Here are some creative toast ideas to spark your imagination:

```tsx
// Gamification
toast.success('🏆 Achievement unlocked: First workout completed!');
toast.info('🔥 5-day streak! Keep it up!');

// Personality
toast.success('🎉 Boom! Your post is live!');
toast.error('🙈 Oops! Something went sideways.');

// Helpful context
toast.warning('🔋 Low battery - save your work soon!');
toast.info('💡 Pro tip: Use keyboard shortcuts to work faster');
```

---

**Ready to make your users smile?** Your toasts are now going to be the best part of your app's user experience! 🎊
