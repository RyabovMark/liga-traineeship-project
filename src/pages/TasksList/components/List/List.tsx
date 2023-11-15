import { ChangeEvent, memo, useEffect } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import { fetchGetTasksCollection } from '../../../../slices/todo/todo.actions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setCurrentPage } from '../../../../slices/todo/todoSlice';
import { Loader, Error } from 'components/index';
import { ITasksListProp } from 'pages/TasksList/components/List/List.types';
import { Todo } from 'pages/TasksList/components/Todo/Todo';

const ListTask = ({ header }: ITasksListProp): JSX.Element => {
  const dispatch = useAppDispatch();
  const { collection, loadings, filter, searchBy } = useAppSelector((state) => state.todo);
  const { value } = useAppSelector((state) => state.error);
  const { currentPage } = useAppSelector((state) => state.todo);
  const tasks = collection['By name'].length ? collection['By name'] : collection[filter];
  const isLoading = loadings[header];

  const taskPerPage = 6;
  const indexOfLastTask = currentPage * taskPerPage;
  const indexOfFirstTask = indexOfLastTask - taskPerPage;
  const currentTask = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  useEffect(() => {
    dispatch(fetchGetTasksCollection(header, searchBy));
  }, [searchBy]);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        margin: '0 auto',
        alignItems: 'center',
        minHeight: { xs: 'calc(100vh - 270px)', md: 'calc(100vh - 200px)' },
        maxHeight: { xs: 'calc(100vh - 270px)', md: 'calc(100vh - 200px)' },
      }}>
      {value ? (
        <Error value={value} />
      ) : (
        <>
          <Box
            sx={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
            <Loader isLoading={isLoading}>
              {!value && currentTask.map((item) => <Todo key={item.id} item={item} />)}
            </Loader>
          </Box>
          <Box component="div">
            {tasks.length >= 10 && (
              <Stack spacing={1}>
                <Pagination
                  color="secondary"
                  shape="rounded"
                  defaultPage={1}
                  count={Math.ceil(tasks.length / taskPerPage)}
                  page={currentPage}
                  onChange={handleChange}
                />
              </Stack>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export const List = memo(ListTask);
