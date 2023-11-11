import React from 'react';
import { IconProps } from 'types/icon';

export const Delete = ({ className, onClick }: IconProps): JSX.Element => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="30px"
      height="30px"
      fill="#212529"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
    </svg>
  );
};
