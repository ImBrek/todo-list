import './todo-item.css';
import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import archive from './img/archive.svg';
import { useStore } from '../../store';

type TodoItemProps = {
  text: string;
  date: string;
  onClick: any;
};

const TodoItem: FC<TodoItemProps> = observer(({ text, date, onClick }) => {
  const store = useStore();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    checked ? store.addCompletedTasks() : store.removeCompletedTasks();
  }, [checked, store]);
  return (
    <div className="todo-item">
      <div className="todo-item__text">{text}</div>
      <div className="todo-item__text">{date}</div>
      <div className="todo-item__input">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>
      <div className="todo-item__input">
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
