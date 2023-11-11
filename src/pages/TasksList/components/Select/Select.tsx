import React, { useEffect, useRef, useState } from 'react';
import './Select.css';
import { SelectProps } from 'pages/TasksList/components/Select/Select.types';
import { BotArrow, TopArrow } from 'assets/icons';

export const Select = ({ headers, onToggle, className }: SelectProps): JSX.Element => {
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
          {headers.map((obj) => (
            <div className="dropdown__panel-field" key={obj.id}>
              <input
                id={`input-${obj.title}`}
                checked={obj.select}
                type="checkbox"
                onChange={(e) => onToggle(e.target.checked, obj.id)}
              />
              <label htmlFor={`input-${obj.title}`}>{obj.title}</label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};
