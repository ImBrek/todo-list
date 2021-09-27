import React from 'react';
import { observer } from 'mobx-react-lite';
import './app.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationPage from './pages/registration';
import TodoListPage from './pages/todo-list';

const App = observer(() => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <RegistrationPage></RegistrationPage>
          </Route>
          <Route path="/todo-list">
            <TodoListPage></TodoListPage>
          </Route>
        </Switch>
      </div>
    </Router>
  );
});

export default App;
