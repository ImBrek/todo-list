import React, { FC, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Profile from '../../components/profile';
import TodoList from '../../components/todo-list';
import accountStore from '../../store/account-store/AccountStore';
import taskStore from '../../store/task-store/TaskStore';

import './todo-list-page.css';

const TodoListPage: FC = () => {
  const { isAuth, user, logout } = accountStore;
  const { retrieveTasks } = taskStore;

  useEffect(() => {
    retrieveTasks();
  }, []);

  return (
    <>
      {isAuth && user ? (
        <div className="todo-list-container">
          <Profile user={user} logout={logout} />
          <TodoList />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default TodoListPage;
