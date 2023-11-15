import { paths } from 'types/api';

export type GetTasksResponse = paths['/tasks']['get']['responses'][200]['content']['application/json'];
export type GetTasksRequest = paths['/tasks']['get']['parameters']['query'];

export type GetTaskResponse = paths['/tasks/{taskId}']['get']['responses'][200]['content']['application/json'];
export type GetTaskRequest = paths['/tasks/{taskId}']['get']['parameters']['path']['taskId'];

export type PatchTaskRequest = paths['/tasks/{taskId}']['patch']['requestBody']['content']['application/json'];
export type PatchTaskResponse = paths['/tasks/{taskId}']['patch']['responses'][200]['content']['application/json'];

export type DeleteTaskResponse = paths['/tasks/{taskId}']['delete']['parameters']['path'];
export type DeleteTaskRequest =
  paths['/tasks/{taskId}']['delete']['responses'][200]['content']['application/json; charset=utf-8'];

export type PostTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
export type PostTaskRequest = paths['/tasks']['post']['requestBody']['content']['application/json'];
