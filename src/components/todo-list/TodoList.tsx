import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useStore } from '../../store';
import TodoItem from '../todo-item';
import './todo-list.css';

const TodoList: FC = observer(() => {
  const store = useStore();
  const { tasksName } = store;
  const [texts, setTexts] = useState(tasksName);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const regexp = new RegExp(searchValue, 'gi');
    const newList = tasksName.filter(data => data.name.match(regexp));
    setTexts(newList);
  }, [searchValue]);

  useEffect(() => {
    setTexts(tasksName);
  }, [store, tasksName]);

  useEffect(() => {
    store.getUserData();
  }, [store]);

  return (
    <div className="todo-list">
      <input
        className="todo-list__search"
        type="search"
        placeholder="search"
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      <div className="todo-list__items">
        {texts.map(data => (
          <TodoItem
            name={data.name}
            date={data.date.fromNow()}
            key={data.date.fromNow()}
            complete={data.complete}
            onClick={() => store.removeTask(data)}
          ></TodoItem>
        ))}
      </div>
      <div className="todo-list__footer">
        <button className="todo-list__button" onClick={() => store.addTask()}>
          новая задача
        </button>
        <div className="todo-list__complete">
          {store.completedTasksCount} из {store.tasksCount} задач выполнены
        </div>
      </div>
    </div>
  );
});

export default TodoList;
