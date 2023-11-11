import { Dispatch } from 'redux';
import { setError } from '../errorSlice';
import { setPopupLoading, setTask, setTasks, toggleLoading } from './todoSlice';
import Tasks from 'api/tasks';
import { Fields } from 'types/redux';
import { DeleteTaskRequest, PatchTaskRequest, PostTaskRequest } from 'types/taskApi';
import { getParams } from 'utils/getParams';

export const fetchGetTasksCollection =
  (field: Fields = 'All task', search?: string) =>
  async (dispatch: Dispatch) => {
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
  (id: DeleteTaskRequest, field: Fields = 'All task') =>
  async (dispatch: Dispatch) => {
    dispatch(setPopupLoading(true));
    dispatch(toggleLoading({ value: true, field }));
    try {
      await Tasks.deleteOne(id);
      const { data } = await Tasks.getMany(getParams(field));
      if (Array.isArray(data)) {
        dispatch(setTasks({ data, field }));
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
      dispatch(setError({ message: 'Произошла ошибка' }));
    } finally {
      dispatch(toggleLoading({ value: false, field }));
      dispatch(setPopupLoading(false));
    }
  };

export const fetchPatchTask = (body: PatchTaskRequest) => async (dispatch: Dispatch) => {
  // dispatch(toggleLoading({ value: true, field }));
  try {
    await Tasks.postTask(body);
    const { data } = await Tasks.patchTask(body);
    dispatch(setTask({ data }));
  } catch (e) {
    console.error(e);
    dispatch(setError({ message: 'Произошла ошибка' }));
  }
  // finally {
  //   dispatch(toggleLoading({ value: false, field }));
  // }
};

export const fetchCreateTask = (body: PostTaskRequest, field: Fields) => async (dispatch: Dispatch) => {
  dispatch(toggleLoading({ value: true, field }));
  try {
    await Tasks.postTask(body);
    const { data } = await Tasks.getMany(getParams(field));
    if (Array.isArray(data)) {
      dispatch(setTasks({ data, field }));
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error(e);
    dispatch(setError({ message: 'Произошла ошибка' }));
  } finally {
    dispatch(toggleLoading({ value: false, field }));
  }
};
