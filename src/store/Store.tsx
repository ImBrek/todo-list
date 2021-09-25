/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { createContext, FC, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

import moment from 'moment';
import User from './Users';
import 'moment/locale/ru';

class Store {
  isAuthorized = false;

  name = '';

  surname = '';

  completedTasksCount = 0;

  tasksName: data[] = [];

  archivedTasks: data[] = [];

  tasksCount: number = this.tasksName.length;

  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initUser(name: string, surname: string): void {
    this.user = new User(name, surname);
    this.name = this.user.name;
    this.surname = this.user.surname;
  }

  async getUserData(): Promise<void> {
    if (!this.user) return;
    try {
      const data = await this.user.getTasks();
      this.tasksName = data;
      this.tasksCount = data.length;
      let count = 0;
      data.forEach(task => {
        if (task.complete) count += 1;
      });
      this.completedTasksCount = count;
    } catch (error) {
      console.log(error);
    }
  }

  addTask(): void {
    if (!this.user) return;
    const taskName = prompt('Название задачи', '');
    const now = moment();
    try {
      if (taskName)
        this.user.addTasks({
          name: taskName,
          date: moment(now, 'YYYYMMDD, hh:mm:ss'),
          complete: false,
        });
      this.getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  removeTask(task: data): void {
    if (!this.user) return;
    try {
      this.user.archiveTask(task);
      this.getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  updateStatus(task: data): void {
    this.completedTasksCount += 1;
    if (!this.user) return;
    try {
      this.user.updateStatus(task);
      this.getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  addCompletedTasks(): void {
    this.completedTasksCount += 1;
  }

  removeCompletedTasks(): void {
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
