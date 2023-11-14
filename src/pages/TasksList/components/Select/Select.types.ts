import { Fields } from 'types/redux';

export interface SelectProps {
  headers: ISelected[];
}

export interface ISelected {
  title: Fields;
  id: number;
}
