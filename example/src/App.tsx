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

import {
  Themes,
  ToastProvider,
  useToast,
  VerticalOffsetPresets,
} from 'rn-tosty';

function ToastDemo(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { success, error, info, warning, promise, custom } = useToast();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    flex: 1,
  };

  const showSuccessToast = () => {
    success('Profile updated successfully! 🎉', { position: 'top' });
  };

  const showErrorToast = () => {
    error('Failed to save changes. Please try again.', { position: 'bottom' });
  };

  const showInfoToast = () => {
    info('New message from John Doe', { position: 'smart' });
  };

  const showWarningToast = () => {
    warning('Your session will expire in 5 minutes', { position: 'top' });
  };

  const showPromiseToast = () => {
    const promiseToResolve = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
      }, 2000);
    });

    promise(
      promiseToResolve,
      {
        loading: 'Saving your changes...',
        success: 'Changes saved successfully!',
        error: 'Failed to save changes',
      },
      { position: 'bottom' }
    );
  };

  const showCustomToast = () => {
    custom({
      title: 'Custom Toast',
      message: 'This toast uses smart positioning with custom vertical offsets',
      type: 'info',
      duration: 5000,
      position: 'smart',
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
          With Custom Vertical Spacing
        </Text>

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccessToast}
          >
            <Text style={styles.buttonText}>✅ Success (Top)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showErrorToast}
          >
            <Text style={styles.buttonText}>❌ Error (Bottom)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfoToast}
          >
            <Text style={styles.buttonText}>ℹ️ Info (Smart)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showWarningToast}
          >
            <Text style={styles.buttonText}>⚠️ Warning (Top)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.promiseButton]}
            onPress={showPromiseToast}
          >
            <Text style={styles.buttonText}>⏳ Promise (Bottom)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showCustomToast}
          >
            <Text style={styles.buttonText}>🎛️ Custom (Smart)</Text>
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
    marginBottom: 40,
    fontStyle: 'italic',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    minWidth: '45%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider
          theme={Themes.professional}
          config={{
            verticalOffset: VerticalOffsetPresets.custom(-20, -20, -20),
          }}
        >
          <ToastDemo />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
