import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';

export function useDeleteTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const deleteTask = (paramIndex: number, task: TaskPropsType) => {
    setTasks(
      tasks?.filter(
        (item) => item.time !== task.time && item.doneTime !== task.doneTime
      ) ?? []
    );
  };
  return {
    deleteTask,
  };
}
