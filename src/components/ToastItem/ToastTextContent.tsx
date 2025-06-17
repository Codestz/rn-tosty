/**
 * Toast Text Content - Handles title and message text rendering
 */
import React from 'react';
import { Text, View } from 'react-native';
import type { Toast } from '../../types/ToastTypes';

interface ToastTextContentProps {
  toast: Toast;
  textContainerStyle: any[];
  titleStyle: any[];
  messageStyle: any[];
  getMessageLines: () => number;
}

export const ToastTextContent: React.FC<ToastTextContentProps> = ({
  toast,
  textContainerStyle,
  titleStyle,
  messageStyle,
  getMessageLines,
}) => {
  return (
    <View
      style={textContainerStyle}
      // Hide from accessibility since parent container provides the full accessible text
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
    >
      {toast.config.title && (
        <Text
          style={titleStyle}
          numberOfLines={2}
          // Individual text elements are hidden since parent provides combined text
          accessible={false}
        >
          {toast.config.title}
        </Text>
      )}
      <Text
        style={messageStyle}
        numberOfLines={getMessageLines()}
        // Individual text elements are hidden since parent provides combined text
        accessible={false}
      >
        {toast.config.message}
      </Text>
    </View>
  );
};
