import { makeObservable, runInAction, observable, action, computed } from 'mobx';

import { Task } from './taskStoreTypes';
import service from './taskStoreService';
import formattedDate from '../../utils/formatDate';

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
      archiveTask: action.bound,
    });
  }

  get tasksCount() {
    return this.filteredTasks.length;
  }

  get filteredTasks() {
    const regexp = new RegExp(this.filterQuery, 'gi');
    const tasks = this.tasks
      .filter(item => item.title.match(regexp))
      .filter(item => !item.archived);
    return tasks;
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
      const tasks = await service.retrieveTasks();
      runInAction(async () => {
        this.tasks = tasks;
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async addTask(taskName: string): Promise<void> {
    try {
      const newTask = await service.addTask(taskName);
      const newTaskWithDate = {
        ...newTask,
        createdAt: formattedDate.dateNow(),
      };
      console.log(newTaskWithDate);
      runInAction(() => {
        this.tasks = [...this.tasks, newTaskWithDate];
      });
    } catch (e) {
      console.error('error', e);
    }
  }

  async archiveTask(task: Partial<Task>): Promise<void> {
    try {
      await service.updateTask(task);
    } catch (error) {
      console.error(error);
    } finally {
      const newTasks = this.tasks.filter(item => item.id !== task.id);
      runInAction(() => {
        this.tasks = newTasks;
      });
    }
  }

  async updateStatus(task: Partial<Task>): Promise<void> {
    try {
      await service.updateTask(task);
    } catch (error) {
      console.error(error);
    } finally {
      const newTasks = this.tasks.map(item => {
        if (item.id === task.id) {
          return { ...item, ...task };
        }
        return { ...item };
      });
      runInAction(() => {
        this.tasks = [...newTasks];
      });
    }
  }
}

export default new TaskStore();
