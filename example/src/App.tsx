import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { CustomIconComponent } from 'rn-tosty';
import { ToastProvider, useTheme, useTosty, variants } from 'rn-tosty';

const { width } = Dimensions.get('window');

// Mock API functions for promise examples
const mockApiSuccess = (
  delay: number = 2000
): Promise<{ id: number; name: string; status: string }> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ id: 1, name: 'Alex Chen', status: 'Premium User' }),
      delay
    )
  );

const mockApiError = (
  delay: number = 2000
): Promise<{ id: number; name: string; status: string }> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network connection failed')), delay)
  );

// Custom Icon Components
const HeartIcon: CustomIconComponent = ({ size, color }) => (
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

const StarIcon: CustomIconComponent = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color, fontSize: size * 0.8 }}>★</Text>
  </View>
);

// Enhanced Theme Controls with beautiful UI
const ThemeShowcase: React.FC = () => {
  const { currentTheme, themeName, setTheme, setMode, isDark } = useTheme();
  const { success, info } = useTosty();

  // Create animated values for theme transitions
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const themes = [
    {
      key: 'default',
      name: 'Default',
      emoji: '🎯',
      description: 'Clean & Modern',
    },
    {
      key: 'warmSunset',
      name: 'Warm Sunset',
      emoji: '🌅',
      description: 'Cozy & Warm',
    },
    {
      key: 'oceanBreeze',
      name: 'Ocean Breeze',
      emoji: '🌊',
      description: 'Calm & Flowing',
    },
    {
      key: 'forestGlow',
      name: 'Forest Glow',
      emoji: '🌲',
      description: 'Natural & Earthy',
    },
  ] as const;

  const handleThemeChange = (newTheme: (typeof themes)[number]['key']) => {
    // Animate theme transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTheme(newTheme);
    success(
      `🎨 Switched to ${themes.find((t) => t.key === newTheme)?.name} theme!`,
      {
        duration: 2500,
      }
    );
  };

  const handleModeToggle = () => {
    const newMode = isDark ? 'light' : 'dark';
    setMode(newMode);
    info(`${newMode === 'dark' ? '🌙' : '☀️'} Switched to ${newMode} mode`, {
      duration: 2000,
    });
  };

  // Create theme-aware styles
  const styles = createShowcaseStyles(currentTheme);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🍞 RN-Tosty Showcase</Text>
        <Text style={styles.subtitle}>
          Experience the magic of dynamic theming
        </Text>
      </View>

      {/* Current Theme Display */}
      <View style={styles.currentThemeCard}>
        <Text style={styles.currentThemeEmoji}>
          {themes.find((t) => t.key === themeName)?.emoji}
        </Text>
        <View style={styles.currentThemeInfo}>
          <Text style={styles.currentThemeName}>
            {themes.find((t) => t.key === themeName)?.name}
          </Text>
          <Text style={styles.currentThemeMode}>
            {currentTheme.mode} mode •{' '}
            {themes.find((t) => t.key === themeName)?.description}
          </Text>
        </View>
        <TouchableOpacity style={styles.modeToggle} onPress={handleModeToggle}>
          <Text style={styles.modeToggleText}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Selection Grid */}
      <Text style={styles.sectionTitle}>Choose Your Experience</Text>
      <View style={styles.themeGrid}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.key}
            style={[
              styles.themeCard,
              themeName === theme.key && styles.activeThemeCard,
            ]}
            onPress={() => handleThemeChange(theme.key)}
          >
            <Text style={styles.themeEmoji}>{theme.emoji}</Text>
            <Text
              style={[
                styles.themeName,
                themeName === theme.key && styles.activeThemeName,
              ]}
            >
              {theme.name}
            </Text>
            <Text
              style={[
                styles.themeDescription,
                themeName === theme.key && styles.activeThemeDescription,
              ]}
            >
              {theme.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

// Interactive Demo Section
const InteractiveDemos: React.FC = () => {
  const { success, error, warning, info, promise, getQueueStats, custom } =
    useTosty();
  const { currentTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const demos = [
    {
      id: 'types',
      title: 'Toast Types',
      emoji: '🎭',
      description: 'All toast types',
      action: () => {
        setTimeout(() => success('✅ Success toast with current theme!'), 100);
        setTimeout(() => info('💡 Info toast adapts to your theme'), 600);
        setTimeout(() => warning('⚠️ Warning toast matches perfectly'), 1200);
        setTimeout(() => error('❌ Error toast in theme colors'), 1800);
      },
    },
    {
      id: 'custom',
      title: 'Custom Icons',
      emoji: '🎨',
      description: 'Beautiful icons',
      action: () => {
        setTimeout(() => success('Love this theme!', { icon: HeartIcon }), 100);
        setTimeout(
          () => warning('You deserve a star!', { icon: StarIcon }),
          800
        );
      },
    },
    {
      id: 'layouts',
      title: 'Smart Layouts',
      emoji: '📐',
      description: 'Flexible positioning',
      action: () => {
        setTimeout(
          () =>
            success('Icon on right side', {
              layout: { iconPosition: 'right' },
            }),
          100
        );
        setTimeout(
          () =>
            info('Centered text looks great', {
              layout: { textAlignment: 'center' },
            }),
          800
        );
      },
    },
    {
      id: 'promise',
      title: 'Promise Magic',
      emoji: '⚡',
      description: 'Loading states',
      action: () => {
        promise(mockApiSuccess(2000), {
          loading: {
            icon: { type: 'bars' },
            message: 'Loading...',
          },
          success: (data) => `Welcome ${data.name}! (${data.status})`,
          error: (err) => `Failed: ${err.message}`,
        });

        setTimeout(
          () =>
            promise<{ id: number; name: string }>(
              mockApiError(),
              {
                loading: {
                  message: 'Loading...',
                  icon: { type: 'spinner', size: 'large' },
                },
                success: (data) =>
                  `Data loaded successfully: ${data?.name ?? ''}`,
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
          700
        );
      },
    },
    {
      id: 'positions',
      title: 'Positioning',
      emoji: '📍',
      description: 'Top & bottom',
      action: () => {
        setTimeout(
          () => success('Top toast with theme!', { position: 'top' }),
          100
        );
        setTimeout(
          () => info('Bottom toast matches!', { position: 'bottom' }),
          1000
        );
      },
    },
    {
      id: 'queue',
      title: 'Queue Management',
      emoji: '👥',
      description: 'Manage multiple toasts',
      action: () => {
        // Show queue stats before
        const statsBefore = getQueueStats();
        // Log queue stats for debugging (only in development)
        if (__DEV__) {
          console.log('Queue stats before:', statsBefore);
        }

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
          // Log queue stats for debugging (only in development)
          if (__DEV__) {
            console.log('Queue stats after:', statsAfter);
          }

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
      },
    },
    {
      id: 'priority',
      title: 'Priority',
      emoji: '🔥',
      description: 'Priority levels',
      action: () => {
        // Show different priority toasts
        setTimeout(() => error('Low priority error', { priority: 'low' }), 100);
        setTimeout(
          () => warning('Medium priority warning', { priority: 'medium' }),
          200
        );
        setTimeout(() => info('High priority info', { priority: 'high' }), 300);
        setTimeout(
          () => success('Urgent success!', { priority: 'urgent' }),
          400
        );
      },
    },
    {
      id: 'merge',
      title: 'Merge',
      emoji: '🔄',
      description: 'Merge toasts',
      action: () => {
        setTimeout(() => success('Duplicate message test'), 100);
        setTimeout(() => success('Duplicate message test'), 200);
        setTimeout(() => success('Duplicate message test'), 300);
        setTimeout(() => info('Similar message test'), 400);
        setTimeout(() => info('Similar message test'), 500);
      },
    },
    {
      id: 'variant-light-dark',
      title: 'Variant Light Dark',
      emoji: '🎨',
      description: 'Variant light dark compatible',
      action: () => {
        custom({
          message: 'Theme-aware variant',
          layout: {
            iconPosition: 'right',
            textAlignment: 'left',
            spacing: 'spacious',
          },
          variant: 'showcase-success',
        });
      },
    },
    {
      id: 'variant-single-style',
      title: 'Variant Single Style',
      emoji: '🎨',
      description: 'Variant single style',
      action: () => {
        custom({
          message: 'Theme-aware variant error',
          layout: {
            iconPosition: 'right',
            textAlignment: 'left',
            spacing: 'spacious',
          },
          variant: 'showcase-error',
        });
      },
    },
    {
      id: 'progress-showcase',
      title: 'Progress Theming',
      emoji: '📊',
      description: 'Theme-aware progress bars',
      action: () => {
        // Show multiple toasts with different durations to demonstrate progress bars
        success('Fast progress demo', {
          duration: 2000,
          progressBar: { enabled: true, position: 'bottom' },
        });

        setTimeout(() => {
          warning('Slow progress demo', {
            duration: 8000,
            progressBar: { enabled: true, position: 'top' },
          });
        }, 300);

        setTimeout(() => {
          info('Custom progress color', {
            duration: 5000,
            progressBar: {
              enabled: true,
              position: 'bottom',
              color: currentTheme.colors.secondary,
            },
          });
        }, 600);

        setTimeout(() => {
          error('Theme-integrated progress', {
            duration: 6000,
            progressBar: { enabled: true },
          });
        }, 900);
      },
    },
  ];

  const styles = createShowcaseStyles(currentTheme);

  return (
    <View style={styles.container}>
      {/* Examples Title */}
      <Text style={styles.sectionTitle}>Examples</Text>

      {/* Examples Grid */}
      <View style={styles.themeGrid}>
        {demos.map((demo) => (
          <TouchableOpacity
            key={demo.id}
            style={[
              styles.themeCard,
              activeDemo === demo.id && styles.activeThemeCard,
            ]}
            onPress={() => {
              setActiveDemo(demo.id);
              demo.action();
              setTimeout(() => setActiveDemo(null), 2000);
            }}
          >
            <Text style={styles.themeEmoji}>{demo.emoji}</Text>
            <Text
              style={[
                styles.themeName,
                activeDemo === demo.id && styles.activeThemeName,
              ]}
            >
              {demo.title}
            </Text>
            <Text
              style={[
                styles.themeDescription,
                activeDemo === demo.id && styles.activeThemeDescription,
              ]}
            >
              {demo.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Theme Features Display
const ThemeFeatures: React.FC = () => {
  const { currentTheme } = useTheme();

  const features = [
    '🎨 4 beautiful themes with unique personalities',
    '🌗 Automatic light/dark mode switching',
    '⚡ Instant theme transitions without reload',
    '🎯 Type-aware variants (success, error, etc.)',
    '💫 Theme-aware custom variants support',
    '📱 Responsive design for all screen sizes',
    '🎭 Custom icons with theme integration',
    '⏳ Promise toasts with loading states',
    '📊 Smart queue management system',
  ];

  const styles = createFeatureStyles(currentTheme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ What Makes It Magical</Text>
      <Text style={styles.subtitle}>
        Every element adapts to your chosen theme - just like this app!
      </Text>

      <View style={styles.featureList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Main App Content
const AppContent: React.FC = () => {
  const { currentTheme } = useTheme();

  // Register custom variants on mount
  useEffect(() => {
    variants.register({
      name: 'showcase-success',
      displayName: 'Showcase Success',
      description: 'Special success variant for the showcase',
      theme: {
        light: {
          name: 'showcase-success-light',
          mode: 'light',
          borderRadius: 'xl',
          colors: {
            primary: '#10B981',
            secondary: '#059669',
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6',
            background: '#FFFFFF',
            surface: '#ECFDF5',
            onPrimary: '#FFFFFF',
            onSecondary: '#FFFFFF',
            onSurface: '#059669',
            border: '#10B981',
            overlay: 'rgba(0,0,0,0.5)',
            shadow: '#000000',
          },
          typography: {
            title: { size: 17, weight: '600', lineHeight: 22 },
            description: { size: 15, weight: '400', lineHeight: 20 },
          },
          spacing: { icon: 16, container: 24, text: 12 },
          shadows: {
            shadowColor: '#10B981',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          },
          progressBar: {
            track: {
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderRadius: 4,
              height: 3,
              opacity: 1,
            },
            bar: {
              borderRadius: 4,
              height: 3,
              gradient: {
                colors: ['#10B981', '#059669'],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              },
            },
            animation: {
              duration: 120,
              easing: 'ease-out',
            },
            positioning: {
              defaultPosition: 'bottom',
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
        dark: {
          name: 'showcase-success-dark',
          mode: 'dark',
          borderRadius: 'xl',
          colors: {
            primary: '#34D399',
            secondary: '#10B981',
            success: '#34D399',
            error: '#F87171',
            warning: '#FBBF24',
            info: '#60A5FA',
            background: '#0F1419',
            surface: '#064E3B',
            onPrimary: '#064E3B',
            onSecondary: '#064E3B',
            onSurface: '#A7F3D0',
            border: '#34D399',
            overlay: 'rgba(0,0,0,0.7)',
            shadow: '#000000',
          },
          typography: {
            title: { size: 17, weight: '600', lineHeight: 22 },
            description: { size: 15, weight: '400', lineHeight: 20 },
          },
          spacing: { icon: 16, container: 24, text: 12 },
          shadows: {
            shadowColor: '#34D399',
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          },
          progressBar: {
            track: {
              backgroundColor: 'rgba(52, 211, 153, 0.3)',
              borderRadius: 4,
              height: 3,
              opacity: 1,
            },
            bar: {
              borderRadius: 4,
              height: 3,
              gradient: {
                colors: ['#34D399', '#10B981'],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              },
            },
            animation: {
              duration: 120,
              easing: 'ease-out',
            },
            positioning: {
              defaultPosition: 'bottom',
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
      },
    });

    variants.register({
      name: 'showcase-error',
      displayName: 'Showcase Error',
      description: 'Special error variant for the showcase',
      theme: {
        name: 'showcase-error',
        mode: 'light',
        borderRadius: 'xl',
        colors: {
          primary: '#EF4444',
          secondary: '#B91C1C',
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
          background: '#FFFFFF',
          surface: '#FEE2E2',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
          onSurface: '#B91C1C',
          border: '#EF4444',
          overlay: 'rgba(0,0,0,0.5)',
          shadow: '#000000',
        },
        typography: {
          title: { size: 17, weight: '600', lineHeight: 22 },
          description: { size: 15, weight: '400', lineHeight: 20 },
        },
        spacing: { icon: 16, container: 24, text: 12 },
        shadows: {
          shadowColor: '#EF4444',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        },
        progressBar: {
          track: {
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderRadius: 4,
            height: 3,
            opacity: 1,
          },
          bar: {
            borderRadius: 4,
            height: 3,
            gradient: {
              colors: ['#EF4444', '#B91C1C'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            },
          },
          animation: {
            duration: 100,
            easing: 'linear',
          },
          positioning: {
            defaultPosition: 'bottom',
            marginTop: 0,
            marginBottom: 0,
          },
        },
      },
    });
  }, []);

  const styles = createAppStyles(currentTheme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemeShowcase />
        <InteractiveDemos />
        <ThemeFeatures />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>🎉 Ready to Get Started?</Text>
          <Text style={styles.footerText}>
            Add beautiful, theme-aware toasts to your React Native app
          </Text>
          <View style={styles.footerCode}>
            <Text style={styles.footerCodeText}>npm install rn-tosty</Text>
          </View>
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

// Theme-aware styles
const createShowcaseStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: theme.colors.background,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.secondary,
      textAlign: 'center',
      opacity: 0.8,
    },
    currentThemeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    currentThemeEmoji: {
      fontSize: 32,
      marginRight: 16,
    },
    currentThemeInfo: {
      flex: 1,
    },
    currentThemeName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    currentThemeMode: {
      fontSize: 14,
      color: theme.colors.secondary,
      opacity: 0.8,
    },
    modeToggle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modeToggleText: {
      fontSize: 18,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 16,
      textAlign: 'center',
    },
    themeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'space-between',
    },
    themeCard: {
      width: (width - 72) / 2,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    activeThemeCard: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      transform: [{ scale: 1.02 }],
    },
    themeEmoji: {
      fontSize: 24,
      marginBottom: 8,
    },
    themeName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 4,
      textAlign: 'center',
    },
    activeThemeName: {
      color: theme.colors.onPrimary,
    },
    themeDescription: {
      fontSize: 12,
      color: theme.colors.secondary,
      textAlign: 'center',
      opacity: 0.8,
    },
    activeThemeDescription: {
      color: theme.colors.onPrimary,
      opacity: 0.9,
    },
  });

const createFeatureStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.secondary,
      textAlign: 'center',
      marginBottom: 24,
      opacity: 0.8,
    },
    featureList: {
      gap: 16,
      marginBottom: 32,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    featureDot: {
      width: 6,
      height: 6,
      backgroundColor: theme.colors.primary,
      borderRadius: 3,
      marginRight: 16,
    },
    featureText: {
      fontSize: 16,
      color: theme.colors.onSurface,
      flex: 1,
      lineHeight: 22,
    },
    codeExample: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    codeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 12,
    },
    codeText: {
      fontFamily: 'Courier',
      fontSize: 13,
      color: theme.colors.onSurface,
      lineHeight: 18,
      opacity: 0.8,
    },
  });

const createAppStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    footer: {
      padding: 32,
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      marginHorizontal: 24,
      borderRadius: 16,
      marginTop: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    footerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: 8,
      textAlign: 'center',
    },
    footerText: {
      fontSize: 15,
      color: theme.colors.secondary,
      textAlign: 'center',
      marginBottom: 20,
      opacity: 0.8,
    },
    footerCode: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    footerCodeText: {
      fontFamily: 'Courier',
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '600',
    },
  });
