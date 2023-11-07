/* eslint-disable no-unused-vars */
import { RefObject } from 'react';

export interface SearchInputProps {
  onChange: (text: string) => void;
  value: string;
  onReset?: () => void;
}

export type InputRef = RefObject<HTMLInputElement>;
