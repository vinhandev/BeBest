import { BusinessRules, FixedSizes } from '~/constants';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';

export function useAddNewTask() {
  const tasks = useUserStore((state) => state.tasks);
  const setTasks = useUserStore((state) => state.setTasks);
  const addTask = (task: TaskPropsType) => {
    if (task.type === 'TASK') {
      setTasks([...(tasks ?? []), task]);
    } else {
      let tmpTasks: TaskPropsType[] = [];
      const date = new Date();
      for (let index = 0; index < BusinessRules.dayOfHabits; index++) {
        tmpTasks.push({
          ...task,
          description:`(${index+1}/${BusinessRules.dayOfHabits}) ${task.description}`.trim(),
          time: date.getTime(),
        });
        date.setDate(date.getDate() + 1);

      }
      setTasks([...(tasks ?? []), ...tmpTasks]);
    }
  };
  return {
    addTask,
  };
}
