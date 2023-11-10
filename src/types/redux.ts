import { store } from '../store';
import { GetTasksResponse } from 'types/taskApi';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ICollection {
  collection: {
    'All task': GetTasksResponse;
    'Done': GetTasksResponse;
    'Not Done': GetTasksResponse;
    'Important tasks': GetTasksResponse;
    'Not important tasks': GetTasksResponse;
    'By name': GetTasksResponse;
  };
  loadings: {
    'All task': boolean;
    'Done': boolean;
    'Not Done': boolean;
    'Important tasks': boolean;
    'Not important tasks': boolean;
    'By name': boolean;
  };
  popupLoading: boolean;
}

export type Fields = 'All task' | 'Done' | 'Not Done' | 'Important tasks' | 'Not important tasks' | 'By name';

export interface SetTasksPayload {
  data: GetTasksResponse;
  field: Fields;
}

export interface ToggleLoadingsPayload {
  value: boolean;
  field: Fields;
}