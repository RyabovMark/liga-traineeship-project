import React, { createRef, useEffect, useState } from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';
import { UseDebounce } from '../../../../hooks/useDebounce';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { NavButton } from 'components/NavButton';

export const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  const [to, setTo] = useState('/task_form');
  const [linkDesc, setLinkDesc] = useState('Создать задачу');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const debounceValue = UseDebounce<string>(searchValue);

  const reset = (): void => {
    setSearchValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    console.log('скоро здесь будет тригер для сортировки запроса');
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
    <header className="header">
      <NavButton to={to} text={linkDesc} />
      {pathname === '/tasks_list' && (
        <SearchInput onChange={setSearchValue} value={searchValue} onReset={reset} ref={inputRef} />
      )}
    </header>
  );
};
