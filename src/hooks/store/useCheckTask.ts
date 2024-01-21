import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';

export function useCheckTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const checkTask = (paramIndex: number, selected: boolean) => {
    setTasks(
      tasks?.map((task, index) => {
        if (index === paramIndex) {
          return {
            ...task,
            done: selected,
          };
        }
        return task;
      }) ?? []
    );
  };
  return {
    checkTask,
  };
}
