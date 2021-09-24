import React, { FC, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Account from '../../components/account';
import TodoList from '../../components/todo-list';
import { useStore } from '../../store';

const TodoListPage: FC = () => {
  const store = useStore();
  useEffect(() => {
    store.getUserData();
  }, [store, store.completedTasksCount, store.tasksCount]);
  return (
    <>
      {store.isAuthorized ? (
        <div className="todo-list-container">
          <Account
            name={store.user?.name ?? ''}
            surname={store.user?.surname ?? ''}
          ></Account>
          <TodoList
            completedTasks={store.completedTasksCount}
            tasks={store.tasksCount}
          ></TodoList>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default TodoListPage;
