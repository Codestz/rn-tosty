import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useToast, variants, type CustomIconComponent } from 'rn-tosty';

type ThemeName = 'default' | 'liquidGlass' | 'minimalist';

interface ThemeDemoProps {
  theme: ThemeName;
}

const mockApiError = (delay: number = 2000): Promise<never> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network error occurred')), delay)
  );

const mockApiSuccess = (
  delay: number = 2000
): Promise<{ id: number; name: string }> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), delay)
  );

const CustomHeartIcon: CustomIconComponent = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'black', fontSize: size * 0.6 }}>♥</Text>
    </View>
  );
};

export const ThemeDemo: React.FC<ThemeDemoProps> = ({ theme }) => {
  const { success, error, warning, info, promise, getQueueStats } = useToast();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const getThemeInfo = () => {
    switch (theme) {
      case 'liquidGlass':
        return {
          title: '💧 Liquid Glass Theme',
          description:
            'Inspired by iOS 26 fluid design language with translucent glass-like effects',
          features: [
            'Translucent backgrounds',
            'iOS-inspired colors',
            'Fluid animations',
            'Glass blur effects',
          ],
        };
      case 'minimalist':
        return {
          title: '⚪ Minimalist Theme',
          description:
            'Clean, simple design focused on content with minimal visual distractions',
          features: [
            'Clean typography',
            'Subtle colors',
            'Minimal shadows',
            'Content-focused',
          ],
        };
      default:
        return {
          title: '🎯 Default Theme',
          description:
            'Clean, contemporary design perfect for most applications',
          features: [
            'Modern colors',
            'Balanced spacing',
            'Versatile design',
            'Great defaults',
          ],
        };
    }
  };

  useEffect(() => {
    // Example 1: Simple custom variant extending an existing one
    variants.registerCustom({
      name: 'my-success-card',
      extends: 'default',
      displayName: 'My Success Card',
      description: 'Custom success card with brand colors',
      style: {
        backgroundColor: '#E8F5E8', // Light green background
        borderColor: '#4CAF50',
        borderWidth: 2,
        iconColor: '#2E7D32',
        textColor: '#1B5E20',
        titleColor: '#2E7D32',
      },
      behavior: {
        defaultDuration: 6000,
      },
    });

    variants.registerCustom({
      name: 'my-error-card',
      extends: 'error-filled',
      displayName: 'My Error Card',
      description: 'Custom error card with brand colors',
      style: {
        backgroundColor: '#F8D7DA',
        borderColor: '#F5C6CB',
        borderWidth: 2,
        iconColor: '#721C24',
        textColor: '#721C24',
        titleColor: '#721C24',
      },
    });

    variants.registerCustom({
      name: 'my-warning-card',
      extends: 'warning-filled',
      displayName: 'My Warning Card',
      description: 'Custom warning card with brand colors',
      style: {
        backgroundColor: '#FFF3CD',
        borderColor: '#FFEEBA',
        borderWidth: 2,
        iconColor: '#856404',
        textColor: '#856404',
        titleColor: '#856404',
      },
    });

    variants.registerCustom({
      name: 'my-info-card',
      extends: 'info-filled',
      displayName: 'My Info Card',
      description: 'Custom info card with brand colors',
      style: {
        backgroundColor: '#E3F2FD',
        borderColor: '#BBDEFB',
        borderWidth: 2,
        iconColor: '#1565C0',
        textColor: '#1565C0',
        titleColor: '#1565C0',
      },
    });
  }, []);

  const themeInfo = getThemeInfo();

  const showToastExamples = () => {
    // Show different toast types with a delay between each
    setTimeout(() => success('Operation completed successfully!'), 100);
    setTimeout(() => info("Here's some helpful information"), 800);
    setTimeout(() => warning('Please review your settings'), 1500);
    setTimeout(() => error('Something went wrong'), 2200);
  };

  const showCustomIconExamples = () => {
    setTimeout(
      () =>
        success('Custom Toast with custom icon and left alignment', {
          icon: CustomHeartIcon,
        }),
      100
    );
    setTimeout(
      () =>
        warning('Custom Toast with custom icon and right alignment', {
          icon: CustomHeartIcon,
          layout: { iconPosition: 'right', textAlignment: 'left' },
        }),
      1000
    );
  };

  const showLayoutExamples = () => {
    setTimeout(
      () =>
        success('Icon on the right side', {
          layout: { iconPosition: 'right' },
        }),
      100
    );
    setTimeout(
      () =>
        info('Centered text alignment', {
          layout: { textAlignment: 'center' },
        }),
      700
    );
    setTimeout(
      () =>
        warning('Compact spacing layout', {
          layout: { spacing: 'compact' },
        }),
      1400
    );
    setTimeout(
      () =>
        error('Spacious layout with right icon', {
          layout: {
            iconPosition: 'right',
            spacing: 'spacious',
            textAlignment: 'right',
          },
        }),
      2100
    );
  };

  const showPromiseExamples = () => {
    // Promise with default layout
    setTimeout(
      () =>
        promise(mockApiSuccess(), {
          loading: {
            message: 'Processing payment...',
            icon: { type: 'spinner', size: 'large' },
          },
          success: (data) => `Data loaded successfully: ${data.name}`,
          error: (err) => `Error loading data: ${err.message}`,
        }),
      100
    );

    setTimeout(
      () =>
        promise<{ id: number; name: string }>(
          mockApiError(),
          {
            loading: {
              message: 'Processing payment custom layout...',
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
        ),
      100
    );
  };

  const showQueueManagementExamples = () => {
    // Show queue stats before
    const statsBefore = getQueueStats();
    console.log('Queue stats before:', statsBefore);

    // Rapid fire toasts to demonstrate queue management
    for (let i = 1; i <= 8; i++) {
      setTimeout(() => {
        const priority =
          i <= 2 ? 'urgent' : i <= 4 ? 'high' : i <= 6 ? 'medium' : 'low';
        success(`Toast ${i} - Priority: ${priority}`, {
          priority: priority as any,
          duration: 4000,
        });
      }, i * 100);
    }

    // Show queue stats after
    setTimeout(() => {
      const statsAfter = getQueueStats();
      console.log('Queue stats after:', statsAfter);

      // Show a summary toast
      setTimeout(() => {
        info(
          `Queue Demo: ${statsAfter.visible} visible, ${statsAfter.queued} queued, ${statsAfter.total} total`,
          {
            duration: 6000,
            priority: 'urgent',
          }
        );
      }, 1000);
    }, 1000);
  };

  const showPriorityExamples = () => {
    // Show different priority toasts
    setTimeout(() => error('Low priority error', { priority: 'low' }), 100);
    setTimeout(
      () => warning('Medium priority warning', { priority: 'medium' }),
      200
    );
    setTimeout(() => info('High priority info', { priority: 'high' }), 300);
    setTimeout(() => success('Urgent success!', { priority: 'urgent' }), 400);
  };

  const showMergeStrategyExamples = () => {
    // Show duplicate messages to demonstrate merge strategy
    setTimeout(() => success('Duplicate message test'), 100);
    setTimeout(() => success('Duplicate message test'), 200);
    setTimeout(() => success('Duplicate message test'), 300);
    setTimeout(() => info('Similar message test'), 400);
    setTimeout(() => info('Similar message test'), 500);
  };

  const showPositioningExamples = () => {
    setTimeout(
      () =>
        success('Top positioned toast', {
          variant: 'default',
          position: 'top',
        }),
      100
    );
    setTimeout(
      () =>
        info('Bottom positioned toast', {
          variant: 'default',
          position: 'bottom',
        }),
      1200
    );
  };

  const showCustomVariantExamples = () => {
    setTimeout(
      () =>
        success('Custom success card', {
          variant: 'my-success-card',
        }),
      100
    );
    setTimeout(
      () =>
        error('Custom error card', {
          variant: 'my-error-card',
        }),
      700
    );
    setTimeout(
      () =>
        warning('Custom warning card', {
          variant: 'my-warning-card',
        }),
      1400
    );
    setTimeout(
      () =>
        info('Custom info card', {
          variant: 'my-info-card',
        }),
      2100
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{themeInfo.title}</Text>
        <Text style={styles.description}>{themeInfo.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        {themeInfo.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureBullet}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Examples</Text>

        <TouchableOpacity style={styles.demoButton} onPress={showToastExamples}>
          <Text style={styles.demoButtonText}>🎨 Show Toast Types</Text>
          <Text style={styles.demoButtonSubtext}>
            Success, Info, Warning, Error
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showCustomIconExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Custom Icon</Text>
          <Text style={styles.demoButtonSubtext}>Custom heart icon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showLayoutExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Layout</Text>
          <Text style={styles.demoButtonSubtext}>Icon positioning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showPromiseExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Promise Layout</Text>
          <Text style={styles.demoButtonSubtext}>
            Promise toasts with custom layouts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showQueueManagementExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Queue Management</Text>
          <Text style={styles.demoButtonSubtext}>
            Queue stats and management
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showPriorityExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Priority</Text>
          <Text style={styles.demoButtonSubtext}>
            Different priority toasts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showMergeStrategyExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Merge Strategy</Text>
          <Text style={styles.demoButtonSubtext}>
            Duplicate and similar message handling
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showCustomVariantExamples}
        >
          <Text style={styles.demoButtonText}>🎨 Show Custom Variant</Text>
          <Text style={styles.demoButtonSubtext}>Custom success card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={showPositioningExamples}
        >
          <Text style={styles.demoButtonText}>📍 Show Positioning</Text>
          <Text style={styles.demoButtonSubtext}>
            Top and bottom positioning
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Example</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`import { useToast } from 'rn-tosty';

const { success } = useToast();

success('Hello World!', {
  variant: 'default',
  duration: 3000,
  progressBar: { enabled: true },
  position: 'top'
});`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Queue Management Usage</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`import { ToastProvider, QueuePresets } from 'rn-tosty';

// Configure queue management
<ToastProvider 
  theme={Themes.${theme}}
  config={{
    queue: QueuePresets.default(), // or conservative(), aggressive(), etc.
    // Or custom configuration:
    // queue: {
    //   maxVisible: 3,
    //   maxSize: 10,
    //   priorityOrdering: true,
    //   mergeStrategy: 'similar',
    //   overflowStrategy: 'dismiss-oldest'
    // }
  }}
>
  <YourApp />
</ToastProvider>

// Use priority in your toasts
const { success, getQueueStats } = useToast();

success('High priority message', { 
  priority: 'high',
  duration: 5000 
});

// Check queue statistics
const stats = getQueueStats();
console.log(\`\${stats.visible} visible, \${stats.queued} queued\`);`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Configuration</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`import { ToastProvider, Themes } from 'rn-tosty';

<ToastProvider theme={Themes.${theme}}>
  <YourApp />
</ToastProvider>`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    header: {
      padding: 32,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      lineHeight: 24,
    },
    section: {
      padding: 32,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureBullet: {
      fontSize: 16,
      color: isDarkMode ? '#60A5FA' : '#3B82F6',
      marginRight: 12,
      fontWeight: 'bold',
    },
    featureText: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      flex: 1,
    },
    demoButton: {
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
      padding: 20,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    demoButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    demoButtonSubtext: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    codeBlock: {
      backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#374151' : '#D1D5DB',
    },
    codeText: {
      fontFamily: 'Courier',
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      lineHeight: 20,
    },
  });
