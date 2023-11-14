import React, { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCreateTask, fetchGetTask, fetchPatchTask } from '../../slices/todo/todo.actions';
import { setTask } from '../../slices/todo/todoSlice';
import { ITaskSubmitForm } from 'types/react-hook-form';
import { Loader } from 'components/Loader';

export const TaskForm = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    collection: { 'Find one': task },
    loadings,
  } = useAppSelector((state) => state.todo);
  const isLoading = loadings['Find one'];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('The name of the task is a required field')
      .min(6, 'Name must be at least 6 characters')
      .max(20, 'Name must not exceed 20 characters'),
    info: Yup.string()
      .required('The info of the task is a required field')
      .min(6, 'Info must be at least 6 characters')
      .max(40, 'Info must not exceed 40 characters'),
    isCompleted: Yup.bool(),
    isImportant: Yup.bool(),
  });

  const { formState, handleSubmit, reset, control, setValue } = useForm<ITaskSubmitForm>({
    defaultValues: {
      name: '',
      info: '',
      isCompleted: false,
      isImportant: false,
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (body: ITaskSubmitForm) => {
    if (id) {
      await dispatch(fetchPatchTask({ ...body }, Number(id)));
    } else {
      await dispatch(fetchCreateTask({ ...body }));
    }
    return navigate('..');
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);
  const onInfoChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);
  //
  const onCompletedChange = (e: ChangeEvent<HTMLSelectElement>) => setValue('isCompleted', JSON.parse(e.target.value));
  const onImportantChange = (e: ChangeEvent<HTMLSelectElement>) => setValue('isImportant', JSON.parse(e.target.value));

  useEffect(() => {
    dispatch(setTask({}));
    id && dispatch(fetchGetTask(id));
  }, []);

  useEffect(() => {
    if (task) {
      reset({
        name: task.name,
        info: task.info,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
      });
    }
  }, [task]);

  return (
    <Loader isLoading={isLoading}>
      <div className="task-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onNameChange}
                  type="text"
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onInfoChange}
                  type="text"
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
          <Controller
            name="isCompleted"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <select name="isCompleted" onChange={onCompletedChange} value={String(field.value)}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            )}
          />
          <Controller
            name="isImportant"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <select
                name="isImportant"
                disabled={formState.dirtyFields.isImportant}
                onChange={onImportantChange}
                value={String(field.value)}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            )}
          />
          <button type="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit">{id ? 'Change' : 'Create'}</button>
        </form>
      </div>
    </Loader>
  );
};
