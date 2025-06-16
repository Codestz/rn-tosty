// Safe Area Type Definitions
export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface DeviceInfo {
  platform: 'ios' | 'android';
  model: string;
  brand: string;
  deviceId: string;
  systemVersion: string;
  deviceType: DeviceType;
  screenWidth: number;
  screenHeight: number;
  screenData: any;
  hasNotch: boolean;
  hasHomeButton: boolean;
  hasDynamicIsland: boolean;
  hasSpecialScreen: boolean;
  statusBarHeight: number;
  homeIndicatorHeight: number;
}

export interface SafeAreaConfig {
  enabled: boolean;
  adaptToDevice: boolean;
  customInsets?: Partial<SafeAreaInsets>;
  minMargin?: number;
  maxMargin?: number;
}

export type DeviceType =
  | 'iphone-se'
  | 'iphone-standard'
  | 'iphone-notch'
  | 'iphone-dynamic-island'
  | 'ipad'
  | 'android-standard'
  | 'android-punch-hole'
  | 'android-tablet'
  | 'unknown';

export interface SafeAreaCalculation {
  position: 'top' | 'bottom';
  topMargin: number;
  bottomMargin: number;
  leftMargin: number;
  rightMargin: number;
  maxWidth: number;
  recommendedPosition: 'top' | 'center' | 'bottom';
  deviceOptimizations: Record<string, any>;
}
