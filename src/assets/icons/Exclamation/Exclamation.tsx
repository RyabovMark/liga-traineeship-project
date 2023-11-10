import React from 'react';
import { IconProps } from 'types/icon';

export const Exclamation = ({ className, onClick }: IconProps): JSX.Element => {
  return (
    <svg onClick={onClick} className={className} viewBox="2 2 25 25" xmlns="http://www.w3.org/2000/svg" fill="#fff">
      <path
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
        d="M12,17.0015 C13.3813,17.0015 14.5011,18.1213 14.5011,19.5026 C14.5011,20.8839 13.3813,22.0037 12,22.0037 C10.6187,22.0037 9.49888,20.8839 9.49888,19.5026 C9.49888,18.1213 10.6187,17.0015 12,17.0015 Z M11.999,2.00244 C14.1393,2.00244 15.8744,3.7375 15.8744,5.87781 C15.8744,8.71128 14.8844,12.4318 14.339,14.2756 C14.0294,15.322 13.0657,16.0039 12.0006,16.0039 C10.9332,16.0039 9.96846,15.3191 9.65995,14.2708 L9.43749451,13.4935787 C8.88270062,11.4994608 8.12366,8.3311 8.12366,5.87781 C8.12366,3.7375 9.85872,2.00244 11.999,2.00244 Z"></path>
    </svg>
  );
};
