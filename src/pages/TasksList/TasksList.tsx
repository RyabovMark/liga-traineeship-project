import React, { useEffect, useState } from 'react';
import { arr as collection } from '../../mocks/mocks.js';
import './TasksList.css';
import { ITodo } from 'pages/TasksList/TasksList.types';
import { NavButton } from 'components/NavButton/NavButton';
import { Loader } from 'components/Loader';

export async function loader(): Promise<ITodo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<ITodo[]>;
}

export const TasksList: React.FC = () => {
  const [doneTodos, setDoneTodos] = useState([] as ITodo[]);
  const [notDoneTodos, setNotDoneTodos] = useState([] as ITodo[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => filterCollection(), 1000);

    function filterCollection(): void {
      const done = collection.filter((el) => el.isCompleted);
      const notDone = collection.filter((el) => !el.isCompleted);
      setDoneTodos(done);
      setNotDoneTodos(notDone);
    }
  }, []);

  useEffect(() => {
    if (doneTodos.length > 0 || notDoneTodos.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [notDoneTodos, doneTodos]);

  return (
    <Loader isLoading={isLoading}>
      <div className="list-container">
        <div className="list-container__done-block">
          <h3>Done</h3>
          {doneTodos.map((todo) => (
            <div key={todo.id}>
              <NavButton to={`/task_form/${todo.id}`} text="Перейти к задаче" state={todo} />
              <p>{`User id:${todo.id}, title:${todo.name}`}</p>
            </div>
          ))}
        </div>
        <div className="list-container__notdone-block">
          <h3>Not done</h3>
          {notDoneTodos.map((todo) => (
            <div key={todo.id}>
              <NavButton to={`/task_form/${todo.id}`} text="Перейти к задаче" state={todo} />
              <p>{`User id:${todo.id}, title:${todo.name}`}</p>
            </div>
          ))}
        </div>
      </div>
    </Loader>
  );
};
