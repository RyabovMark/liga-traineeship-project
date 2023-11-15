import axios, { AxiosResponse } from 'axios';
import {
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetTaskRequest,
  GetTaskResponse,
  GetTasksRequest,
  GetTasksResponse,
  PatchTaskResponse,
  PostTaskRequest,
  PostTaskResponse,
} from 'types/taskApi';

export const axiosInstance = axios.create({
  baseURL: 'http://37.220.80.108/tasks',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  responseType: 'json',
  transformResponse: [
    (data) => {
      const response = JSON.parse(data);
      if (Array.isArray(response)) {
        const collection = response.filter(({ id, isCompleted, info, name, isImportant }: GetTaskResponse) => {
          return id && name && info && typeof isCompleted === 'boolean' && typeof isImportant === 'boolean';
        });
        return collection.reverse();
      }
      return JSON.parse(data);
    },
  ],
});

export default {
  postTask: async function (body: PostTaskRequest): Promise<AxiosResponse<PostTaskResponse>> {
    return await axiosInstance.post('', { ...body });
  },
  getOne: async function (id: GetTaskRequest): Promise<AxiosResponse<GetTaskResponse>> {
    return await axiosInstance.get(`${id}`);
  },
  getMany: async function (parameters: GetTasksRequest): Promise<AxiosResponse<GetTasksResponse>> {
    return await axiosInstance.get('', {
      params: { ...parameters },
    });
  },
  patchTask: async function (body: GetTaskResponse): Promise<AxiosResponse<PatchTaskResponse>> {
    return await axiosInstance.patch(`${body.id}`, { ...body });
  },
  deleteOne: async function (id: DeleteTaskRequest): Promise<AxiosResponse<DeleteTaskResponse>> {
    return await axiosInstance.delete(`${id}`);
  },
};
