import { ChangeEventHandler } from 'react';

export interface IStateProp {
  'name': string;
  'info': string;
  'isCompleted': string;
  'isImportant': string;
  'id'?: number;
}

export type FormHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
