import { store } from '../store';
import { GetTaskResponse, GetTasksResponse } from 'types/taskApi';

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
    'Find one': GetTaskResponse;
  };
  loadings: {
    'All task': boolean;
    'Done': boolean;
    'Not Done': boolean;
    'Important tasks': boolean;
    'Not important tasks': boolean;
    'By name': boolean;
    'Find one': boolean;
  };
  popupLoading: boolean;
}

export type Fields = 'All task' | 'Done' | 'Not Done' | 'Important tasks' | 'Not important tasks' | 'By name';

// | 'Find one';

export interface SetTasksPayload {
  data: GetTasksResponse;
  field: Fields | 'Find one';
}

export interface SetTaskPayload {
  data: GetTaskResponse;
}

export interface ToggleLoadingsPayload {
  value: boolean;
  field: Fields | 'Find one';
}
