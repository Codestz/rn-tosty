import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export interface SidebarItem {
  id: string;
  title: string;
  emoji: string;
  type: 'theme' | 'section';
  theme?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  selectedItem: string;
  onItemPress: (item: SidebarItem) => void;
  isVisible: boolean;
  onToggle: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(280, screenWidth * 0.8);

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItem,
  onItemPress,
  isVisible,
  onToggle,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <>
      {/* Overlay for mobile */}
      {isVisible && screenWidth < 768 && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onToggle}
          activeOpacity={1}
        />
      )}

      {/* Sidebar */}
      <View
        style={[
          styles.sidebar,
          { transform: [{ translateX: isVisible ? 0 : -SIDEBAR_WIDTH }] },
          screenWidth >= 768 && styles.sidebarDesktop,
        ]}
      >
        <View style={styles.sidebarHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.sidebarTitle}>RN-Tosty</Text>
            <Text style={styles.sidebarSubtitle}>Demo & Docs</Text>
          </View>

          {/* Toggle button - only show on mobile */}
          {screenWidth < 768 && (
            <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
              <Text style={styles.toggleButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.sidebarContent}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.sidebarItem,
                item.type === 'section' && styles.sidebarSection,
                selectedItem === item.id && styles.sidebarItemSelected,
              ]}
              onPress={() => {
                onItemPress(item);
                // Auto-close sidebar on mobile after selection
                if (screenWidth < 768 && item.type !== 'section') {
                  onToggle();
                }
              }}
              disabled={item.type === 'section'}
            >
              <Text style={styles.sidebarItemEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.sidebarItemText,
                  item.type === 'section' && styles.sidebarSectionText,
                  selectedItem === item.id && styles.sidebarItemTextSelected,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: SIDEBAR_WIDTH,
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
      borderRightWidth: 1,
      borderRightColor: isDarkMode ? '#374151' : '#E5E7EB',
      zIndex: 1000,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
    sidebarDesktop: {
      position: 'relative',
      elevation: 0,
      shadowOpacity: 0,
    },
    sidebarHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerContent: {
      flex: 1,
    },
    sidebarTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    sidebarSubtitle: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginTop: 4,
    },
    toggleButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleButtonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: 'bold',
    },
    sidebarContent: {
      flex: 1,
      padding: 12,
    },
    sidebarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginBottom: 4,
    },
    sidebarSection: {
      marginTop: 16,
      marginBottom: 8,
      paddingLeft: 8,
    },
    sidebarItemSelected: {
      backgroundColor: isDarkMode ? '#3B82F6' : '#3B82F6',
    },
    sidebarItemEmoji: {
      fontSize: 16,
      marginRight: 12,
    },
    sidebarItemText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#374151',
      fontWeight: '500',
    },
    sidebarSectionText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    sidebarItemTextSelected: {
      color: '#ffffff',
    },
  });
