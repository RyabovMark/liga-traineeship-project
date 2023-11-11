import React from 'react';
import './Todo.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/redux';
import { fetchDeleteTask } from '../../../../slices/todo/todo.actions';
import { Clock, Completed, Delete, Edit, NotDone } from 'assets/icons';
import { ITodoProps } from 'pages/TasksList/components/Todo/Todo.type';

export const Todo = ({ item: { id, isImportant, isCompleted, info, name }, header }: ITodoProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (): void => {
    dispatch(fetchDeleteTask(String(id), header));
  };

  return (
    <div className="todo">
      <div className="todo__title">
        <h6>{name ? name : 'task has no any title'}</h6>
        <NavLink to={`/task_form/${id}`}>
          <Edit />
        </NavLink>
      </div>
      <p>{info ? info : 'task has no any text'}</p>
      <div className="todo__indicators">
        <div className="indicators__delete-container">
          <Delete onClick={handleDeleteTodo} />
        </div>
        {isImportant && <Clock className="indicators__clock" />}
        {isCompleted ? <Completed className="indicators__done" /> : <NotDone className="indicators__not-done" />}
      </div>
    </div>
  );
};
