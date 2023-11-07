import React, { ChangeEventHandler, forwardRef, MouseEvent, useRef } from 'react';
import './SearchInput.css';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onChange, value, onReset },
  ref
) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    onChange(evt.target.value);
    if (btnRef.current) {
      btnRef.current.classList.replace('close', 'open');
    }
  };

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (btnRef.current) {
      btnRef.current.classList.replace('open', 'close');
    }
    if (onReset) onReset();
  };

  const onBlurInput = (): void => {
    if (btnRef.current) {
      if (!value.length) {
        btnRef.current.classList.replace('open', 'close');
      }
      return;
    }
  };

  return (
    <div className="search-panel">
      <input
        className="form-control search-input"
        placeholder="Search task"
        ref={ref}
        onChange={onSearchInputChange}
        value={value}
        onBlur={onBlurInput}
      />
      <button ref={btnRef} className="reset-btn close" onClick={onResetBtnClick}>
        <i className="fa fa-close"></i>
      </button>
    </div>
  );
});
