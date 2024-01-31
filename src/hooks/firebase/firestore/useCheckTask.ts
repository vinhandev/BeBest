import { tasksCollection } from '~/services';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { log } from '~/utils';

export function useCheckTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const checkTask = async (time: number, selected: boolean) => {
    const response = await tasksCollection.where('time', '==', time).get();
    await tasksCollection.doc(response.docs[0].id).update({
      done: selected,
    });
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
