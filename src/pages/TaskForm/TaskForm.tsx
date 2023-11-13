import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGetTask, fetchPatchTask } from '../../slices/todo/todo.actions';
import { ITaskSubmitForm } from 'types/react-hook-form';
import { Loader } from 'components/Loader';

export const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    collection: { 'Find one': task },
    loadings,
  } = useAppSelector((state) => state.todo);
  const isLoading = loadings['Find one'];

  // const defaultValues: ITaskSubmitForm = {
  //   name: task.name ? task.name : '',
  //   info: task.info ? task.info : '',
  //   isCompleted: task.isCompleted || false,
  //   isImportant: task.isImportant || false,
  // };

  const defaultValues = useMemo(() => {
    return {
      name: task.name ? task.name : '',
      info: task.info ? task.info : '',
      isCompleted: task.isCompleted || false,
      isImportant: task.isImportant || false,
    };
  }, [task]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('The name of the task is a required field')
      .min(6, 'Name must be at least 6 characters')
      .max(20, 'Name must not exceed 20 characters'),
    info: Yup.string()
      .required('The info of the task is a required field')
      .min(6, 'Info must be at least 6 characters')
      .max(40, 'Info must not exceed 40 characters'),
    isCompleted: Yup.bool().required('Required field'),
    isImportant: Yup.bool()
      .required('Required field')
      .oneOf([defaultValues.isCompleted], 'The task cannot be marked as important because it is marked as completed'),
  });

  const { register, handleSubmit, reset, control, setValue } = useForm<ITaskSubmitForm>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (body: ITaskSubmitForm) => {
    dispatch(fetchPatchTask(body));
    navigate('/');
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);
  const onInfoChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);
  //
  const onCompletedChange = (e: ChangeEvent<HTMLSelectElement>) => setValue('isCompleted', JSON.parse(e.target.value));
  const onImportantChange = (e: ChangeEvent<HTMLSelectElement>) => setValue('isImportant', JSON.parse(e.target.value));

  useEffect(() => {
    id && dispatch(fetchGetTask(id));
  }, []);

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
            name="isCompleted"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <select name="isImportant" onChange={onImportantChange} value={String(field.value)}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            )}
          />
          <button type="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit">{task ? 'Send' : 'Change'}</button>
        </form>
      </div>
    </Loader>
  );
};
