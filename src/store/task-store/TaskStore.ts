/* eslint-disable no-console */
import { makeObservable, runInAction, observable, action, computed } from 'mobx';

import 'moment/locale/ru';
import { Task } from './task-store-models';
import service from './task-store-service';

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

  get completedTasksCount() {
    return this.filteredTasks.filter(item => item.completed).length;
  }

  get filteredTasks() {
    const regexp = new RegExp(this.filterQuery, 'gi');
    return this.tasks.filter(item => item.title.match(regexp));
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

  async removeTask(taskId: number): Promise<void> {
    try {
      await service.deleteTask(taskId);
      runInAction(() => {
        this.tasks = this.tasks.filter(item => item.id !== taskId);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(task: Task): Promise<void> {
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
      console.log(error);
    }
  }
}

export default new TaskStore();
