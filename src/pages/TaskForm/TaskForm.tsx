import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from 'pages/TasksList/components/Todo/Todo';
import { FormHandler, IStateProp } from 'pages/TaskForm/TaskForm.types';

export const TaskForm = () => {
  const { state } = useLocation();
  // const navigate = useNavigate();
  const [task, setTask] = useState<IStateProp>({
    'name': '',
    'info': 'false',
    'isCompleted': 'false',
    'isImportant': 'false',
  });

  const handlerForm: FormHandler = (e): void => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    if (state) {
      setTask(state);
    }
  }, []);

  return (
    <div>
      <form>
        <input type="text" name="name" value={task.name} onChange={handlerForm} />
        <select name="info" onChange={handlerForm} value={task.info}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isCompleted" onChange={handlerForm} value={task.isCompleted}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isImportant" onChange={handlerForm} value={task.isImportant}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit">{task ? 'Send' : 'Change'}</button>
      </form>
    </div>
  );
};
