import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';

export function useDeleteTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const deleteTask = (paramIndex: number) => {
    setTasks(tasks?.filter((_, index) => index !== paramIndex) ?? []);
  };
  return {
    deleteTask,
  };
}
