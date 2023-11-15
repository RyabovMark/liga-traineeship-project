export interface ITaskSubmitForm {
  name: string;
  info: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export interface ISearchSubmitForm {
  search: string | number;
}
