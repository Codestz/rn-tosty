// Device Detection Service - Detect device types and screen characteristics
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import type {
  DeviceInfo as DeviceInfoType,
  DeviceType,
} from '../types/SafeAreaTypes';

export class DeviceDetector {
  private static instance: DeviceDetector;
  private deviceInfo: DeviceInfoType | null = null;

  private constructor() {}

  static getInstance(): DeviceDetector {
    if (!DeviceDetector.instance) {
      DeviceDetector.instance = new DeviceDetector();
    }
    return DeviceDetector.instance;
  }

  async getDeviceInfo(): Promise<DeviceInfoType> {
    if (this.deviceInfo) {
      return this.deviceInfo;
    }

    const { width, height } = Dimensions.get('window');
    const screenData = Dimensions.get('screen');

    try {
      const [model, brand, deviceId, systemVersion, hasNotch] =
        await Promise.all([
          DeviceInfo.getModel(),
          DeviceInfo.getBrand(),
          DeviceInfo.getDeviceId(),
          DeviceInfo.getSystemVersion(),
          DeviceInfo.hasNotch(),
        ]);

      const deviceType = this.detectDeviceType(model, width, height);
      const hasSpecialScreen = this.detectSpecialScreenFeatures(
        model,
        hasNotch
      );
      const hasHomeButton = this.detectHomeButton(model, hasNotch);

      this.deviceInfo = {
        platform: Platform.OS as 'ios' | 'android',
        model,
        brand,
        deviceId,
        systemVersion,
        deviceType,
        screenWidth: width,
        screenHeight: height,
        screenData,
        hasNotch,
        hasHomeButton,
        hasDynamicIsland: this.detectDynamicIsland(model),
        hasSpecialScreen,
        statusBarHeight: this.estimateStatusBarHeight(model, hasNotch),
        homeIndicatorHeight: this.estimateHomeIndicatorHeight(hasHomeButton),
      };

      return this.deviceInfo;
    } catch (error) {
      console.warn(
        'rn-tosty: Failed to get device info, using fallback values',
        error
      );

      // Fallback device info
      this.deviceInfo = {
        platform: Platform.OS as 'ios' | 'android',
        model: 'Unknown',
        brand: 'Unknown',
        deviceId: 'unknown',
        systemVersion: '0',
        deviceType: 'unknown' as DeviceType,
        screenWidth: width,
        screenHeight: height,
        screenData,
        hasNotch: false,
        hasHomeButton: true,
        hasDynamicIsland: false,
        hasSpecialScreen: false,
        statusBarHeight: Platform.OS === 'ios' ? 20 : 24,
        homeIndicatorHeight: 0,
      };

      return this.deviceInfo;
    }
  }

  private detectDeviceType(
    model: string,
    width: number,
    height: number
  ): DeviceType {
    const isTablet = Math.min(width, height) >= 768;

    if (Platform.OS === 'ios') {
      if (model.includes('iPad')) {
        return 'ipad';
      }

      if (this.detectDynamicIsland(model)) {
        return 'iphone-dynamic-island';
      }

      if (
        model.includes('iPhone SE') ||
        model.includes('iPhone 8') ||
        model.includes('iPhone 7')
      ) {
        return 'iphone-se';
      }

      // Check for notched devices
      if (
        model.includes('iPhone X') ||
        model.includes('iPhone 11') ||
        model.includes('iPhone 12') ||
        model.includes('iPhone 13')
      ) {
        return 'iphone-notch';
      }

      return isTablet ? 'ipad' : 'iphone-standard';
    }

    // Android devices
    if (isTablet) {
      return 'android-tablet';
    }

    // Check for punch-hole cameras (common in modern Android devices)
    if (
      model.includes('Galaxy S') ||
      model.includes('Pixel') ||
      model.includes('OnePlus')
    ) {
      return 'android-punch-hole';
    }

    return 'android-standard';
  }

  private detectDynamicIsland(model: string): boolean {
    const dynamicIslandModels = [
      'iPhone14,7', // iPhone 14 Pro
      'iPhone14,8', // iPhone 14 Pro Max
      'iPhone15,2', // iPhone 15 Pro
      'iPhone15,3', // iPhone 15 Pro Max
      'iPhone16,1', // iPhone 15 Pro
      'iPhone16,2', // iPhone 15 Pro Max
    ];

    return (
      dynamicIslandModels.some((modelId) => model.includes(modelId)) ||
      model.includes('15 Pro') ||
      model.includes('14 Pro')
    );
  }

  private detectSpecialScreenFeatures(
    model: string,
    hasNotch: boolean
  ): boolean {
    return hasNotch || this.detectDynamicIsland(model);
  }

  private detectHomeButton(model: string, hasNotch: boolean): boolean {
    if (Platform.OS === 'android') {
      // Modern Android devices typically use gesture navigation
      return false;
    }

    // iOS: devices with notch or Dynamic Island don't have home buttons
    if (hasNotch || this.detectDynamicIsland(model)) {
      return false;
    }

    // Classic iPhones (iPhone 8 and earlier) have home buttons
    return (
      model.includes('iPhone SE') ||
      model.includes('iPhone 8') ||
      model.includes('iPhone 7') ||
      model.includes('iPhone 6')
    );
  }

  private estimateStatusBarHeight(model: string, hasNotch: boolean): number {
    if (Platform.OS === 'android') {
      return 24; // Standard Android status bar
    }

    // iOS status bar heights
    if (this.detectDynamicIsland(model)) {
      return 59; // Dynamic Island models
    }

    if (hasNotch) {
      return 44; // Notched iPhones
    }

    return 20; // Classic iPhones
  }

  private estimateHomeIndicatorHeight(hasHomeButton: boolean): number {
    if (Platform.OS === 'android') {
      return hasHomeButton ? 0 : 24; // Gesture navigation area
    }

    return hasHomeButton ? 0 : 34; // iOS home indicator
  }

  // Quick sync method for when device info is already available
  getCachedDeviceInfo(): DeviceInfoType | null {
    return this.deviceInfo;
  }

  // Clear cache (useful for testing or device rotation)
  clearCache(): void {
    this.deviceInfo = null;
  }
}
