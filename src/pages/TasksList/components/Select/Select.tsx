import React, { useState } from 'react';
import './Select.css';
import { SelectProps } from 'pages/TasksList/components/Select/Select.types';
import { BotArrow, TopArrow } from 'assets/icons';

const el = [];
export const Select = ({ headers, onToggle }: SelectProps): JSX.Element => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  return (
    <fieldset className="dropdown">
      <button onClick={() => setDisplayDropdown((prevState) => !prevState)}>
        --Select a task list--{displayDropdown ? <TopArrow /> : <BotArrow />}
      </button>
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
