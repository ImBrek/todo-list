import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import taskStore from '../../store/task-store/TaskStore';

import './todo-item.css';
import archive from './img/archive.svg';

type TodoItemProps = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  archived?: boolean;
};

const TodoItem: FC<TodoItemProps> = observer(
  ({ title, date, completed, id, archived }) => {
    const [checked, setChecked] = useState(completed);

    const { updateStatus, removeTask } = taskStore;

    const onChangeCheckbox = () => {
      setChecked(!checked);
    };

    const onClickArchive = () => {
      removeTask({ id, archived: true });
    };

    useEffect(() => {
      updateStatus({ id, completed: checked });
    }, [checked]);

    if (archived) return null;

    return (
      <div className="todo-item">
        <div className="todo-item__cell">{title}</div>
        <div className="todo-item__cell">{date}</div>
        <div className="todo-item__cell">
          <input
            className="todo-item__checkbox"
            type="checkbox"
            checked={completed}
            onChange={onChangeCheckbox}
          />
        </div>
        <div className="todo-item__cell">
          <input
            className="todo-item__archive"
            type="image"
            src={archive}
            alt="archive"
            onClick={onClickArchive}
          />
        </div>
      </div>
    );
  },
);

export default TodoItem;
