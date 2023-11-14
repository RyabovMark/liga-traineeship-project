import { Dispatch } from 'redux';
import { setError } from '../errorSlice';
import { setPopupLoading, setTask, setTasks, toggleLoading } from './todoSlice';
import Tasks from 'api/tasks';
import { Fields } from 'types/redux';
import { GetTaskResponse, PatchTaskRequest, PostTaskRequest } from 'types/taskApi';
import { getParams } from 'utils/getParams';

export const fetchGetTasksCollection = (field: Fields, search?: string) => async (dispatch: Dispatch) => {
  dispatch(toggleLoading({ value: true, field }));
  try {
    const { data } = await Tasks.getMany(getParams(field, search));
    if (Array.isArray(data)) {
      dispatch(setTasks({ data, field }));
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error(e);
    dispatch(
      setError({
        message: `Произошла ошибка при получении коллекции ${field}`,
      })
    );
  } finally {
    dispatch(toggleLoading({ value: false, field }));
  }
};

export const fetchGetTask = (id: string) => async (dispatch: Dispatch) => {
  dispatch(toggleLoading({ value: true, field: 'Find one' }));
  try {
    const { data } = await Tasks.getOne(id);
    if (data) {
      dispatch(setTask({ data }));
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error(e);
    dispatch(setError({ message: `Произошла ошибка при получении информации о задаче с id:${id}` }));
  } finally {
    dispatch(toggleLoading({ value: false, field: 'Find one' }));
  }
};

export const fetchDeleteTask =
  (task: GetTaskResponse, field: Fields = 'All task') =>
  async (dispatch: Dispatch) => {
    dispatch(setPopupLoading(true));
    dispatch(toggleLoading({ value: true, field }));
    try {
      await Tasks.deleteOne(String(task.id));
      const { data } = await Tasks.getMany(getParams(field));
      if (Array.isArray(data)) {
        dispatch(setTasks({ data, field }));
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
      dispatch(setError({ message: 'Произошла ошибка при удалении задачи' }));
    } finally {
      dispatch(toggleLoading({ value: false, field }));
      dispatch(setPopupLoading(false));
    }
  };

export const fetchPatchTask =
  (body: PatchTaskRequest, id: number | undefined = undefined) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await Tasks.patchTask({ ...body, id: id });
      dispatch(setTask({ data }));
    } catch (e) {
      console.error(e);
      dispatch(setError({ message: 'Произошла ошибка при обновлении задачи' }));
    }
  };

export const fetchCreateTask = (body: PostTaskRequest) => async (dispatch: Dispatch) => {
  try {
    await Tasks.postTask(body);
  } catch (e) {
    console.error(e);
    dispatch(setError({ message: 'Произошла ошибка при создании задачи' }));
  }
};
