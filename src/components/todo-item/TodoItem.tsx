import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import taskStore from '../../store/task-store/TaskStore';

import './todo-item.css';
import archive from './img/archive.svg';

type TodoItemProps = {
  title: string;
  date: string;
  completed: boolean;
  id: number;
  // onClick: any;
  // changeStatus: Promise<void>;
  // updateStatus: (task: Task) => Promise<void>;
};

const TodoItem: FC<TodoItemProps> = observer(({ title, date, completed, id }) => {
  const [checked, setChecked] = useState(completed);

  const { updateStatus, removeTask } = taskStore;

  const onChange = () => {
    setChecked(!checked);
  };

  const onClick = () => {
    removeTask(id);
  };

  useEffect(() => {
    updateStatus({ id, title, completed: checked });
  }, [checked]);

  return (
    <div className="todo-item">
      <div className="todo-item__cell">{title}</div>
      <div className="todo-item__cell">{date}</div>
      <div className="todo-item__cell">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={completed}
          onChange={onChange}
        />
      </div>
      <div className="todo-item__cell">
        <input
          className="todo-item__archive"
          type="image"
          src={archive}
          alt="archive"
          onClick={onClick}
        />
      </div>
    </div>
  );
});

export default TodoItem;
