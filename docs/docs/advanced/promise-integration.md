# Promise Integration ⚡

One of RN-Tosty's most powerful features is seamless promise integration. Handle async operations with beautiful loading states, automatic success/error handling, and smooth transitions.

## 🚀 The Magic of Promise Toasts

Traditional approach (verbose and error-prone):

```tsx
// ❌ Old way - manual state management
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  toast.info('Saving...'); // Manual loading toast

  try {
    const result = await api.saveProfile(data);
    toast.dismiss(); // Remember to dismiss loading
    toast.success('Profile saved!');
    return result;
  } catch (error) {
    toast.dismiss(); // Don't forget this!
    toast.error('Save failed!');
    throw error;
  } finally {
    setLoading(false);
  }
};
```

RN-Tosty approach (elegant and automatic):

```tsx
// ✅ New way - automatic state management
const handleSave = () => {
  return toast.promise(api.saveProfile(data), {
    loading: 'Saving your profile...',
    success: 'Profile saved successfully!',
    error: 'Failed to save profile',
  });
};
```

**What happens automatically:**

1. 🔄 Loading toast appears with spinner animation
2. ✅ Seamlessly transitions to success toast on resolve
3. ❌ Or transitions to error toast on rejection
4. 🧹 Automatically cleans up and manages state

## 📚 Basic Usage

### Simple Promise Handling

```tsx
import { toast } from 'rn-tosty';

// Basic promise integration
const uploadFile = async (file) => {
  return toast.promise(
    api.uploadFile(file), // Your promise
    {
      loading: 'Uploading file...',
      success: 'File uploaded successfully!',
      error: 'Upload failed',
    }
  );
};
```

### Dynamic Messages

Messages can be functions that receive the resolved/rejected value:

```tsx
const saveUser = async (userData) => {
  return toast.promise(api.createUser(userData), {
    loading: 'Creating user account...',
    success: (user) => `Welcome, ${user.name}! Your account is ready.`,
    error: (error) => `Failed to create account: ${error.message}`,
  });
};
```

## 🎨 Advanced Configuration

### Custom Loading Icons

Choose from different loading animations:

```tsx
toast.promise(fetchData(), {
  loading: {
    message: 'Loading your data...',
    icon: {
      type: 'spinner', // 'spinner', 'dots', 'bars', 'pulse'
      size: 'large', // 'small', 'medium', 'large', or number
      color: '#3B82F6', // Custom color
    },
  },
  success: 'Data loaded!',
  error: 'Loading failed',
});
```

### Multiple Step Operations

Handle complex multi-step operations:

```tsx
const syncAllData = async () => {
  const steps = [
    { fn: () => api.syncUsers(), message: 'Syncing users...' },
    { fn: () => api.syncPosts(), message: 'Syncing posts...' },
    { fn: () => api.syncComments(), message: 'Syncing comments...' },
  ];

  const results = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const result = await toast.promise(step.fn(), {
      loading: `${step.message} (${i + 1}/${steps.length})`,
      success: (data) =>
        `${step.message.replace('ing...', 'ed!')} ${data.length} items`,
      error: (err) => `${step.message.replace('Syncing', 'Failed to sync')}`,
    });
    results.push(result);
  }

  return results;
};
```

## 🎯 Real-World Examples

### E-commerce Checkout

```tsx
const processCheckout = async (orderData) => {
  // Step 1: Validate payment
  const payment = await toast.promise(api.validatePayment(orderData.payment), {
    loading: {
      message: 'Validating payment method...',
      icon: { type: 'spinner', size: 'medium' },
    },
    success: 'Payment method validated ✓',
    error: (err) => `Payment validation failed: ${err.message}`,
  });

  // Step 2: Process order
  const order = await toast.promise(
    api.processOrder({ ...orderData, paymentId: payment.id }),
    {
      loading: {
        message: 'Processing your order...',
        icon: { type: 'bars', size: 'large' },
      },
      success: (order) => `Order #${order.id} confirmed! 🎉`,
      error: 'Order processing failed. Your card was not charged.',
    },
    {
      duration: 6000, // Show success longer
      priority: 'high',
    }
  );

  return order;
};
```

### File Upload with Progress

```tsx
const uploadImages = async (images) => {
  const uploads = images.map(async (image, index) => {
    return toast.promise(
      api.uploadImage(image),
      {
        loading: {
          message: `Uploading ${image.name}... (${index + 1}/${images.length})`,
          icon: { type: 'pulse', color: '#3B82F6' },
        },
        success: (result) => `📸 ${image.name} uploaded (${result.size} KB)`,
        error: (err) => `❌ Failed to upload ${image.name}: ${err.message}`,
      },
      {
        position: 'bottom',
        duration: 3000,
      }
    );
  });

  return Promise.all(uploads);
};
```

### Social Media Post

```tsx
const publishPost = async (postData) => {
  return toast.promise(
    api.createPost(postData),
    {
      loading: {
        message: 'Publishing your post...',
        icon: { type: 'dots', size: 'medium' },
      },
      success: (post) => {
        const likes = post.likes || 0;
        const shares = post.shares || 0;
        return `🎉 Post published! ${likes} likes, ${shares} shares`;
      },
      error: (error) => {
        if (error.code === 'CONTENT_MODERATION') {
          return '🚫 Post blocked by content moderation';
        }
        return `😔 Failed to publish: ${error.message}`;
      },
    },
    {
      variant: 'social-success', // Custom variant for social actions
      duration: 5000,
    }
  );
};
```

### Data Sync with Retry

```tsx
const syncWithRetry = async (data, maxRetries = 3) => {
  let attempt = 0;

  const attemptSync = async () => {
    attempt++;

    try {
      return await api.syncData(data);
    } catch (error) {
      if (attempt < maxRetries && error.code === 'NETWORK_ERROR') {
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        return attemptSync();
      }
      throw error;
    }
  };

  return toast.promise(attemptSync(), {
    loading: {
      message: 'Syncing data...',
      icon: { type: 'spinner' },
    },
    success: (result) => `✅ Synced ${result.count} items successfully`,
    error: (error) => {
      if (attempt >= maxRetries) {
        return `❌ Sync failed after ${maxRetries} attempts: ${error.message}`;
      }
      return `❌ Sync failed: ${error.message}`;
    },
  });
};
```

## 🎛️ Configuration Options

### Promise Messages and Promise Configuration

```tsx
interface PromiseMessages<T = any> {
  loading: PromiseMessage<T>;
  success: PromiseMessage<T>;
  error: PromiseErrorMessage;
}

type PromiseMessage<T = any> =
  | string
  | ((data: T) => string)
  | PromiseToastConfig
  | ((data: T) => PromiseToastConfig);

interface PromiseConfig {
  position?: ToastPosition;
  /** Global layout configuration applied to all promise toast states */
  layout?: ToastLayoutConfig;
}
```

### Promise Configuration Examples

```tsx
toast.promise(mockApiSuccess(2000), {
  loading: {
    icon: { type: 'bars' },
    message: 'Loading success...',
  },
  success: (data) => `Welcome ${data.name}! (${data.status})`,
  error: (err) => `Failed: ${err.message}`,
});

toast.promise<{ id: number; name: string }>(
  mockApiError(),
  {
    loading: {
      message: 'Loading error...',
      icon: { type: 'spinner', size: 'large' },
    },
    success: (data) => `Data loaded successfully: ${data?.name ?? ''}`,
    error: (err) => `Error loading data: ${err.message}`,
  },
  {
    layout: {
      iconPosition: 'right',
      textAlignment: 'left',
      spacing: 'spacious',
    },
  }
);

toast.promise<{ id: number; name: string }>(mockApiError(), {
  loading: {
    message: 'Loading error...',
    icon: { type: 'spinner', size: 'large' },
    variant: 'showcase-error',
  },
  success: (data) => ({
    message: `Data loaded successfully: ${data?.name ?? ''}`,
    variant: 'showcase-success',
    title: 'Success',
  }),
  error: (err) => ({
    message: `Error loading data: ${err.message}`,
    variant: 'showcase-error',
    title: 'Error',
  }),
});
```

## 🎨 Loading Icon Types

### Spinner (Default)

```tsx
icon: {
  type: 'spinner';
}
```

Classic spinning circle - works great for most operations.

### Dots

```tsx
icon: {
  type: 'dots';
}
```

Three bouncing dots - perfect for messaging or chat operations.

### Bars

```tsx
icon: {
  type: 'bars';
}
```

Animated equalizer bars - great for audio/video processing or data analysis.

### Pulse

```tsx
icon: {
  type: 'pulse';
}
```

Pulsing circle - ideal for sync operations or heartbeat-like processes.

### Custom Icons

```tsx
import { CustomIconComponent } from 'rn-tosty';

const CustomLoadingIcon: CustomIconComponent = ({ size, color }) => (
  <YourAnimatedIcon size={size} color={color} />
);

toast.promise(operation(), {
  loading: {
    message: 'Processing...',
    icon: CustomLoadingIcon,
  },
  // ...
});
```

## 🔧 Error Handling Strategies

### Graceful Error Messages

```tsx
const handleApiError = (error) => {
  // Network errors
  if (error.code === 'NETWORK_ERROR') {
    return 'Connection lost. Please check your internet.';
  }

  // Server errors
  if (error.status >= 500) {
    return 'Server error. Our team has been notified.';
  }

  // Client errors
  if (error.status === 401) {
    return 'Session expired. Please log in again.';
  }

  if (error.status === 403) {
    return "You don't have permission for this action.";
  }

  // Default fallback
  return error.message || 'Something went wrong. Please try again.';
};

// Use in promise
toast.promise(riskyOperation(), {
  loading: 'Processing...',
  success: 'Done!',
  error: handleApiError,
});
```

### Type-Safe Error Handling

```tsx
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

const typedApiCall = (): Promise<{ id: string; name: string }> => {
  return api.getData();
};

toast.promise(typedApiCall(), {
  loading: 'Loading data...',
  success: (data) => `Loaded ${data.name} successfully!`,
  error: (error: ApiError) => {
    switch (error.code) {
      case 'NOT_FOUND':
        return 'Data not found. It may have been deleted.';
      case 'PERMISSION_DENIED':
        return 'Access denied. Please contact your administrator.';
      default:
        return `Error: ${error.message}`;
    }
  },
});
```

## 🚀 Performance Tips

### 1. **Avoid Promise Spam**

```tsx
// ❌ Don't create promise toast for every action
onClick={() => {
  // These will create multiple loading toasts
  toast.promise(api.like(postId), { /* ... */ });
  toast.promise(api.follow(userId), { /* ... */ });
  toast.promise(api.bookmark(postId), { /* ... */ });
}}

// ✅ Batch operations or use different approaches
onClick={() => {
  // Option 1: Batch the operations
  toast.promise(
    Promise.all([
      api.like(postId),
      api.follow(userId),
      api.bookmark(postId)
    ]),
    {
      loading: 'Processing actions...',
      success: 'All actions completed!',
      error: 'Some actions failed'
    }
  );

  // Option 2: Use regular toasts for quick actions
  api.like(postId).then(() => toast.success('Post liked!'));
}}
```

### 2. **Memory Management**

```tsx
// For long-running operations, store the promise reference
const longOperation = useRef<Promise<any> | null>(null);

const handleLongOperation = () => {
  // Cancel previous operation if still running
  if (longOperation.current) {
    toast.dismiss(); // Clear any existing promise toasts
  }

  longOperation.current = toast.promise(heavyComputation(), {
    /* configuration */
  });
};
```

## 🎯 Best Practices

### 1. **Clear Loading Messages**

```tsx
// ❌ Vague
loading: 'Loading...';

// ✅ Specific
loading: 'Uploading your profile photo...';
loading: 'Saving draft to cloud...';
loading: 'Processing payment...';
```

### 2. **Helpful Success Messages**

```tsx
// ❌ Generic
success: 'Success!';

// ✅ Informative
success: (user) => `Welcome, ${user.name}! Your account is ready.`;
success: (result) => `${result.count} items synced successfully`;
```

### 3. **User-Friendly Error Messages**

```tsx
// ❌ Technical
error: (err) => `HTTP 500: ${err.stack}`;

// ✅ User-friendly
error: (err) => {
  if (err.code === 'NETWORK_ERROR') {
    return 'Check your internet connection and try again.';
  }
  return 'Something went wrong. Please try again.';
};
```

### 4. **Appropriate Icons**

```tsx
// File operations
icon: {
  type: 'bars';
}

// Network requests
icon: {
  type: 'spinner';
}

// Real-time sync
icon: {
  type: 'pulse';
}

// Messaging
icon: {
  type: 'dots';
}
```

## 🚀 Next Steps

Master promise integration with these advanced topics:

- **[Queue Management →](./queue-management)** - Handle multiple promises
- **[Custom Icons →](./custom-icons)** - Create custom loading animations
- **[Error Handling →](./error-handling)** - Robust error management
- **[Performance →](../examples/best-practices)** - Optimization strategies

---

**⚡ Promise integration transforms async operations** from boring loading spinners into delightful, informative experiences that keep users engaged!
