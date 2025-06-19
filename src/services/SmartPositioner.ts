// Smart Positioning Service - Intelligent toast positioning based on device characteristics
import type {
  DeviceInfo,
  SafeAreaCalculation,
  SafeAreaInsets,
  ToastProviderConfig,
} from '../types/ConfigTypes';
import type { ToastPosition } from '../types/ToastTypes';
import { DeviceDetector } from './DeviceDetector';

export class SmartPositioner {
  private static instance: SmartPositioner;
  private deviceDetector: DeviceDetector;

  private constructor() {
    this.deviceDetector = DeviceDetector.getInstance();
  }

  static getInstance(): SmartPositioner {
    if (!SmartPositioner.instance) {
      SmartPositioner.instance = new SmartPositioner();
    }
    return SmartPositioner.instance;
  }

  /**
   * Calculate optimal positioning based on device characteristics and user preference
   */
  async calculatePosition(
    preferredPosition: ToastPosition,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): Promise<SafeAreaCalculation> {
    const deviceInfo = await this.deviceDetector.getDeviceInfo();

    // If user specified a concrete position, use it with safe area adjustments
    if (preferredPosition === 'top' || preferredPosition === 'bottom') {
      return this.calculateConcretePosition(
        preferredPosition,
        deviceInfo,
        safeAreaInsets,
        config
      );
    }

    // For 'smart' positioning, choose optimal position automatically
    return this.calculateSmartPosition(deviceInfo, safeAreaInsets, config);
  }

  /**
   * Calculate position for user-specified top/bottom preference
   */
  private calculateConcretePosition(
    position: 'top' | 'bottom',
    deviceInfo: DeviceInfo,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): SafeAreaCalculation {
    const baseMargins = this.getBaseMargins(deviceInfo);

    if (position === 'top') {
      return {
        position: 'top',
        topMargin: this.calculateTopMargin(deviceInfo, safeAreaInsets, config),
        bottomMargin: 0,
        leftMargin: baseMargins.horizontal,
        rightMargin: baseMargins.horizontal,
        maxWidth: deviceInfo.screenWidth - baseMargins.horizontal * 2,
        recommendedPosition: 'top',
        deviceOptimizations: this.getDeviceOptimizations(deviceInfo),
      };
    }

    return {
      position: 'bottom',
      topMargin: 0,
      bottomMargin: this.calculateBottomMargin(
        deviceInfo,
        safeAreaInsets,
        config
      ),
      leftMargin: baseMargins.horizontal,
      rightMargin: baseMargins.horizontal,
      maxWidth: deviceInfo.screenWidth - baseMargins.horizontal * 2,
      recommendedPosition: 'bottom',
      deviceOptimizations: this.getDeviceOptimizations(deviceInfo),
    };
  }

  /**
   * Automatically choose the best position based on device characteristics
   */
  private calculateSmartPosition(
    deviceInfo: DeviceInfo,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): SafeAreaCalculation {
    // Determine optimal position based on device characteristics
    const optimalPosition = this.determineOptimalPosition(deviceInfo);

    return this.calculateConcretePosition(
      optimalPosition,
      deviceInfo,
      safeAreaInsets,
      config
    );
  }

  /**
   * Determine the optimal position based on device characteristics
   */
  private determineOptimalPosition(deviceInfo: DeviceInfo): 'top' | 'bottom' {
    // For Dynamic Island devices, prefer bottom to avoid interference
    if (
      deviceInfo.hasDynamicIsland ||
      deviceInfo.deviceType === 'iphone-dynamic-island'
    ) {
      return 'bottom';
    }

    // For devices with large notches, prefer bottom
    if (deviceInfo.hasNotch && deviceInfo.statusBarHeight > 40) {
      return 'bottom';
    }

    // For tablets, prefer top as there's usually more space
    if (
      deviceInfo.deviceType === 'ipad' ||
      deviceInfo.deviceType === 'android-tablet'
    ) {
      return 'top';
    }

    // For Android devices with gesture navigation, prefer top
    if (
      deviceInfo.platform === 'android' &&
      !deviceInfo.hasHomeButton &&
      deviceInfo.homeIndicatorHeight > 20
    ) {
      return 'top';
    }

    // Default to top for most cases
    return 'top';
  }

  /**
   * Calculate top margin considering device-specific factors and user configuration
   */
  private calculateTopMargin(
    deviceInfo: DeviceInfo,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): number {
    const baseMargin = 16;
    let margin = Math.max(safeAreaInsets.top, deviceInfo.statusBarHeight);

    // Add device-specific adjustments (can be disabled via verticalOffset.adaptToDevice)
    const shouldAdaptToDevice = config?.verticalOffset?.adaptToDevice !== false;

    if (shouldAdaptToDevice) {
      // Add extra margin for Dynamic Island
      if (deviceInfo.hasDynamicIsland) {
        margin += 8;
      }

      // Add extra margin for notched devices
      if (deviceInfo.hasNotch && !deviceInfo.hasDynamicIsland) {
        margin += 4;
      }
    }

    // Apply user-defined vertical offsets
    if (config?.verticalOffset) {
      // Apply global and position-specific offsets
      if (config.verticalOffset.global) {
        margin += config.verticalOffset.global;
      }
      if (config.verticalOffset.top) {
        margin += config.verticalOffset.top;
      }

      // Apply min/max margin constraints
      if (config.verticalOffset.minMargin !== undefined) {
        margin = Math.max(margin, config.verticalOffset.minMargin);
      }
      if (config.verticalOffset.maxMargin !== undefined) {
        margin = Math.min(margin, config.verticalOffset.maxMargin);
      }
    }

    return margin + baseMargin;
  }

  /**
   * Calculate bottom margin considering device-specific factors and user configuration
   */
  private calculateBottomMargin(
    deviceInfo: DeviceInfo,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): number {
    const baseMargin = 16;
    let margin = Math.max(
      safeAreaInsets.bottom,
      deviceInfo.homeIndicatorHeight
    );

    // Add device-specific adjustments (can be disabled via verticalOffset.adaptToDevice)
    const shouldAdaptToDevice = config?.verticalOffset?.adaptToDevice !== false;

    if (shouldAdaptToDevice) {
      // Add extra margin for gesture-based navigation
      if (!deviceInfo.hasHomeButton) {
        margin += 8;
      }
    }

    // Apply user-defined vertical offsets
    if (config?.verticalOffset) {
      // Apply global and position-specific offsets
      if (config.verticalOffset.global) {
        margin += config.verticalOffset.global;
      }
      if (config.verticalOffset.bottom) {
        margin += config.verticalOffset.bottom;
      }

      // Apply min/max margin constraints
      if (config.verticalOffset.minMargin !== undefined) {
        margin = Math.max(margin, config.verticalOffset.minMargin);
      }
      if (config.verticalOffset.maxMargin !== undefined) {
        margin = Math.min(margin, config.verticalOffset.maxMargin);
      }
    }

    return margin + baseMargin;
  }

  /**
   * Get base horizontal and vertical margins for different device types
   */
  private getBaseMargins(deviceInfo: DeviceInfo): {
    horizontal: number;
    vertical: number;
  } {
    if (
      deviceInfo.deviceType === 'ipad' ||
      deviceInfo.deviceType === 'android-tablet'
    ) {
      return { horizontal: 24, vertical: 20 };
    }

    return { horizontal: 16, vertical: 16 };
  }

  /**
   * Get device-specific optimizations
   */
  private getDeviceOptimizations(deviceInfo: DeviceInfo): Record<string, any> {
    const optimizations: Record<string, any> = {};

    if (deviceInfo.hasDynamicIsland) {
      optimizations.avoidDynamicIsland = true;
      optimizations.preferredAnimationDuration = 400;
    }

    if (deviceInfo.hasNotch) {
      optimizations.avoidNotch = true;
    }

    if (
      deviceInfo.deviceType === 'ipad' ||
      deviceInfo.deviceType === 'android-tablet'
    ) {
      optimizations.allowWiderToasts = true;
      optimizations.maxWidth = Math.min(400, deviceInfo.screenWidth * 0.6);
    }

    return optimizations;
  }

  /**
   * Quick position calculation for when device info is already cached
   */
  calculatePositionSync(
    preferredPosition: ToastPosition,
    safeAreaInsets: SafeAreaInsets,
    config?: ToastProviderConfig
  ): SafeAreaCalculation | null {
    const deviceInfo = this.deviceDetector.getCachedDeviceInfo();
    if (!deviceInfo) {
      return null;
    }

    if (preferredPosition === 'top' || preferredPosition === 'bottom') {
      return this.calculateConcretePosition(
        preferredPosition,
        deviceInfo,
        safeAreaInsets,
        config
      );
    }

    return this.calculateSmartPosition(deviceInfo, safeAreaInsets, config);
  }
}
