import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Tooltip, Typography } from '@mui/material';
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
        flexDirection: 'row',
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
          flexDirection: 'column',
          flex: '1 1 auto',
        }}>
        <Typography variant="h6" component="h6" sx={{ flex: '1 1 auto', fontStyle: 'italic' }}>
          {item.name}
        </Typography>
        <Typography component="p">{item.info}</Typography>
      </Box>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'end',
          flex: '0 0 100',
        }}>
        <NavLink to={`/task_form/${item.id}`}>
          <Tooltip title="Edit" placement="right-start">
            <EditIcon fontSize="small" color="secondary" />
          </Tooltip>
        </NavLink>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item.isImportant && (
            <Tooltip title="Important task" placement="left-end">
              <AccessAlarmsIcon color="secondary" fontSize="small" sx={{ flex: '1 1 auto' }} />
            </Tooltip>
          )}
          {item.isCompleted ? (
            <Tooltip title="Done task" placement="left">
              <DoneAllIcon color="secondary" />
            </Tooltip>
          ) : (
            <Tooltip title="Not done task" placement="right">
              <RemoveDoneIcon color="secondary" />
            </Tooltip>
          )}
          <Tooltip title="Delete" placement="bottom-end">
            <DeleteIcon color="secondary" onClick={handleDeleteTodo} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
