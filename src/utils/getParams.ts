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
