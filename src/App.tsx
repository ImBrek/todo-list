import React from 'react';
import { observer } from 'mobx-react-lite';
import './app.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreProvider, useStore } from './store';
import RegistrationPage from './pages/registration';
import TodoListPage from './pages/todo-list';

const App = observer(() => {
  const store = useStore();
  return (
    <StoreProvider store={store}>
      <Router>
        <div className="app">
          <div className="app__container">
            <Switch>
              <Route exact path="/">
                <RegistrationPage></RegistrationPage>
              </Route>
              <Route path="/todo-list">
                <TodoListPage></TodoListPage>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
});

export default App;
