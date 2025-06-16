// SuccessIcon - Checkmark icon for success toasts
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface SuccessIconProps {
  iconSize: number;
  iconColor: string;
}

export const SuccessIcon: React.FC<SuccessIconProps> = ({
  iconSize,
  iconColor,
}) => {
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
      {/* Outer circle */}
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke={iconColor}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Checkmark */}
      <Path
        d="M9 12.75 11.25 15 15 9.75"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
