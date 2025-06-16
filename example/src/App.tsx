import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  smartToast,
  Themes,
  ToastProvider,
  toastVariants,
  useToast,
  variants,
} from 'rn-tosty';

function VariantsDemo(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { success, error, info, warning } = useToast();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    flex: 1,
  };

  // Register custom variants on component mount
  useEffect(() => {
    // Example 1: Simple custom variant extending an existing one
    variants.registerCustom({
      name: 'my-success-card',
      extends: 'card',
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
        hapticFeedback: 'medium',
      },
    });

    // Example 2: Complex custom variant with gradient effect
    variants.registerCustom({
      name: 'gradient-hero',
      displayName: 'Gradient Hero',
      description: 'Eye-catching gradient variant for important messages',
      style: {
        backgroundColor: '#667eea', // Fallback color
        backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#FFFFFF',
        titleColor: '#FFFFFF',
        iconColor: '#FFFFFF',
        borderRadius: 20,
        padding: { horizontal: 24, vertical: 18 },
        shadowColor: '#667eea',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: { x: 0, y: 8 },
        elevation: 10,
        iconPosition: 'left',
        iconSize: 'large',
      },
      behavior: {
        defaultDuration: 8000,
        hapticFeedback: 'heavy',
        priority: 'high',
      },
    });

    // Example 3: Minimal custom variant
    variants.registerCustom({
      name: 'ultra-minimal',
      displayName: 'Ultra Minimal',
      description: 'Extremely clean variant with no visual distractions',
      style: {
        backgroundColor: 'transparent',
        textColor: 'theme.colors.onSurface',
        borderWidth: 0,
        borderRadius: 0,
        padding: { horizontal: 8, vertical: 6 },
        iconPosition: 'none',
        shadowOpacity: 0,
        elevation: 0,
      },
      behavior: {
        defaultDuration: 2000,
        hapticFeedback: 'none',
      },
      iconConfig: {
        showIcon: false,
      },
    });

    // Example 4: Using the builder pattern
    const builderVariant = variants
      .create()
      .setName('builder-example')
      .setDisplayName('Builder Example')
      .setBackgroundColor('#FF6B6B')
      .setTextColor('#FFFFFF')
      .setBorderRadius(25)
      .setPadding({ horizontal: 20, vertical: 14 })
      .setIconPosition('right')
      .setIconSize('medium')
      .setDefaultDuration(5000)
      .setHapticFeedback('medium')
      .build();

    variants.register(builderVariant);
  }, []);

  // Core Variants Demo
  const showDefaultVariant = () => {
    success('This is the default variant', { variant: 'default' });
  };

  const showMinimalVariant = () => {
    info('Clean and minimal design', { variant: 'minimal' });
  };

  const showOutlinedVariant = () => {
    warning('Outlined variant with borders', { variant: 'outlined' });
  };

  const showFilledVariant = () => {
    error('Filled variant with solid colors', { variant: 'filled' });
  };

  // Special Effect Variants
  const showGlassVariant = () => {
    info('Glassmorphism effect with transparency', { variant: 'glass' });
  };

  const showCardVariant = () => {
    success('Elevated card design with shadows', {
      variant: 'card',
      title: 'Card Style',
    });
  };

  const showFloatingVariant = () => {
    warning('Floating above content', { variant: 'floating' });
  };

  const showBannerVariant = () => {
    info('Full-width banner notification', { variant: 'banner' });
  };

  // Utility Variants
  const showCompactVariant = () => {
    success('Space-efficient compact design', { variant: 'compact' });
  };

  const showNotificationVariant = () => {
    info('System notification style', { variant: 'notification' });
  };

  const showAlertVariant = () => {
    error('High-priority alert with emphasis', {
      variant: 'alert',
      title: 'Important Alert',
    });
  };

  // Type-Specific Filled Variants
  const showSuccessFilled = () => {
    success('Success with filled background', { variant: 'success-filled' });
  };

  const showErrorFilled = () => {
    error('Error with filled background', { variant: 'error-filled' });
  };

  const showWarningFilled = () => {
    warning('Warning with filled background', { variant: 'warning-filled' });
  };

  const showInfoFilled = () => {
    info('Info with filled background', { variant: 'info-filled' });
  };

  // Custom Variants Demo
  const showCustomSuccessCard = () => {
    success('Custom success card variant!', {
      variant: 'my-success-card',
      title: 'Custom Variant',
    });
  };

  const showGradientHero = () => {
    info('Beautiful gradient hero variant', {
      variant: 'gradient-hero',
      title: '🌟 Hero Message',
    });
  };

  const showUltraMinimal = () => {
    info('Ultra minimal - no distractions', { variant: 'ultra-minimal' });
  };

  const showBuilderExample = () => {
    warning('Created with builder pattern', {
      variant: 'builder-example',
      title: 'Builder Pattern',
    });
  };

  // Smart Auto-Selection Demo
  const showSmartShort = () => {
    smartToast.auto('Short message', 'success');
  };

  const showSmartLong = () => {
    smartToast.auto(
      'This is a much longer message that will automatically get a different variant based on its length and content',
      'info'
    );
  };

  const showSmartWithTitle = () => {
    smartToast.auto('Message with title', 'warning', {
      title: 'Smart Selection',
    });
  };

  // Variant-Specific API Demo
  const showVariantAPI = () => {
    // Using the toastVariants API for direct variant access
    setTimeout(() => toastVariants.card('Using variant-specific API'), 100);
    setTimeout(() => toastVariants.glass('Glass variant via API'), 600);
    setTimeout(() => toastVariants.floating('Floating variant via API'), 1100);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}
        >
          🍞 Toast Variants Demo
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: isDarkMode ? '#cccccc' : '#666666' },
          ]}
        >
          Explore 15 predefined + custom variants
        </Text>

        {/* Core Variants */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🎨 Core Variants
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.defaultButton]}
            onPress={showDefaultVariant}
          >
            <Text style={styles.buttonText}>Default</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.minimalButton]}
            onPress={showMinimalVariant}
          >
            <Text style={styles.buttonText}>Minimal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlinedButton]}
            onPress={showOutlinedVariant}
          >
            <Text style={styles.buttonText}>Outlined</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.filledButton]}
            onPress={showFilledVariant}
          >
            <Text style={styles.buttonText}>Filled</Text>
          </TouchableOpacity>
        </View>

        {/* Special Effects */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          ✨ Special Effects
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.glassButton]}
            onPress={showGlassVariant}
          >
            <Text style={styles.buttonText}>Glass</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cardButton]}
            onPress={showCardVariant}
          >
            <Text style={styles.buttonText}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.floatingButton]}
            onPress={showFloatingVariant}
          >
            <Text style={styles.buttonText}>Floating</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.bannerButton]}
            onPress={showBannerVariant}
          >
            <Text style={styles.buttonText}>Banner</Text>
          </TouchableOpacity>
        </View>

        {/* Utility Variants */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🔧 Utility Variants
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.compactButton]}
            onPress={showCompactVariant}
          >
            <Text style={styles.buttonText}>Compact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.notificationButton]}
            onPress={showNotificationVariant}
          >
            <Text style={styles.buttonText}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.alertButton]}
            onPress={showAlertVariant}
          >
            <Text style={styles.buttonText}>Alert</Text>
          </TouchableOpacity>
        </View>

        {/* Type-Specific Filled */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🎯 Type-Specific Filled
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccessFilled}
          >
            <Text style={styles.buttonText}>Success Filled</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showErrorFilled}
          >
            <Text style={styles.buttonText}>Error Filled</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showWarningFilled}
          >
            <Text style={styles.buttonText}>Warning Filled</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfoFilled}
          >
            <Text style={styles.buttonText}>Info Filled</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Variants */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🛠️ Custom Variants
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showCustomSuccessCard}
          >
            <Text style={styles.buttonText}>Custom Success</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.gradientButton]}
            onPress={showGradientHero}
          >
            <Text style={styles.buttonText}>Gradient Hero</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.ultraMinimalButton]}
            onPress={showUltraMinimal}
          >
            <Text style={styles.buttonText}>Ultra Minimal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.builderButton]}
            onPress={showBuilderExample}
          >
            <Text style={styles.buttonText}>Builder Pattern</Text>
          </TouchableOpacity>
        </View>

        {/* Smart Auto-Selection */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🧠 Smart Auto-Selection
        </Text>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.smartButton]}
            onPress={showSmartShort}
          >
            <Text style={styles.buttonText}>Smart Short</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.smartButton]}
            onPress={showSmartLong}
          >
            <Text style={styles.buttonText}>Smart Long</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.smartButton]}
            onPress={showSmartWithTitle}
          >
            <Text style={styles.buttonText}>Smart + Title</Text>
          </TouchableOpacity>
        </View>

        {/* API Showcase */}
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          🚀 Variant-Specific API
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.apiButton, styles.fullWidth]}
          onPress={showVariantAPI}
        >
          <Text style={styles.buttonText}>Show Multiple Variants</Text>
        </TouchableOpacity>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Extra padding at bottom for better scrolling
  },
  title: {
    fontSize: 28,
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
    marginTop: 24,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    minWidth: '47%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    minWidth: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Button Colors
  defaultButton: { backgroundColor: '#6B7280' },
  minimalButton: { backgroundColor: '#9CA3AF' },
  outlinedButton: { backgroundColor: '#4B5563' },
  filledButton: { backgroundColor: '#374151' },
  glassButton: { backgroundColor: '#60A5FA' },
  cardButton: { backgroundColor: '#3B82F6' },
  floatingButton: { backgroundColor: '#1D4ED8' },
  bannerButton: { backgroundColor: '#1E40AF' },
  compactButton: { backgroundColor: '#7C3AED' },
  notificationButton: { backgroundColor: '#5B21B6' },
  alertButton: { backgroundColor: '#EF4444' },
  successButton: { backgroundColor: '#10B981' },
  errorButton: { backgroundColor: '#F87171' },
  warningButton: { backgroundColor: '#F59E0B' },
  infoButton: { backgroundColor: '#06B6D4' },
  customButton: { backgroundColor: '#4CAF50' },
  gradientButton: { backgroundColor: '#667eea' },
  ultraMinimalButton: { backgroundColor: '#78716c' },
  builderButton: { backgroundColor: '#FF6B6B' },
  smartButton: { backgroundColor: '#8B5CF6' },
  apiButton: { backgroundColor: '#EC4899' },
  footer: {
    height: 40,
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider theme={Themes.vibrant}>
          <VariantsDemo />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
