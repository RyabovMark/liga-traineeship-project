import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { List, Select } from './index';
import { ISelected } from 'pages/TasksList/components/Select/Select.types';

const listsHeaders: ISelected[] = [
  { title: 'All task', id: 1 },
  { title: 'Done', id: 2 },
  { title: 'Not done', id: 3 },
  { title: 'Important tasks', id: 4 },
  { title: 'Not important tasks', id: 5 },
];

export const TaskList = (): JSX.Element => {
  const filter = useAppSelector((state) => state.todo.filter);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '80%',
        margin: '0 auto',
      }}>
      <Select headers={listsHeaders} />
      {listsHeaders.map((list) => list.title === filter && <List key={list.id} header={list.title} />)}
    </Box>
  );
};
