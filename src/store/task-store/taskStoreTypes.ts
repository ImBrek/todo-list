export type Task = {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
  archived?: boolean;
};

export type RawTask = {
  id: number;
  title: string;
  completed: boolean;
  userId: string;
};
