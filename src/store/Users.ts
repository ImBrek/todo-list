import moment from 'moment';
import 'moment/locale/ru';

class Users {
  name = '';

  surname = '';

  tasks: data[] = [
    {
      name: 'Купить колбасу',
      date: moment('20210925, 00:00:00', 'YYYYMMDD, hh:mm:ss'),
      complete: true,
    },
    {
      name: 'Посетить спортзал',
      date: moment('20210925, 01:00:00', 'YYYYMMDD, hh:mm:ss'),
      complete: true,
    },
    {
      name: 'Найти работу',
      date: moment('20210925, 01:30:00', 'YYYYMMDD, hh:mm:ss'),
      complete: false,
    },
    {
      name: 'Прочитать что-то',
      date: moment('20210925, 02:00:00', 'YYYYMMDD, hh:mm:ss'),
      complete: false,
    },
  ];

  archivedTasks: data[] = [];

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  getTasks(): Promise<data[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.tasks), 100);
    });
  }

  addTasks(data: data): Promise<unknown> {
    this.tasks.push(data);
    return new Promise(resolve => {
      setTimeout(() => resolve(data), 100);
    });
  }

  updateStatus(data: data): void {
    this.tasks = this.tasks.map(task => {
      if (JSON.stringify(task) === JSON.stringify(data)) return data;
      return task;
    });
  }

  archiveTask(data: data): void {
    this.archivedTasks.push(data);
    this.tasks = this.tasks.filter(task => {
      return JSON.stringify(task) !== JSON.stringify(data);
    });
  }
}

export default Users;
