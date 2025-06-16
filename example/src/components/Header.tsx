import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface HeaderProps {
  onMenuPress: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = ({ onMenuPress }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  // Only show header on mobile
  if (screenWidth >= 768) {
    return null;
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>

      <Text style={styles.title}>RN-Tosty Demo</Text>

      <View style={styles.placeholder} />
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    menuButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    hamburgerLine: {
      width: 20,
      height: 2,
      backgroundColor: isDarkMode ? '#ffffff' : '#000000',
      marginVertical: 2,
      borderRadius: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    placeholder: {
      width: 40,
    },
  });
