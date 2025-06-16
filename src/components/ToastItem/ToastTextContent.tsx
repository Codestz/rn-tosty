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
    <View style={textContainerStyle}>
      {toast.config.title && (
        <Text style={titleStyle} numberOfLines={2}>
          {toast.config.title}
        </Text>
      )}
      <Text style={messageStyle} numberOfLines={getMessageLines()}>
        {toast.config.message}
      </Text>
    </View>
  );
};
