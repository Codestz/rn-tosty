// Gesture Type Definitions
export interface SwipeGestureConfig {
  enabled?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down' | 'all';
  minDistance?: number;
  minVelocity?: number;
  onSwipe?: (direction: string) => void;
}

export interface LongPressGestureConfig {
  enabled?: boolean;
  minDuration?: number;
  maxDistance?: number;
  onLongPress?: () => void;
}

export interface TapGestureConfig {
  enabled?: boolean;
  numberOfTaps?: number;
  onTap?: () => void;
}

export interface PanGestureConfig {
  enabled?: boolean;
  minDistance?: number;
  onPanStart?: () => void;
  onPanUpdate?: (translation: { x: number; y: number }) => void;
  onPanEnd?: () => void;
}

export interface MultiGestureConfig {
  enabled?: boolean;
  simultaneousGestures?: string[];
  exclusiveGestures?: string[];
}

export interface GestureConfig {
  swipe?: SwipeGestureConfig;
  longPress?: LongPressGestureConfig;
  tap?: TapGestureConfig;
  pan?: PanGestureConfig;
  multiGesture?: MultiGestureConfig;
}

export type GestureType = 'swipe' | 'longPress' | 'tap' | 'pan';

export interface GestureEvent {
  type: GestureType;
  timestamp: number;
  data: any;
}
