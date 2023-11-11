import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGetTask } from '../../slices/todo/todo.actions';

export const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    collection: { 'Find one': task },
  } = useAppSelector((state) => state.todo);

  useEffect(() => {
    if (id) {
      dispatch(fetchGetTask(id));
    }
  }, [id]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={() => {
            return;
          }}
        />
        <select
          name="info"
          onChange={() => {
            return;
          }}
          value={task.info}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select
          name="isCompleted"
          onChange={() => {
            return;
          }}
          value={''}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select
          name="isImportant"
          onChange={() => {
            return;
          }}
          value={''}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit">{task ? 'Send' : 'Change'}</button>
      </form>
    </div>
  );
};
