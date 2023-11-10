import React from 'react';
import { IconProps } from 'types/icon';

export const BotArrow = ({ className, onClick }: IconProps): JSX.Element => {
  return (
    <svg onClick={onClick} className={className} viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        d="M12 4V20M12 20L8 16M12 20L16 16"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
