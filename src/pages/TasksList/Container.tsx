import React from 'react';
import './Container.css';
import { useAppSelector } from '../../hooks/redux';
import { List } from 'pages/TasksList/components/List/List';
import { Select } from 'pages/TasksList/components/Select/Select';
import { ISelected } from 'pages/TasksList/components/Select/Select.types';

const listsHeaders: ISelected[] = [
  { title: 'All task', id: 1 },
  { title: 'Done', id: 2 },
  { title: 'Not done', id: 3 },
  { title: 'Important tasks', id: 4 },
  { title: 'Not important tasks', id: 5 },
];
export const Container = (): JSX.Element => {
  const filter = useAppSelector((state) => state.todo.filter);

  return (
    <div className="list">
      <Select headers={listsHeaders} className="list__select" />
      <div className="list-container">
        {listsHeaders.map((list) => list.title === filter && <List key={list.id} header={list.title} />)}
      </div>
    </div>
  );
};
