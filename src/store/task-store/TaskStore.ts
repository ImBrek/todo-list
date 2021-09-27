/* eslint-disable no-console */
import { makeObservable, runInAction, observable, action, computed } from 'mobx';

import { Task } from './taskStoreTypes';
import service from './taskStoreService';

class TaskStore {
  tasks: Array<Task> = [];

  filterQuery = '';

  constructor() {
    makeObservable(this, {
      tasks: observable,
      filterQuery: observable,
      completedTasksCount: computed,
      tasksCount: computed,
      filteredTasks: computed,
      changeFilter: action.bound,
      retrieveTasks: action.bound,
      addTask: action.bound,
      updateStatus: action.bound,
      removeTask: action.bound,
    });
  }

  get tasksCount() {
    return this.filteredTasks.length;
  }

  get filteredTasks() {
    const regexp = new RegExp(this.filterQuery, 'gi');
    return this.tasks.filter(item => item.title.match(regexp));
  }

  get completedTasksCount() {
    return this.filteredTasks.filter(item => item.completed).length;
  }

  changeFilter(value: string) {
    runInAction(() => {
      this.filterQuery = value;
    });
  }

  async retrieveTasks(): Promise<void> {
    try {
      runInAction(async () => {
        this.tasks = await service.retrieveTasks();
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async addTask(taskName: string): Promise<void> {
    try {
      const newTask = await service.addTask(taskName);
      runInAction(() => {
        this.tasks = [...this.tasks, newTask];
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async removeTask(task: Partial<Task>): Promise<void> {
    try {
      await service.updateTask(task);
      const newTasks = this.tasks.filter(item => item.id !== task.id);
      runInAction(() => {
        this.tasks = newTasks;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateStatus(task: Partial<Task>): Promise<void> {
    try {
      const newTasks = this.tasks.map(item => {
        if (item.id === task.id) {
          return { ...item, ...task };
        }
        return { ...item };
      });
      runInAction(() => {
        this.tasks = [...newTasks];
      });
      await service.updateTask(task);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new TaskStore();
