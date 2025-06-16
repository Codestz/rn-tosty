import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { BaseIconProps, CustomIconComponent } from 'rn-tosty';
import {
  createIconConfig,
  Themes,
  ToastLayoutPresets,
  ToastLoadingIcon,
  ToastProvider,
  useToast,
} from 'rn-tosty';

// Mock API functions for testing promise toasts
const mockApiSuccess = (
  delay: number = 2000
): Promise<{ id: number; name: string }> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), delay)
  );

const mockApiError = (delay: number = 2000): Promise<never> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network error occurred')), delay)
  );

// Custom Heart Icon Component
const CustomHeartIcon: CustomIconComponent = ({
  size,
  color,
}: BaseIconProps) => {
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

// Custom Star Icon Component
const CustomStarIcon: CustomIconComponent = ({
  size,
  color,
}: BaseIconProps) => {
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
      <Text style={{ color: 'white', fontSize: size * 0.6 }}>⭐</Text>
    </View>
  );
};

// Custom Rocket Icon Component
const CustomRocketIcon: CustomIconComponent = ({
  size,
  color,
}: BaseIconProps) => {
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
      <Text style={{ color: 'white', fontSize: size * 0.6 }}>🚀</Text>
    </View>
  );
};

// Custom Loading Icon using ToastLoadingIcon
const CustomSpinnerIcon: CustomIconComponent = ({ size, color, theme }) => {
  return (
    <ToastLoadingIcon
      type="spinner"
      size={size}
      color={color}
      theme={theme}
      animated={true}
    />
  );
};

const CustomDotsIcon: CustomIconComponent = ({ size, color, theme }) => {
  return (
    <ToastLoadingIcon
      type="dots"
      size={size}
      color={color}
      theme={theme}
      animated={true}
    />
  );
};

function ToastDemo(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { success, error, info, warning, promise } = useToast();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    flex: 1,
  };

  // Global icon configuration examples
  const showGlobalHeartIcon = () => {
    success('Using global heart icon configuration!', {
      position: 'top',
      variant: 'styled',
      title: 'Global Icon',
    });
  };

  const showDefaultErrorIcon = () => {
    error('Using default error icon', {
      position: 'bottom',
      variant: 'styled',
      title: 'Default Icon',
    });
  };

  // Per-toast icon override examples
  const showCustomStarIcon = () => {
    success('This success toast uses a custom star icon!', {
      title: 'Custom Star Icon',
      position: 'top',
      variant: 'styled',
      icon: CustomStarIcon, // Override the global heart icon
    });
  };

  const showCustomRocketIcon = () => {
    error('This error toast uses a rocket icon instead!', {
      title: 'Custom Rocket Icon',
      position: 'center',
      variant: 'styled',
      icon: CustomRocketIcon, // Override the default error icon
    });
  };

  const showNoIcon = () => {
    info('This toast has no icon at all', {
      title: 'No Icon',
      position: 'bottom',
      variant: 'styled',
      icon: false, // Disable icon for this toast
    });
  };

  const showIconWithCustomConfig = () => {
    warning('Custom icon with large size and no animation', {
      title: 'Custom Config',
      position: 'smart',
      variant: 'styled',
      icon: {
        component: CustomStarIcon,
        size: 'large',
        animated: false,
        color: '#FFD700', // Gold color
      },
    });
  };

  // Loading icon examples
  const showSpinnerLoadingIcon = () => {
    info('Loading with spinner animation', {
      title: 'Spinner Loading',
      position: 'top',
      variant: 'styled',
      icon: CustomSpinnerIcon,
      duration: 5000,
    });
  };

  const showDotsLoadingIcon = () => {
    info('Loading with dots animation', {
      title: 'Dots Loading',
      position: 'center',
      variant: 'styled',
      icon: CustomDotsIcon,
      duration: 5000,
    });
  };

  const showBarsLoadingIcon = () => {
    info('Loading with bars animation', {
      title: 'Bars Loading',
      position: 'bottom',
      variant: 'styled',
      icon: ({ size, color, theme }) => (
        <ToastLoadingIcon
          type="bars"
          size={size}
          color={color}
          theme={theme}
          animated={true}
        />
      ),
      duration: 5000,
    });
  };

  const showPulseLoadingIcon = () => {
    info('Loading with pulse animation', {
      title: 'Pulse Loading',
      position: 'smart',
      variant: 'styled',
      icon: ({ size, color, theme }) => (
        <ToastLoadingIcon
          type="pulse"
          size={size}
          color={color}
          theme={theme}
          animated={true}
        />
      ),
      duration: 5000,
    });
  };

  // Enhanced Promise API examples
  const handleBasicPromise = () => {
    promise(mockApiSuccess(), {
      loading: 'Saving user...',
      success: 'User saved successfully!',
      error: 'Failed to save user',
    });
  };

  const handleBasicPromiseError = () => {
    promise(mockApiError(), {
      loading: 'Deleting user...',
      success: 'User deleted successfully!',
      error: 'Failed to delete user',
    });
  };

  const handleEnhancedPromise = () => {
    promise(mockApiSuccess(), {
      loading: {
        message: 'Processing payment...',
        icon: { type: 'spinner', size: 'large' },
      },
      success: (data: { id: number; name: string }) => ({
        message: `Payment processed for ${data.name}!`,
        title: 'Success',
      }),
      error: {
        message: 'Payment failed. Please try again.',
        title: 'Error',
      },
    });
  };

  const handleDotsAnimation = () => {
    promise(mockApiSuccess(3000), {
      loading: {
        title: 'Uploading files...',
        message: 'Waiting for files to upload...',
        icon: { type: 'dots', size: 'medium' },
      },
      success: 'Files uploaded successfully!',
      error: 'Upload failed',
    });
  };

  const handleBarsAnimation = () => {
    promise(mockApiSuccess(3000), {
      loading: {
        message: 'Analyzing data...',
        icon: { type: 'bars', size: 'medium' },
      },
      success: 'Analysis complete!',
      error: 'Analysis failed',
    });
  };

  const handlePulseAnimation = () => {
    promise(mockApiSuccess(3000), {
      loading: {
        message: 'Syncing data...',
        icon: { type: 'pulse', size: 'medium' },
      },
      success: 'Data synced successfully!',
      error: 'Sync failed',
    });
  };

  const handleCustomConfig = () => {
    promise(
      mockApiSuccess(4000),
      {
        loading: {
          message: 'Generating report...',
          title: 'Please wait',
          icon: { type: 'spinner', size: 'large' },
        },
        success: {
          message: 'Report generated successfully!',
          title: 'Success',
        },
        error: {
          message: 'Failed to generate report',
          title: 'Error',
        },
      },
      {
        position: 'center',
      }
    );
  };

  const handleDynamicMessages = () => {
    promise(mockApiSuccess(), {
      loading: 'Loading user data...',
      success: (data: { id: number; name: string }) =>
        `Welcome back, ${data.name}!`,
      error: (error: Error) => `Error: ${error.message}`,
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}
        >
          🍞 rn-tosty
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: isDarkMode ? '#cccccc' : '#666666' },
          ]}
        >
          Icons + Loading Animations + Enhanced Promise API
        </Text>

        {/* Global Icon Configuration */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🌍 Global Icon Configuration
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showGlobalHeartIcon}
          >
            <Text style={styles.buttonText}>♥ Global Heart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showDefaultErrorIcon}
          >
            <Text style={styles.buttonText}>❌ Default Error</Text>
          </TouchableOpacity>
        </View>

        {/* Per-Toast Icon Overrides */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🎯 Per-Toast Icon Overrides
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showCustomStarIcon}
          >
            <Text style={styles.buttonText}>⭐ Custom Star</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showCustomRocketIcon}
          >
            <Text style={styles.buttonText}>🚀 Custom Rocket</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Animations */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🔄 Loading Animations
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showSpinnerLoadingIcon}
          >
            <Text style={styles.buttonText}>🌀 Spinner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showDotsLoadingIcon}
          >
            <Text style={styles.buttonText}>⚫ Dots</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showBarsLoadingIcon}
          >
            <Text style={styles.buttonText}>📊 Bars</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showPulseLoadingIcon}
          >
            <Text style={styles.buttonText}>💫 Pulse</Text>
          </TouchableOpacity>
        </View>

        {/* Advanced Icon Configuration */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          ⚙️ Advanced Configuration
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showNoIcon}
          >
            <Text style={styles.buttonText}>🚫 No Icon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showIconWithCustomConfig}
          >
            <Text style={styles.buttonText}>⚙️ Custom Config</Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Promise API Examples */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🚀 Enhanced Promise API
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleBasicPromise}
          >
            <Text style={styles.buttonText}>✅ Basic Success</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleBasicPromiseError}
          >
            <Text style={styles.buttonText}>❌ Basic Error</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleEnhancedPromise}
          >
            <Text style={styles.buttonText}>💳 Enhanced</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleDynamicMessages}
          >
            <Text style={styles.buttonText}>🔄 Dynamic</Text>
          </TouchableOpacity>
        </View>

        {/* Promise Loading Animations */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🎬 Promise Loading Animations
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleDotsAnimation}
          >
            <Text style={styles.buttonText}>⚫ Dots</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleBarsAnimation}
          >
            <Text style={styles.buttonText}>📊 Bars</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handlePulseAnimation}
          >
            <Text style={styles.buttonText}>💫 Pulse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={handleCustomConfig}
          >
            <Text style={styles.buttonText}>⚙️ Custom</Text>
          </TouchableOpacity>
        </View>

        {/* Original Promise Example */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🔄 Original Promise Example
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={() => {
              const promiseToResolve = new Promise((resolve, reject) => {
                setTimeout(() => {
                  Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
                }, 2000);
              });

              promise(
                promiseToResolve,
                {
                  loading: 'Processing...',
                  success: 'Done!',
                  error: 'Failed!',
                },
                {
                  position: 'bottom',
                }
              );
            }}
          >
            <Text style={styles.buttonText}>⏳ Random Promise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  errorButton: {
    backgroundColor: '#EF4444',
  },
  infoButton: {
    backgroundColor: '#3B82F6',
  },
  warningButton: {
    backgroundColor: '#F59E0B',
  },
  promiseButton: {
    backgroundColor: '#8B5CF6',
  },
  customButton: {
    backgroundColor: '#6B7280',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider
          theme={Themes.professional}
          config={{
            defaultVariant: 'auto', // Let the system decide
            layout: ToastLayoutPresets.iconRight(),
            icons: createIconConfig.withCustomIcons({
              success: CustomHeartIcon,
            }),
          }}
        >
          <ToastDemo />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
