import { GetTasksRequest } from 'types/taskApi';
import { Fields } from 'types/redux';

const params = {
  'All task': {},
  'Done': { isCompleted: true },
  'Not done': { isCompleted: false },
  'Important tasks': { isImportant: true },
  'Not important tasks': { isImportant: false },
  'By name': {},
};
export const getParams = (field: Fields, search?: string): GetTasksRequest => {
  if (field === 'By name') {
    return { name_like: search };
  }
  if (search) {
    return { name_like: search, ...params[field] };
  }
  return { ...params[field] };
};
