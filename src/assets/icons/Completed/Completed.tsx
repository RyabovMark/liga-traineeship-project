import React from 'react';
import { IconProps } from 'types/icon';

export const Completed = ({ className, onClick }: IconProps): JSX.Element => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="30px"
      height="30px"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 24L14 34L34 14" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
