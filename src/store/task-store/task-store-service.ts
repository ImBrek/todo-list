import taskMapper from '../../utils/mappers/taskMapper';
import { RawTask, Task } from './task-store-models';

const service = {
  async retrieveTasks(): Promise<Array<Task>> {
    const userId = localStorage.getItem('userId');
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then(response => response.json())
      .then((tasks: Array<RawTask>) => {
        return tasks.map(item => taskMapper(item));
      });
  },

  async addTask(title: string): Promise<Task> {
    const userId = localStorage.getItem('userId');
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        userId,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(rawTask => {
        return taskMapper(rawTask);
      });
  },

  async updateTask(task: Task): Promise<void> {
    const { id, completed } = task;

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },

  async deleteTask(id: number): Promise<void> {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
  },
};

export default service;
