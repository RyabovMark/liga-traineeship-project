import React, { useState } from 'react';
import './Container.css';
import { ITask } from 'types/task';
import { List } from 'pages/TasksList/components/List/List';
import { Select } from 'pages/TasksList/components/Select/Select';
import { ISelected } from 'pages/TasksList/components/Select/Select.types';

export async function loader(): Promise<ITask[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<ITask[]>;
}

export const Container: React.FC = () => {
  const [listsHeaders, setListsHeaders] = useState<ISelected[]>([
    { title: 'All task', select: true, id: 1 },
    { title: 'Done', select: false, id: 2 },
    { title: 'Not Done', select: false, id: 3 },
    { title: 'Important tasks', select: false, id: 4 },
    { title: 'Not important tasks', select: false, id: 5 },
  ]);

  const listsHeadersWithoutAll = listsHeaders.filter((header) => header.title !== 'All task');

  const inputToggle = (value: boolean, id: number) => {
    setListsHeaders(
      listsHeaders.map((title) => {
        if (title.id === id) {
          return { ...title, select: value };
        } else {
          return title;
        }
      })
    );
  };

  // const deleteFromScreen = (id: number) => {};

  return (
    <div className="list">
      <Select headers={listsHeadersWithoutAll} onToggle={inputToggle} className="list__select" />
      <div className="list-container">
        {listsHeaders.map(
          (list) =>
            list.select && (
              <List key={list.id} id={list.id} header={list.title} display={list.select} onToggle={inputToggle} />
            )
        )}
      </div>
    </div>
  );
};
