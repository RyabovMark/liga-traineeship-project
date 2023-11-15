import React, { useEffect } from 'react';
import './TaskForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Checkbox, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCreateTask, fetchGetTask, fetchPatchTask } from '../../slices/todo/todo.actions';
import { setTask } from '../../slices/todo/todoSlice';
import { ITaskSubmitForm } from 'types/react-hook-form';
import { Error, Loader } from 'components/index';

export const TaskForm = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    collection: { 'Find one': task },
    loadings,
  } = useAppSelector((state) => state.todo);
  const { value } = useAppSelector((state) => state.error);
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

  const { handleSubmit, watch, reset, control, setValue } = useForm<ITaskSubmitForm>({
    defaultValues: {
      name: '',
      info: '',
      isCompleted: false,
      isImportant: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const done = watch('isCompleted');

  const onSubmit = async (body: ITaskSubmitForm) => {
    if (id) {
      await dispatch(fetchPatchTask({ ...body }, Number(id)));
    } else {
      await dispatch(fetchCreateTask({ ...body }));
    }
    return navigate('..');
  };

  useEffect(() => {
    dispatch(setTask({}));
    id && dispatch(fetchGetTask(id));
  }, []);

  useEffect(() => {
    if (task) {
      setValue('isImportant', task.isImportant || false);
      setValue('isCompleted', task.isCompleted || false);
      setValue('name', task.name || '');
      setValue('info', task.info || '');
    }
  }, [task]);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 140px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Loader isLoading={isLoading}>
        {value ? (
          <Error value={value} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  size="medium"
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  label="Name of task"
                  variant="outlined"
                  sx={{
                    minWidth: '100%',
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="info"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  size="medium"
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  label="Task info"
                  variant="outlined"
                  sx={{
                    minWidth: '100%',
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="isCompleted"
              render={({ field: { value, onChange } }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex start',
                  }}>
                  <Typography sx={{ flex: '0 0 180px' }}>Is it completed task?</Typography>
                  <Checkbox checked={value} onChange={onChange} />
                </Box>
              )}
            />
            <Controller
              control={control}
              name="isImportant"
              render={({ field: { value, onChange } }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex start',
                  }}>
                  <Typography sx={{ flex: '0 0 180px' }}>Is it important task?</Typography>
                  <Checkbox disabled={done} checked={done ? false : value} onChange={onChange} />
                </Box>
              )}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                padding: '0 30px',
              }}>
              <Button variant="contained" size="medium" type="reset" onClick={() => reset()}>
                Reset
              </Button>
              <Button variant="contained" size="medium" type="submit">
                {id ? 'Change' : 'Create'}
              </Button>
            </Box>
          </form>
        )}
      </Loader>
    </Box>
  );
};
