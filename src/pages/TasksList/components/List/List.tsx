import './List.css';
import { useEffect, useRef } from 'react';
import { fetchGetTasksCollection } from '../../../../slices/todo/todo.actions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { Loader } from 'components/Loader';
import { ITasksListProp } from 'pages/TasksList/components/List/List.types';
import { NavButton } from 'components/NavButton';
import { Todo } from 'pages/TasksList/components/Todo/Todo';

export const List = ({ header, display }: ITasksListProp): JSX.Element => {
  const dispatch = useAppDispatch();
  const { collection, loadings } = useAppSelector((state) => state.todo);
  const className = `task-list ${display ? 'task-list--display' : 'task-list--none'} `;
  const tasks = collection[header];
  const isLoading = loadings[header];
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (display) {
      dispatch(fetchGetTasksCollection(header));
    }
  }, []);

  return (
    <div className={className}>
      <h3>{header}</h3>
      <div className="task-list__todo-container" ref={listRef}>
        <Loader isLoading={isLoading}>
          {tasks.map((item) => (
            <Todo key={item.id} item={item} header={header} />
          ))}
        </Loader>
      </div>
      <div>
        <button>Remove list</button>
        <NavButton to="/task_form" text="Add a new card" state={{ header }} />
      </div>
    </div>
  );
};
