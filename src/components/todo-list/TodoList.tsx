import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import taskStore from '../../store/task-store/TaskStore';
import TodoItem from '../todo-item';

import './todo-list.css';
import { Task } from '../../store/task-store/taskStoreTypes';
import formattedDate from '../../utils/formatDate';

const TodoList: FC = observer(() => {
  const {
    addTask,
    updateStatus,
    archiveTask,
    changeFilter,
    filteredTasks,
    filterQuery,
    completedTasksCount,
    tasksCount,
  } = taskStore;

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFilter(event.target.value);
  };

  const createTask = () => {
    const taskName = prompt('Введите название');
    if (taskName) addTask(taskName);
  };

  const onClickArchive = (task: Task) => {
    archiveTask({ ...task, archived: true });
  };

  const onChangeCheckbox = (task: Task) => {
    updateStatus({ ...task, completed: !task.completed });
  };

  const getDate = (createdAt: string) => {
    return {
      createdAt: formattedDate.fromNow(createdAt),
    };
  };

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
        {filteredTasks.map(task => (
          <TodoItem
            task={{ ...task, ...getDate(task.createdAt) }}
            key={task.id}
            onClickArchive={onClickArchive.bind(this, task)}
            onChangeCheckbox={onChangeCheckbox.bind(this, task)}
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
