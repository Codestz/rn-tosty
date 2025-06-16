// WarningIcon - Triangle icon for warning toasts
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface WarningIconProps {
  iconSize: number;
  iconColor: string;
}

export const WarningIcon: React.FC<WarningIconProps> = ({
  iconSize,
  iconColor,
}) => {
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
      {/* Triangle outline and exclamation mark */}
      <Path
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
