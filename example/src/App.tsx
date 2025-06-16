import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Themes, ToastProvider } from 'rn-tosty';
import { Header } from './components/Header';
import { Sidebar, type SidebarItem } from './components/Sidebar';
import { ThemeDemo } from './components/ThemeDemo';

// Theme names for our setup
type ThemeName = 'default' | 'liquidGlass' | 'minimalist';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'themes', title: 'Themes', emoji: '🎨', type: 'section' },
  {
    id: 'default',
    title: 'Default',
    emoji: '🎯',
    type: 'theme',
    theme: 'default',
  },
  {
    id: 'liquidGlass',
    title: 'Liquid Glass',
    emoji: '💧',
    type: 'theme',
    theme: 'liquidGlass',
  },
  {
    id: 'minimalist',
    title: 'Minimalist',
    emoji: '⚪',
    type: 'theme',
    theme: 'minimalist',
  },
];

// Welcome Screen Component
const WelcomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createWelcomeStyles(isDarkMode);

  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>🍞 RN-Tosty</Text>
      <Text style={styles.welcomeSubtitle}>
        Beautiful toast notifications for React Native
      </Text>
      <Text style={styles.welcomeText}>
        Select a theme from the sidebar to see examples and documentation.
      </Text>
      <View style={styles.featureList}>
        <Text style={styles.featureTitle}>✨ Features</Text>
        <Text style={styles.featureItem}>• 3 Beautiful themes</Text>
        <Text style={styles.featureItem}>• 15+ Toast variants</Text>
        <Text style={styles.featureItem}>• Progress bar support</Text>
        <Text style={styles.featureItem}>• Smart positioning</Text>
        <Text style={styles.featureItem}>• TypeScript support</Text>
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedItem, setSelectedItem] = useState<string>('default');
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  const styles = createStyles(isDarkMode, screenData.width);

  // Listen to screen dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
      // Auto-show sidebar on desktop, hide on mobile
      if (window.width >= 768) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    });

    // Set initial sidebar state
    if (screenData.width >= 768) {
      setSidebarVisible(true);
    }

    return () => subscription?.remove();
  }, [screenData.width]);

  const getTheme = () => {
    switch (currentTheme) {
      case 'liquidGlass':
        return Themes.liquidGlass;
      case 'minimalist':
        return Themes.minimalist;
      default:
        return Themes.default;
    }
  };

  const handleItemPress = (item: SidebarItem) => {
    setSelectedItem(item.id);
    if (item.theme) {
      setCurrentTheme(item.theme as ThemeName);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderContent = () => {
    const selectedTheme = SIDEBAR_ITEMS.find((item) => item.id === selectedItem)
      ?.theme as ThemeName;

    if (selectedTheme) {
      return <ThemeDemo theme={selectedTheme} />;
    }

    return <WelcomeScreen />;
  };

  return (
    <SafeAreaProvider>
      <ToastProvider theme={getTheme()}>
        <SafeAreaView style={styles.container}>
          <Header onMenuPress={toggleSidebar} />

          <View style={styles.layout}>
            <Sidebar
              items={SIDEBAR_ITEMS}
              selectedItem={selectedItem}
              onItemPress={handleItemPress}
              isVisible={sidebarVisible}
              onToggle={toggleSidebar}
            />

            {/* Main Content */}
            <View
              style={[
                styles.content,
                screenData.width >= 768 &&
                  sidebarVisible &&
                  styles.contentWithSidebar,
              ]}
            >
              {renderContent()}
            </View>
          </View>
        </SafeAreaView>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const createStyles = (isDarkMode: boolean, screenWidth: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
    },
    content: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    contentWithSidebar: {
      marginLeft: screenWidth >= 768 ? Math.min(280, screenWidth * 0.8) : 0,
    },
  });

const createWelcomeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    welcomeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    welcomeTitle: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
      textAlign: 'center',
    },
    welcomeSubtitle: {
      fontSize: 20,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 24,
      textAlign: 'center',
    },
    welcomeText: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    featureList: {
      alignItems: 'flex-start',
    },
    featureTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 12,
    },
    featureItem: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      marginBottom: 8,
      lineHeight: 24,
    },
  });
