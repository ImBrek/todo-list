import './todo-item.css';
import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import archive from './img/archive.svg';
import { useStore } from '../../store';

type TodoItemProps = {
  name: string;
  date: string;
  complete: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const TodoItem: FC<TodoItemProps> = observer(({ name, date, complete, onClick }) => {
  const [checked, setChecked] = useState(complete);
  const store = useStore();

  useEffect(() => {
    checked ? store.addCompletedTasks() : store.removeCompletedTasks();
  }, [checked, store]);

  return (
    <div className="todo-item">
      <div className="todo-item__cell">{name}</div>
      <div className="todo-item__cell">{date}</div>
      <div className="todo-item__cell">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
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
