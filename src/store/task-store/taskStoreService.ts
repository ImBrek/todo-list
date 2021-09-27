import taskMapper from '../../utils/taskMapper';
import { RawTask, Task } from './taskStoreTypes';

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

  async updateTask(task: Partial<Task>): Promise<Task> {
    const { id, completed, archived } = task;
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed,
        archived,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(updatedTask => updatedTask);
  },

  async deleteTask(id: number): Promise<Task> {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(deleteTask => deleteTask);
  },
};

export default service;
