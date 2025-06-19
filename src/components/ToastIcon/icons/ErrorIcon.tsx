import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface ErrorIconProps {
  iconSize: number;
  iconColor: string;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({
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
      {/* X mark */}
      <Path
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
