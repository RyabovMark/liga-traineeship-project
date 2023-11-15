import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { UseDebounce } from '../../../../hooks/useDebounce';
import { useAppDispatch } from '../../../../hooks/redux';
import { setSearchBy } from '../../../../slices/todo/todoSlice';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { NavButton } from 'components/index';

export const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [to, setTo] = useState('/task_form');
  const [linkDesc, setLinkDesc] = useState('Создать задачу');
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = UseDebounce<string>(searchValue);

  useEffect(() => {
    dispatch(setSearchBy(debounceValue));
  }, [debounceValue]);

  useEffect(() => {
    if (pathname === '/tasks_list') {
      setTo('/task_form');
      setLinkDesc('Create a task');
    }
    if (pathname !== '/tasks_list') {
      setTo('/tasks_list');
      setLinkDesc('Back to homepage');
    }
  }, [pathname]);

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
      {/*<Button variant="contained">{linkDesc}</Button>*/}
      <NavButton to={to} text={linkDesc}>
        {pathname !== '/tasks_list' ? <HomeIcon fontSize="small" /> : <AddIcon fontSize="small" />}
      </NavButton>
      {pathname === '/tasks_list' && <SearchInput onChange={setSearchValue} value={searchValue} />}
    </Box>
  );
};
