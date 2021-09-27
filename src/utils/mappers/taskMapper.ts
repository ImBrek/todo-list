import { RawTask, Task } from '../../store/task-store/task-store-models';

const taskMapper = (rawTask: RawTask): Task => {
  const randomNumber = Math.floor(Math.random() * 10);
  return {
    id: rawTask.id,
    completed: rawTask.completed,
    title: rawTask.title,
    createdAt: `20210927, 1${randomNumber}:20:00`,
  };
};

export default taskMapper;
