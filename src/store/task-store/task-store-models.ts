export type Task = {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
};

export type RawTask = {
  id: number;
  title: string;
  completed: boolean;
  userId: string;
};

export type TaskRequest = Omit<Task, 'id'>;
