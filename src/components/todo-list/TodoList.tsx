import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/ru';

import taskStore from '../../store/task-store/TaskStore';
import TodoItem from '../todo-item';

import './todo-list.css';

const TodoList: FC = observer(() => {
  const {
    addTask,
    changeFilter,
    filteredTasks,
    filterQuery,
    completedTasksCount,
    tasksCount,
  } = taskStore;

  const createTask = () => {
    const taskName = prompt('Введите название');
    if (taskName) addTask(taskName);
  };

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFilter(event.target.value);
  };

  const formatDate = (date: string) => moment(date, 'YYYYMMDD, hh:mm:ss').fromNow();

  return (
    <div className="todo-list">
      <input
        className="todo-list__search"
        type="search"
        placeholder="search"
        value={filterQuery}
        onChange={onChangeFilter}
      />
      <div className="todo-list__items">
        {filteredTasks.map(data => (
          <TodoItem
            title={data.title}
            date={formatDate(data.createdAt)}
            key={data.id}
            completed={data.completed}
            archived={data.archived}
            id={data.id}
          ></TodoItem>
        ))}
      </div>
      <div className="todo-list__footer">
        <button className="todo-list__button" onClick={createTask}>
          новая задача
        </button>
        <div className="todo-list__complete">
          {completedTasksCount} из {tasksCount} задач выполнены
        </div>
      </div>
    </div>
  );
});

export default TodoList;
