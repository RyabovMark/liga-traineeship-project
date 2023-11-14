import React, { createRef, useCallback, useEffect, useState } from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { UseDebounce } from '../../../../hooks/useDebounce';
import { useAppDispatch } from '../../../../hooks/redux';
import { setSearchBy } from '../../../../slices/todo/todoSlice';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { NavButton } from 'components/NavButton';

export const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [to, setTo] = useState('/task_form');
  const [linkDesc, setLinkDesc] = useState('Создать задачу');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const debounceValue = UseDebounce<string>(searchValue);

  const reset = useCallback(() => {
    setSearchValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    dispatch(setSearchBy(debounceValue));
  }, [debounceValue]);

  useEffect(() => {
    if (pathname === '/tasks_list') {
      setTo('/task_form');
      setLinkDesc('Создать задачу');
    }
    if (pathname !== '/tasks_list') {
      setTo('/tasks_list');
      setLinkDesc('Вернуться на главную');
    }
  }, [pathname]);

  return (
    <Box component="header">
      <NavButton to={to} text={linkDesc} />
      {pathname === '/tasks_list' && (
        <SearchInput onChange={setSearchValue} value={searchValue} onReset={reset} ref={inputRef} />
      )}
    </Box>
  );
};
