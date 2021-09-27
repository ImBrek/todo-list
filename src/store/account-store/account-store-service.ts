const service = {
  async signIn(username: string, password: string): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users: Array<any>) => {
        const user = users.find(item => item.username === username);
        if (!user || password !== '123') return Promise.reject();
        localStorage.setItem('userId', user.id);
        return user;
      });
  },
  async logout(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 0);
    });
  },
};

export default service;
