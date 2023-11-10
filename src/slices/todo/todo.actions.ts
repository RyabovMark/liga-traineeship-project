import { Dispatch } from 'redux';
import { setError } from '../errorSlice';
import { setPopupLoading, setTasks, toggleLoading } from './todoSlice';
import Tasks from 'api/tasks';
import { Fields } from 'types/redux';
import { DeleteTaskRequest, PostTaskRequest } from 'types/taskApi';
import { getParams } from 'utils/getParams';

export const fetchGetTasksCollection =
  (field: Fields = 'All task', search?: string) =>
  async (dispatch: Dispatch) => {
    dispatch(toggleLoading({ value: true, field }));
    try {
      const { data } = await Tasks.getMany(getParams(field, search));
      if (Array.isArray(data)) {
        console.log(data);
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

export const fetchCrateTask = (body: PostTaskRequest, field: Fields) => async (dispatch: Dispatch) => {
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
