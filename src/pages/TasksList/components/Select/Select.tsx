import React, { useEffect, useRef, useState } from 'react';
import './Select.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setFilter } from '../../../../slices/todo/todoSlice';
import { SelectProps } from 'pages/TasksList/components/Select/Select.types';
import { BotArrow, TopArrow } from 'assets/icons';

export const Select = ({ headers, className }: SelectProps): JSX.Element => {
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const classes = `dropdown ${className}`;
  const fieldRef = useRef<HTMLFieldSetElement>(null);

  const mouseMoveHandle = (): void => {
    setDisplayDropdown((prevState) => !prevState);
  };

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.addEventListener('mouseover', mouseMoveHandle);
      return () => document.removeEventListener('mouseenter', mouseMoveHandle);
    }
  }, []);

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.addEventListener('mouseout', mouseMoveHandle);
      return () => document.removeEventListener('mouseout', mouseMoveHandle);
    }
  }, []);

  return (
    <fieldset className={classes} ref={fieldRef}>
      <button onClick={mouseMoveHandle}>--Select a task list--{displayDropdown ? <TopArrow /> : <BotArrow />}</button>
      {displayDropdown && (
        <div className="dropdown__panel">
          {headers.map((title) => (
            <div className="dropdown__panel-field" key={title.id}>
              <input
                id={`input-${title.title}`}
                checked={title.title === filter}
                type="checkbox"
                onChange={() => dispatch(setFilter(title.title))}
              />
              <label htmlFor={`input-${title.title}`}>{title.title}</label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};
