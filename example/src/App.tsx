import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { CustomIconComponent } from 'rn-tosty';
import { ToastProvider, useTheme, useTosty, variants } from 'rn-tosty';

// Mock API functions for promise examples
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

// Custom Heart Icon Component
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

// Theme Controls Component
const ThemeControls: React.FC = () => {
  const {
    currentTheme,
    themeName,
    isDark,
    isLight,
    isAuto,
    setMode,
    setTheme,
    toggle,
  } = useTheme();
  const { success } = useTosty();

  const styles = createControlsStyles(currentTheme.mode === 'dark');

  const handleThemeChange = (
    newTheme: 'default' | 'liquidGlass' | 'minimalist'
  ) => {
    setTheme(newTheme);
    success(`Switched to ${newTheme} theme!`, {
      duration: 2000,
    });
  };

  const handleModeChange = (mode: 'light' | 'dark' | 'auto') => {
    setMode(mode);
    success(`Switched to ${mode} mode!`, {
      duration: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 Dynamic Theme Controls</Text>
      <Text style={styles.subtitle}>
        Current: {themeName} ({currentTheme.mode} mode)
      </Text>

      {/* Theme Mode Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Mode</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.modeButton, isLight && styles.activeButton]}
            onPress={() => handleModeChange('light')}
          >
            <Text
              style={[styles.buttonText, isLight && styles.activeButtonText]}
            >
              ☀️ Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, isDark && styles.activeButton]}
            onPress={() => handleModeChange('dark')}
          >
            <Text
              style={[styles.buttonText, isDark && styles.activeButtonText]}
            >
              🌙 Dark
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, isAuto && styles.activeButton]}
            onPress={() => handleModeChange('auto')}
          >
            <Text
              style={[styles.buttonText, isAuto && styles.activeButtonText]}
            >
              🌗 Auto
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Theme Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Selection</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.themeButton,
              themeName === 'default' && styles.activeButton,
            ]}
            onPress={() => handleThemeChange('default')}
          >
            <Text
              style={[
                styles.buttonText,
                themeName === 'default' && styles.activeButtonText,
              ]}
            >
              🎯 Default
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.themeButton,
              themeName === 'liquidGlass' && styles.activeButton,
            ]}
            onPress={() => handleThemeChange('liquidGlass')}
          >
            <Text
              style={[
                styles.buttonText,
                themeName === 'liquidGlass' && styles.activeButtonText,
              ]}
            >
              💧 Glass
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.themeButton,
              themeName === 'minimalist' && styles.activeButton,
            ]}
            onPress={() => handleThemeChange('minimalist')}
          >
            <Text
              style={[
                styles.buttonText,
                themeName === 'minimalist' && styles.activeButtonText,
              ]}
            >
              ⚪ Minimal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Toggle */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggle}>
        <Text style={styles.toggleButtonText}>
          🔄 Quick Toggle (
          {isDark
            ? 'Switch to Light'
            : isLight
              ? 'Switch to Dark'
              : 'Toggle Mode'}
          )
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Main App Content
const AppContent: React.FC = () => {
  const { success, error, warning, info, promise, getQueueStats } = useTosty();
  const { currentTheme, themeName } = useTheme();

  const isDarkMode = currentTheme.mode === 'dark';
  const styles = createStyles(isDarkMode);

  // Register custom variants
  useEffect(() => {
    // NEW: Theme-aware variants that adapt to light/dark modes
    variants.registerThemeAware({
      name: 'adaptive-success-card',
      displayName: 'Adaptive Success Card',
      description: 'Custom success card that adapts to theme mode',
      light: {
        backgroundColor: '#E8F5E8',
        borderColor: '#4CAF50',
        borderWidth: 2,
        iconColor: '#2E7D32',
        textColor: '#1B5E20',
        titleColor: '#2E7D32',
      },
      dark: {
        backgroundColor: '#1A2E1A',
        borderColor: '#66BB6A',
        borderWidth: 2,
        iconColor: '#81C784',
        textColor: '#C8E6C9',
        titleColor: '#A5D6A7',
      },
      behavior: {
        defaultDuration: 6000,
      },
    });

    variants.registerThemeAware({
      name: 'adaptive-error-card',
      displayName: 'Adaptive Error Card',
      description: 'Custom error card that adapts to theme mode',
      light: {
        backgroundColor: '#FFEBEE',
        borderColor: '#F44336',
        borderWidth: 2,
        iconColor: '#D32F2F',
        textColor: '#B71C1C',
        titleColor: '#C62828',
      },
      dark: {
        backgroundColor: '#2E1A1A',
        borderColor: '#EF5350',
        borderWidth: 2,
        iconColor: '#FF8A80',
        textColor: '#FFCDD2',
        titleColor: '#FFAB91',
      },
      behavior: {
        defaultDuration: 5000,
      },
    });

    variants.registerThemeAware({
      name: 'adaptive-warning-card',
      displayName: 'Adaptive Warning Card',
      description: 'Custom warning card that adapts to theme mode',
      light: {
        backgroundColor: '#FFF8E1',
        borderColor: '#FF9800',
        borderWidth: 2,
        iconColor: '#F57C00',
        textColor: '#E65100',
        titleColor: '#F57C00',
      },
      dark: {
        backgroundColor: '#2E2A1A',
        borderColor: '#FFB74D',
        borderWidth: 2,
        iconColor: '#FFCC02',
        textColor: '#FFE0B2',
        titleColor: '#FFCC02',
      },
      behavior: {
        defaultDuration: 5000,
      },
    });

    variants.registerThemeAware({
      name: 'adaptive-info-card',
      displayName: 'Adaptive Info Card',
      description: 'Custom info card that adapts to theme mode',
      light: {
        backgroundColor: '#E3F2FD',
        borderColor: '#2196F3',
        borderWidth: 2,
        iconColor: '#1976D2',
        textColor: '#0D47A1',
        titleColor: '#1565C0',
      },
      dark: {
        backgroundColor: '#1A252E',
        borderColor: '#64B5F6',
        borderWidth: 2,
        iconColor: '#90CAF9',
        textColor: '#BBDEFB',
        titleColor: '#81C784',
      },
      behavior: {
        defaultDuration: 5000,
      },
    });

    // Theme-based style adaptation (auto-adapts using theme colors)
    variants.registerThemeAware({
      name: 'auto-adaptive',
      displayName: 'Auto Adaptive',
      description:
        'Automatically adapts to any theme using theme color references',
      style: {
        backgroundColor: 'surface',
        borderColor: 'border',
        borderWidth: 1,
        iconColor: 'primary',
        textColor: 'onSurface',
        titleColor: 'primary',
        borderRadius: 12,
        padding: 16,
      },
      behavior: {
        defaultDuration: 4000,
      },
    });
  }, []);

  // Demo functions
  const showToastExamples = () => {
    setTimeout(() => success('Operation completed successfully!'), 100);
    setTimeout(() => info("Here's some helpful information"), 800);
    setTimeout(() => warning('Please review your settings'), 1500);
    setTimeout(() => error('Something went wrong'), 2200);
  };

  const showThemeAwareExamples = () => {
    setTimeout(() => {
      success(`${isDarkMode ? '🌙 Dark' : '☀️ Light'} mode toast example!`, {
        duration: 3000,
      });
    }, 100);
    setTimeout(() => {
      info(`Theme: ${themeName} in ${currentTheme.mode} mode`, {
        duration: 3000,
      });
    }, 800);
    setTimeout(() => {
      warning(`Colors adapt automatically to ${currentTheme.mode} theme!`, {
        duration: 3000,
      });
    }, 1500);
  };

  const showCustomIconExamples = () => {
    setTimeout(
      () =>
        success('Custom Toast with custom icon', {
          icon: CustomHeartIcon,
        }),
      100
    );
    setTimeout(
      () =>
        warning('Custom Toast with icon on right', {
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
  };

  const showPromiseExamples = () => {
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
              message: 'Processing with error...',
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
      2500
    );
  };

  const showQueueManagementExamples = () => {
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

    setTimeout(() => {
      const stats = getQueueStats();
      setTimeout(() => {
        info(
          `Queue Demo: ${stats.visible} visible, ${stats.queued} queued, ${stats.total} total`,
          {
            duration: 6000,
            priority: 'urgent',
          }
        );
      }, 1000);
    }, 1000);
  };

  const showCustomVariantExamples = () => {
    info('Theme-aware variants adapt to your current theme!', {
      variant: 'auto-adaptive',
      duration: 3000,
    });

    setTimeout(
      () =>
        success('Adaptive success card', {
          variant: 'adaptive-success-card',
          duration: 5000,
        }),
      500
    );

    setTimeout(
      () =>
        error('Adaptive error card', {
          variant: 'adaptive-error-card',
          duration: 4500,
        }),
      1000
    );

    setTimeout(
      () =>
        warning('Adaptive warning card', {
          variant: 'adaptive-warning-card',
          duration: 4000,
        }),
      1500
    );

    setTimeout(
      () =>
        info('Adaptive info card', {
          variant: 'adaptive-info-card',
          duration: 4000,
        }),
      2000
    );
  };

  const showPositioningExamples = () => {
    setTimeout(
      () =>
        success('Top positioned toast', {
          variant: 'adaptive-success-card',
          position: 'top',
        }),
      100
    );
    setTimeout(
      () =>
        info('Bottom positioned toast', {
          variant: 'adaptive-success-card',
          position: 'bottom',
        }),
      1200
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🍞 RN-Tosty</Text>
          <Text style={styles.subtitle}>
            Beautiful toast notifications for React Native with dynamic themes
          </Text>
          <Text style={styles.description}>
            Try the theme controls below and watch how both the app and toasts
            change instantly!
          </Text>
        </View>

        {/* Theme Controls */}
        <ThemeControls />

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>
              • 3 Beautiful themes with light/dark variants
            </Text>
            <Text style={styles.featureItem}>
              • Dynamic theme switching without reload
            </Text>
            <Text style={styles.featureItem}>
              • Auto system appearance detection
            </Text>
            <Text style={styles.featureItem}>• 15+ Toast variants</Text>
            <Text style={styles.featureItem}>• Progress bar support</Text>
            <Text style={styles.featureItem}>
              • Smart positioning & queue management
            </Text>
            <Text style={styles.featureItem}>• Promise toast support</Text>
            <Text style={styles.featureItem}>• Custom icons & layouts</Text>
            <Text style={styles.featureItem}>• Full TypeScript support</Text>
          </View>
        </View>

        {/* Interactive Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Interactive Examples</Text>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showToastExamples}
          >
            <Text style={styles.demoButtonText}>🎨 Show Toast Types</Text>
            <Text style={styles.demoButtonSubtext}>
              Success, Info, Warning, Error
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showThemeAwareExamples}
          >
            <Text style={styles.demoButtonText}>🌗 Theme-Aware Examples</Text>
            <Text style={styles.demoButtonSubtext}>
              Toasts that show current theme mode
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showCustomIconExamples}
          >
            <Text style={styles.demoButtonText}>💝 Custom Icon Examples</Text>
            <Text style={styles.demoButtonSubtext}>
              Custom heart icon with layouts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showLayoutExamples}
          >
            <Text style={styles.demoButtonText}>📐 Layout Examples</Text>
            <Text style={styles.demoButtonSubtext}>
              Icon positioning & text alignment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showPromiseExamples}
          >
            <Text style={styles.demoButtonText}>⏳ Promise Examples</Text>
            <Text style={styles.demoButtonSubtext}>
              Loading states with success/error handling
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showQueueManagementExamples}
          >
            <Text style={styles.demoButtonText}>📋 Queue Management</Text>
            <Text style={styles.demoButtonSubtext}>
              Priority handling & queue statistics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showCustomVariantExamples}
          >
            <Text style={styles.demoButtonText}>🎯 Custom Variants</Text>
            <Text style={styles.demoButtonSubtext}>
              Custom styled toast cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={showPositioningExamples}
          >
            <Text style={styles.demoButtonText}>📍 Positioning Examples</Text>
            <Text style={styles.demoButtonSubtext}>
              Top and bottom positioning
            </Text>
          </TouchableOpacity>
        </View>

        {/* Usage Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Usage Examples</Text>

          <Text style={styles.subsectionTitle}>
            Basic Usage with Dynamic Themes
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { useTosty, useTheme } from 'rn-tosty';

const { success, error, warning, info } = useTosty();
const { setTheme, setMode, toggle, isDark } = useTheme();

// Show theme-aware toast
success(\`Hello from \${isDark ? 'dark' : 'light'} mode!\`);

// Change theme dynamically
setTheme('liquidGlass', 'dark');

// Change mode only
setMode('auto'); // follows system appearance

// Quick toggle
toggle(); // switches between light/dark`}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>Theme-Aware Variants</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { variants } from 'rn-tosty';

// Register theme-aware variants with separate light/dark styles
variants.registerThemeAware({
  name: 'adaptive-success',
  light: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    textColor: '#1B5E20',
    iconColor: '#2E7D32',
  },
  dark: {
    backgroundColor: '#1A2E1A',
    borderColor: '#66BB6A',
    textColor: '#C8E6C9',
    iconColor: '#81C784',
  },
  behavior: { defaultDuration: 5000 },
});

// Register auto-adapting variants using theme colors
variants.registerThemeAware({
  name: 'auto-adaptive',
  style: {
    backgroundColor: 'surface',    // Uses theme's surface color
    borderColor: 'border',         // Uses theme's border color
    textColor: 'onSurface',        // Uses theme's onSurface color
    iconColor: 'primary',          // Uses theme's primary color
  }
});`}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>Theme Configuration</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { ToastProvider } from 'rn-tosty';

<ToastProvider 
  theme="${themeName}" 
  initialMode="auto"
  followSystemAppearance={true}
>
  <YourApp />
</ToastProvider>

// Theme automatically switches between light/dark
// based on system appearance or user preference`}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>Advanced Features</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Promise toasts
const { promise } = useTosty();

promise(apiCall(), {
  loading: 'Processing...',
  success: (data) => \`Success: \${data.message}\`,
  error: (err) => \`Error: \${err.message}\`
});

// Theme-aware custom variants
success('Adaptive success toast', {
  variant: 'adaptive-success-card',
  duration: 5000,
  priority: 'high'
});

// Auto-adapting variants using theme colors
info('Auto-adaptive toast', {
  variant: 'auto-adaptive',
  duration: 4000
});

// Custom layouts
warning('Custom layout', {
  layout: {
    iconPosition: 'right',
    textAlignment: 'center',
    spacing: 'spacious'
  }
});`}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎉 Enjoy using RN-Tosty with dynamic themes!
          </Text>
          <Text style={styles.footerSubtext}>
            Built with ❤️ for React Native developers
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        theme="default"
        initialMode="auto"
        followSystemAppearance={true}
      >
        <AppContent />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

// Styles
const createControlsStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      margin: 24,
      padding: 24,
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDarkMode ? 0 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
    },
    modeButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: isDarkMode ? '#374151' : '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      alignItems: 'center',
    },
    themeButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: isDarkMode ? '#374151' : '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: isDarkMode ? '#3B82F6' : '#3B82F6',
      borderColor: isDarkMode ? '#60A5FA' : '#2563EB',
    },
    buttonText: {
      fontSize: 12,
      fontWeight: '500',
      color: isDarkMode ? '#D1D5DB' : '#374151',
      textAlign: 'center',
    },
    activeButtonText: {
      color: '#ffffff',
      fontWeight: '600',
    },
    toggleButton: {
      backgroundColor: isDarkMode ? '#059669' : '#10B981',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 8,
    },
    toggleButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '600',
    },
  });

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 32,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      textAlign: 'center',
      lineHeight: 24,
    },
    section: {
      padding: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
    },
    subsectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
      marginTop: 16,
    },
    featureList: {
      gap: 8,
    },
    featureItem: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      lineHeight: 24,
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
      marginBottom: 16,
    },
    codeText: {
      fontFamily: 'Courier',
      fontSize: 13,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      lineHeight: 18,
    },
    footer: {
      padding: 32,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    footerSubtext: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
  });
