import React, { createContext, FC, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

import User from './Users';

type data = { name: string; date: number };

class Store {
  isAuthorized = false;

  completedTasksCount = 0;

  tasksName: { name: string; date: number }[] = [];

  archivedTasks: { name: string; date: number }[] = [];

  tasksCount: number = this.tasksName.length;

  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addNewUser(name: string, surname: string) {
    this.user = new User(name, surname);
  }

  getUserData() {
    this.user?.getTasks().then((data: any) => (this.tasksName = data));
  }

  addTask() {
    const taskName = prompt('Название задачи', '');
    this.tasksCount += 1;
    const now = new Date().getMinutes();
    console.log(now);
    if (taskName) this.tasksName.push({ name: taskName, date: now });
  }

  removeTask(index: number) {
    const archivedTasks = this.tasksName.splice(index, 1);
    this.archivedTasks.push(archivedTasks[0]);
    this.tasksCount -= 1;
  }

  addCompletedTasks() {
    this.completedTasksCount += 1;
  }

  removeCompletedTasks() {
    if (this.completedTasksCount === 0) return;
    this.completedTasksCount -= 1;
  }
}

const StoreContext = createContext<Store>(new Store());

const StoreProvider: FC<{ store: Store }> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

const useStore: () => Store = () => {
  return useContext(StoreContext);
};

export { Store, StoreProvider, useStore };
