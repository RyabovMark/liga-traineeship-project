import { params } from 'constants/params';
import { GetTasksRequest } from 'types/taskApi';

export const getParams = (field: string, search?: string): GetTasksRequest => {
  if (field === 'By name') {
    return { name_like: search };
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return params[field];
};

type GetFieldType = { isImportant?: boolean; isCompleted?: boolean };

enum GetFieldOutput {
  important = 'Important tasks',
  notImportant = 'Not important tasks',
  done = 'Done',
  notDone = 'Not Done',
}

export const getField = (value: GetFieldType): GetFieldOutput | undefined => {
  if (value.isImportant) {
    return GetFieldOutput.important;
  }
  if (!value.isImportant) {
    return GetFieldOutput.notImportant;
  }
  if (value.isCompleted) {
    return GetFieldOutput.done;
  }
  if (!value.isCompleted) {
    return GetFieldOutput.notDone;
  }
};
