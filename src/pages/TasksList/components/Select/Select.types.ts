import { Fields } from 'types/redux';

export interface SelectProps {
  headers: ISelected[];
  // onToggle(arg1: number): void;
  className?: string;
}

export interface ISelected {
  title: Fields;
  id: number;
}
