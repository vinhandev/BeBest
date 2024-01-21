import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';

export function useAddNewTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const addTask = (task: TaskPropsType) => {
    setTasks([...(tasks ?? []), task]);
  };
  return {
    addTask,
  };
}
