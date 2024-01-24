import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { log } from '~/utils';

export function useCheckTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const checkTask = (time: number, selected: boolean) => {
    setTasks(
      tasks?.map((task, index) => {
        if (task.time === time) {
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
