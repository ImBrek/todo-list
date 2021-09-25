import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import './todo-list-page.css';
import Account from '../../components/account';
import TodoList from '../../components/todo-list';
import { useStore } from '../../store';

const TodoListPage: FC = () => {
  const store = useStore();

  return (
    <>
      {store.isAuthorized ? (
        <div className="todo-list-container">
          <Account name={store.name ?? ''} surname={store.surname ?? ''}></Account>
          <TodoList></TodoList>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default TodoListPage;
