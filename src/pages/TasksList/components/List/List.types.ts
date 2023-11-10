import { Fields } from 'types/redux';

export interface ITasksListProp {
  header: Fields;
  display: boolean;
  onToggle(arg1: boolean, arg2: number): void
}
