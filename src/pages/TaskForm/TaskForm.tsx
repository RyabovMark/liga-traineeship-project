import React, { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Checkbox, TextField } from '@mui/material';
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
  const onCompletedChange = (e: ChangeEvent<HTMLInputElement>) => setValue('isCompleted', e.target.checked);
  const onImportantChange = (e: ChangeEvent<HTMLInputElement>) => setValue('isImportant', e.target.checked);

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
      <Box
        sx={{
          height: 'calc(100vh - 140px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="medium"
                color="secondary"
                value={field.value}
                onChange={onNameChange}
                label="Name of task"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="medium"
                color="secondary"
                value={field.value}
                onChange={onInfoChange}
                label="Task info"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="isCompleted"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Checkbox checked={field.value} onChange={onCompletedChange} />
            )}
          />
          <Controller
            name="isImportant"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Checkbox checked={field.value} onChange={onImportantChange} />
            )}
          />
          <button type="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit">{id ? 'Change' : 'Create'}</button>
        </form>
      </Box>
    </Loader>
  );
};
