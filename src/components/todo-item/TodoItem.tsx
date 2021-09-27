import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import './todo-item.css';
import archive from './img/archive.svg';
import { Task } from '../../store/task-store/taskStoreTypes';

type TodoItemProps = {
  task: Task;
  onClickArchive: React.MouseEventHandler<HTMLInputElement>;
  onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>;
};

const TodoItem: FC<TodoItemProps> = observer(
  ({ task, onClickArchive, onChangeCheckbox }) => {
    const { title, createdAt, completed } = task;

    return (
      <div className="todo-item">
        <div className="todo-item__cell">{title}</div>
        <div className="todo-item__cell">{createdAt}</div>
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
