import { Fields } from 'types/redux';

export interface SelectProps {
  headers: ISelected[];

  onToggle(arg1: boolean, arg2: number): void;
}

export interface ISelected {
  title: Fields;
  select: boolean;
  id: number;
}
