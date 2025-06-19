/**
 * Error Boundary for Toast Components
 * Provides graceful error handling and fallback UI for toast-related errors
 */
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { logCritical } from '../../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ToastErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error for debugging and crash reporting
    logCritical('Toast component error caught by error boundary', error);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send this to a crash reporting service if needed
    // Example: Crashlytics.recordError(error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI - minimal toast-like appearance
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Toast Error</Text>
          <Text style={styles.errorSubtext}>Something went wrong</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    minHeight: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  errorSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
});
