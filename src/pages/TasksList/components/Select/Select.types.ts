import { Fields } from 'types/redux';

export interface SelectProps {
  headers: ISelected[];
  onToggle(arg1: boolean, arg2: number): void;
  className?: string
}

export interface ISelected {
  title: Fields;
  select: boolean;
  id: number;
}
