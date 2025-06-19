# Toast Methods 🛠️

The heart of RN-Tosty lies in its simple, powerful API. This guide covers all the methods you'll use to create beautiful toast notifications.

## 🚀 The Main Methods

These five methods handle 99% of your toast needs:

### `toast.success(message, config?)`

Shows a success toast with positive feedback styling.

```tsx
import { toast } from 'rn-tosty';

// Basic success
toast.success('Profile updated successfully!');

// With configuration
toast.success('Data saved!', {
  duration: 3000,
  position: 'bottom',
  priority: 'high',
});

// With dynamic content
const user = { name: 'Alex', points: 1250 };
toast.success(`Welcome back, ${user.name}! You have ${user.points} points.`);
```

**Returns:** `string` - Unique toast ID for dismissal

### `toast.error(message, config?)`

Shows an error toast for problems and failures.

```tsx
// Basic error
toast.error('Something went wrong!');

// Validation error
toast.error('Email address is required');

// Network error with longer duration
toast.error(
  'Failed to connect to server. Please check your internet connection.',
  {
    duration: 6000,
  }
);

// Critical error that stays until dismissed
toast.error('Payment failed: Please try a different card', {
  duration: 0, // Stays until user taps to dismiss
});
```

### `toast.warning(message, config?)`

Shows a warning toast for important information.

```tsx
// Basic warning
toast.warning('Your session will expire in 5 minutes');

// Storage warning
toast.warning('Storage almost full: 95% used', {
  priority: 'high',
  duration: 7000,
});

// Update notification
toast.warning('New version available - restart to update');
```

### `toast.info(message, config?)`

Shows an info toast for general information and updates.

```tsx
// Basic info
toast.info('Sync completed successfully');

// Feature announcement
toast.info('🎉 New dark mode available in settings!');

// Progress update
toast.info('Upload progress: 75% complete');

// Positioned at bottom
toast.info('Swipe left for more options', {
  position: 'bottom',
});
```

### `toast.custom(config)`

Shows a fully customizable toast with complete control.

```tsx
// Custom toast with all options
toast.custom({
  message: 'Custom notification!',
  type: 'success', // or 'error', 'warning', 'info'
  duration: 5000,
  position: 'top',
  variant: 'my-custom-variant',
  icon: MyCustomIcon,
  layout: {
    iconPosition: 'right',
    textAlignment: 'center',
  },
  progressBar: {
    enabled: true,
    color: '#FF6B6B',
  },
});
```

## ⚡ Promise Integration

The most powerful feature for handling async operations:

### `toast.promise(promise, messages, config?)`

Automatically manages loading, success, and error states.

```tsx
// Basic promise handling
const saveProfile = async () => {
  const response = await api.updateProfile(userData);
  return response.data;
};

toast.promise(saveProfile(), {
  loading: 'Saving your profile...',
  success: 'Profile updated successfully!',
  error: 'Failed to save profile',
});
```

#### Advanced Promise Configuration

```tsx
// With dynamic messages
toast.promise(
  uploadFile(file),
  {
    loading: {
      message: `Uploading ${file.name}...`,
      icon: { type: 'bars', size: 'large' },
    },
    success: (result) => `${result.fileName} uploaded successfully!`,
    error: (error) => `Upload failed: ${error.message}`,
  },
  {
    position: 'bottom',
    layout: { iconPosition: 'right' },
  }
);

// Multiple operations
const syncData = async () => {
  const [users, posts, comments] = await Promise.all([
    api.getUsers(),
    api.getPosts(),
    api.getComments(),
  ]);
  return {
    users: users.length,
    posts: posts.length,
    comments: comments.length,
  };
};

toast.promise(syncData(), {
  loading: 'Syncing data...',
  success: (data) =>
    `Synced ${data.users} users, ${data.posts} posts, ${data.comments} comments`,
  error: 'Sync failed - please try again',
});
```

## 🎛️ Utility Methods

### `toast.dismiss(id?)`

Dismiss specific or all toasts.

```tsx
// Dismiss specific toast
const toastId = toast.success('This will be dismissed');
setTimeout(() => toast.dismiss(toastId), 2000);

// Dismiss all toasts
toast.dismiss();

// Common pattern: dismiss all before showing new
const showCriticalError = () => {
  toast.dismiss(); // Clear all existing toasts
  toast.error('Critical error occurred!', { priority: 'urgent' });
};
```

### `toast.getQueueStats()`

Get information about the current toast queue.

```tsx
const stats = toast.getQueueStats();
console.log(stats);
// {
//   visible: 2,    // Currently visible toasts
//   queued: 3,     // Waiting in queue
//   total: 5       // Total managed toasts
// }

// Use for debugging or UI feedback
const showQueueInfo = () => {
  const { visible, queued } = toast.getQueueStats();
  if (queued > 0) {
    toast.info(`${visible} visible, ${queued} queued`);
  }
};
```

## 🔧 Configuration Options

All methods accept an optional configuration object:

### Basic Configuration

```tsx
interface ToastConfig {
  // Timing
  duration?: number; // Duration in ms (0 = permanent)

  // Positioning
  position?: 'top' | 'bottom'; // Where to show the toast

  // Priority (affects queue order)
  priority?: 'low' | 'medium' | 'high' | 'urgent';

  // Styling
  variant?: string; // Custom variant name

  // Layout
  layout?: {
    iconPosition?: 'left' | 'right';
    textAlignment?: 'left' | 'center' | 'right';
    spacing?: 'compact' | 'default' | 'spacious';
  };

  // Progress bar
  progressBar?: {
    enabled?: boolean;
    position?: 'top' | 'bottom';
    color?: string;
    height?: number;
  };

  // Custom icon
  icon?: React.ComponentType<IconProps>;
}
```

### Advanced Configuration Examples

```tsx
// High priority error with custom styling
toast.error('Critical system error', {
  priority: 'urgent',
  duration: 0, // Permanent until dismissed
  layout: {
    iconPosition: 'left',
    textAlignment: 'center',
    spacing: 'spacious',
  },
  progressBar: {
    enabled: false, // No progress bar for permanent toasts
  },
});

// Custom success with right-aligned icon
toast.success('Task completed successfully!', {
  duration: 4000,
  position: 'bottom',
  layout: {
    iconPosition: 'right',
    textAlignment: 'left',
    spacing: 'default',
  },
  progressBar: {
    enabled: true,
    position: 'top',
    color: '#10B981',
    height: 3,
  },
});
```

## 🎨 Custom Icons

Add personality with custom icons:

```tsx
import { CustomIconComponent } from 'rn-tosty';

// Create custom icon component
const HeartIcon: CustomIconComponent = ({ size, color, theme }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color, fontSize: size * 0.8 }}>♥</Text>
  </View>
);

// Use in toast
toast.success('You earned a heart!', {
  icon: HeartIcon,
  duration: 3000,
  layout: { iconPosition: 'right' },
});

// Vector icons (with react-native-vector-icons)
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomVectorIcon: CustomIconComponent = ({ size, color }) => (
  <Icon name="favorite" size={size} color={color} />
);

toast.success('Added to favorites!', { icon: CustomVectorIcon });
```

## 🔄 Hook Alternative: `useTosty`

For component-based usage:

```tsx
import { useTosty } from 'rn-tosty';

function MyComponent() {
  const {
    success,
    error,
    warning,
    info,
    custom,
    promise,
    dismiss,
    getQueueStats,
  } = useTosty();

  const handleSave = async () => {
    try {
      const result = await promise(saveData(), {
        loading: 'Saving...',
        success: 'Saved successfully!',
        error: 'Save failed',
      });

      // Use the result
      console.log('Save result:', result);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <View>
      <Button title="Success" onPress={() => success('Great job!')} />
      <Button title="Error" onPress={() => error('Oops!')} />
      <Button title="Save Data" onPress={handleSave} />
      <Button title="Clear All" onPress={() => dismiss()} />
    </View>
  );
}
```

## 🎯 Best Practices

### Message Writing

```tsx
// ❌ Too generic
toast.success('Success');

// ✅ Specific and helpful
toast.success('Profile photo updated successfully!');

// ❌ Technical jargon
toast.error('HTTP 500 Internal Server Error');

// ✅ User-friendly
toast.error('Something went wrong on our end. Please try again.');
```

### Duration Guidelines

```tsx
// Quick confirmations
toast.success('Copied!', { duration: 2000 });

// Standard messages (default: 4000ms)
toast.info('Sync completed');

// Important information
toast.warning('Session expires in 5 minutes', { duration: 6000 });

// Critical errors (let users read)
toast.error('Payment failed: Card was declined', { duration: 7000 });

// Requires action
toast.error('Network error - check connection', { duration: 0 });
```

### Priority Usage

```tsx
// Low priority - background tasks, tips
toast.info('Pro tip: Use keyboard shortcuts', { priority: 'low' });

// Medium priority - standard notifications (default)
toast.success('Message sent');

// High priority - important but not urgent
toast.warning('Low battery: 20%', { priority: 'high' });

// Urgent - critical, needs immediate attention
toast.error('Payment failed!', { priority: 'urgent' });
```

## 🚀 Next Steps

Now that you know all the toast methods, explore these advanced topics:

- **[Basic Configuration →](./basic-configuration)** - Fine-tune behavior
- **[Promise Integration →](../advanced/promise-integration)** - Deep dive into async handling
- **[Custom Variants →](../variants/creating-custom-variants)** - Create your own toast styles
- **[Queue Management →](../advanced/queue-management)** - Control multiple toasts

---

**🎊 You're now a toast expert!** These methods give you everything you need to create beautiful, effective notifications in your React Native app.
