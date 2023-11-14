import './List.css';
import { useEffect, useRef } from 'react';
import { fetchGetTasksCollection } from '../../../../slices/todo/todo.actions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { Loader } from 'components/Loader';
import { ITasksListProp } from 'pages/TasksList/components/List/List.types';
import { Todo } from 'pages/TasksList/components/Todo/Todo';

export const List = ({ header }: ITasksListProp): JSX.Element => {
  const dispatch = useAppDispatch();
  const { collection, loadings, filter, searchBy } = useAppSelector((state) => state.todo);
  const { value } = useAppSelector((state) => state.error);
  const className = `task-list ${header === filter ? 'task-list--display' : 'task-list--none'} `;
  const tasks = collection['By name'].length ? collection['By name'] : collection[filter];
  const isLoading = loadings[header];
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchGetTasksCollection(header, searchBy));
  }, [searchBy]);

  return (
    <div className={className}>
      <h3>{header}</h3>
      <div className="task-list__todo-container" ref={listRef}>
        <Loader isLoading={isLoading}>{!value && tasks.map((item) => <Todo key={item.id} item={item} />)}</Loader>
      </div>
    </div>
  );
};
