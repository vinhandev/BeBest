import { BusinessRules, FixedSizes } from '~/constants';
import { tasksCollection } from '~/services';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useGetUserTasks } from './useGetUserTasks';

export function useAddNewTask() {
  const { get } = useGetUserTasks();
  const addTask = async (task: TaskPropsType) => {
    if (task.type === 'TASK') {
      await tasksCollection.add(task);
    } else {
      let tmpTasks: TaskPropsType[] = [];
      const date = new Date();
      for (let index = 0; index < BusinessRules.dayOfHabits; index++) {
        await tasksCollection.add({
          ...task,
          description: `(${index + 1}/${BusinessRules.dayOfHabits}) ${
            task.description
          }`.trim(),
          time: date.getTime(),
        });
        date.setDate(date.getDate() + 1);
      }
    }
    await get();
  };
  return {
    addTask,
  };
}
