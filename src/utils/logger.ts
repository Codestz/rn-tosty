/**
 * Production-ready logging utility for rn-tosty
 * Provides controlled logging that can be disabled in production
 */

export interface LoggerConfig {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix: string;
}

class Logger {
  private config: LoggerConfig = {
    enabled: __DEV__, // Only enabled in development by default
    level: 'warn',
    prefix: 'rn-tosty',
  };

  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: LoggerConfig['level']): boolean {
    if (!this.config.enabled) return false;

    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex;
  }

  private formatMessage(level: string, message: string): string {
    return `[${this.config.prefix}:${level.toUpperCase()}] ${message}`;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), ...args);
    }
  }

  /**
   * Special method for critical errors that should always be logged
   * regardless of configuration (for production error tracking)
   */
  critical(message: string, error?: Error): void {
    const formattedMessage = this.formatMessage('critical', message);
    console.error(formattedMessage, error);

    // In production, you might want to send this to a crash reporting service
    // Example: Crashlytics.recordError(error || new Error(message));
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, ...args: any[]) =>
  logger.debug(message, ...args);
export const logInfo = (message: string, ...args: any[]) =>
  logger.info(message, ...args);
export const logWarn = (message: string, ...args: any[]) =>
  logger.warn(message, ...args);
export const logError = (message: string, ...args: any[]) =>
  logger.error(message, ...args);
export const logCritical = (message: string, error?: Error) =>
  logger.critical(message, error);
