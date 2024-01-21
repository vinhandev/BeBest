export type TaskType = 'HABIT' | 'TASK';
export type TaskPropsType = {
  time: number;
  type: TaskType;
  description: string;
  done: boolean;
  doneTime: number;
};
