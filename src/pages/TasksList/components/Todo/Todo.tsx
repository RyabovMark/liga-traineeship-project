import React from 'react';
import './Todo.css';
import { useAppDispatch } from '../../../../hooks/redux';
import { fetchDeleteTask } from '../../../../slices/todo/todo.actions';
import { NavButton } from 'components/NavButton';
import { Exclamation } from 'assets/icons';
import { ITodoProps } from 'pages/TasksList/components/Todo/Todo.type';

export const Todo = ({ item: { id, isImportant, name }, header }: ITodoProps) => {
  const dispatch = useAppDispatch();

  // const filterBy = useAppSelector((state) => state.todo.filterBy);

  const handleDeleteTodo = (): void => {
    dispatch(fetchDeleteTask(String(id), header));
  };

  return (
    <div className="todo">
      <h6>{name}</h6>
      <NavButton to={`/task_form/${id}`} text={`Change task #${id}`} state={id} />
      {isImportant && <Exclamation />}
      <Exclamation onClick={handleDeleteTodo} />
    </div>
  );
};
