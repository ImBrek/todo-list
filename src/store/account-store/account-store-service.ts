import { User } from './account-store-type';

const service = {
  async signIn(username: string, password: string): Promise<User> {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users: Array<User>) => {
        const user = users.find(item => item.username === username);
        if (!user || password.length < 1) return Promise.reject();
        localStorage.setItem('userId', String(user.id));
        return user;
      });
  },
  async logout(): Promise<void> {
    localStorage.removeItem('userId');
    return new Promise(resolve => {
      setTimeout(() => resolve(), 0);
    });
  },
};

export default service;
