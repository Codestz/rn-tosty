/**
 * Accessibility configuration types for rn-tosty
 * Provides customizable accessibility behavior
 */

export interface AccessibilityConfig {
  /**
   * Whether accessibility features are enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Custom accessibility labels for different toast types
   */
  customLabels?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };

  /**
   * Whether to announce toasts immediately (assertive) or politely
   * @default 'auto' - assertive for errors/warnings, polite for others
   */
  announceMode?: 'auto' | 'assertive' | 'polite';

  /**
   * Custom accessibility hints
   */
  customHints?: {
    dismissible?: string;
    autoDismiss?: string;
    permanent?: string;
  };

  /**
   * Whether to include toast type in the accessibility label
   * @default true
   */
  includeTypeInLabel?: boolean;

  /**
   * Whether to include duration information in accessibility hint
   * @default false
   */
  includeDurationInHint?: boolean;
}

export const DEFAULT_ACCESSIBILITY_CONFIG: Required<AccessibilityConfig> = {
  enabled: true,
  customLabels: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  },
  announceMode: 'auto',
  customHints: {
    dismissible: 'Tap to dismiss',
    autoDismiss: 'Will auto-dismiss',
    permanent: 'Tap to dismiss',
  },
  includeTypeInLabel: true,
  includeDurationInHint: false,
};
