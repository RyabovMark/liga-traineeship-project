import React from 'react';
import './Todo.css';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
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
        width: '80%',
        maxWidth: '800px',
      }}>
      <div className="todo__title">
        <h6>{item.name}</h6>
        <NavLink to={`/task_form/${item.id}`}>{/*<Edit />*/}link</NavLink>
      </div>
      <p>{item.info}</p>
      <div className="todo__indicators">
        <div className="indicators__delete-container">{/*<Delete onClick={handleDeleteTodo} />*/}</div>
        {/*{item.isImportant && <Clock className="indicators__clock" />}*/}
        {/*{item.isCompleted ? <Completed className="indicators__done" /> : <NotDone className="indicators__not-done" />}*/}
      </div>
    </Box>
  );
};
