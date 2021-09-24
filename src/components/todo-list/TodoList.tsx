import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useStore } from '../../store';
import TodoItem from '../todo-item';
import './todo-list.css';

type TodoListProps = {
  completedTasks: number;
  tasks: number;
};

const TodoList: FC<TodoListProps> = observer(({ completedTasks, tasks }) => {
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
        {texts.map((data, index) => (
          <TodoItem
            text={data.name}
            date={`${data.date}мин назад`}
            key={data.date}
            onClick={() => store.removeTask(index)}
          ></TodoItem>
        ))}
      </div>
      <div className="todo-list__footer">
        <button className="todo-list__button" onClick={() => store.addTask()}>
          новая задача
        </button>
        <div className="todo-list__complete">
          {completedTasks} из {tasks} задач выполнены
        </div>
      </div>
    </div>
  );
});

// const texts = [
//   ["Купить колбасу", "40 мин назад"],
//   ["Посетить спортзал", "1 час назад"],
//   ["Найти работу", "1 мин назад"],
//   ["Прочитать что-то", "5 дней назад"],
// ];
export default TodoList;
