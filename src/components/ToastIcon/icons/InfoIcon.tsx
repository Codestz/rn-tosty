// InfoIcon - Circle with i icon for info toasts
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface InfoIconProps {
  iconSize: number;
  iconColor: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ iconSize, iconColor }) => {
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
      {/* Info symbol - dot and line */}
      <Path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M12 8.25h.008v.008H12V8.25Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
