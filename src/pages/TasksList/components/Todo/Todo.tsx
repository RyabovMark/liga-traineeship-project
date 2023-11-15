import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const Todo = () => {
  const { id } = useParams();

  return (
    <div>
      <Link to={`/task_form/${id}`} state={id}>
        Редактировать #{id}
      </Link>
    </div>
  );
};
