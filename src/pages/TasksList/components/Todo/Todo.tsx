import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { fetchDeleteTask } from '../../../../slices/todo/todo.actions';
import { ITodoProps } from 'pages/TasksList/components/Todo/Todo.type';

export const Todo = ({ item }: ITodoProps) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todo.filter);

  const handleDeleteTodo = (): void => {
    dispatch(fetchDeleteTask({ ...item }, filter));
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        maxHeight: '60px',
        padding: '5px',
        border: '1px solid #2C2C2CA5',
        borderRadius: '5px',
        transition: '0.2s linear all',
        ':hover': {
          boxShadow: '3px 3px 6px 0px rgba(34, 60, 80, 0.2)',
        },
      }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <Typography variant="h6" component="h6" sx={{ flex: '1 1 auto' }}>
          {item.name}
        </Typography>
        <NavLink to={`/task_form/${item.id}`}>
          <EditIcon fontSize="small" color="secondary" />
        </NavLink>
      </Box>
      <Typography component="p">{item.info}</Typography>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <DeleteIcon color="secondary" onClick={handleDeleteTodo} />
        {item.isImportant && <AccessAlarmsIcon color="secondary" sx={{ flex: '1 1 auto' }} />}
        {item.isCompleted ? <DoneAllIcon color="secondary" /> : <RemoveDoneIcon color="secondary" />}
      </Box>
    </Box>
  );
};
