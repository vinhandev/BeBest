import { today } from '~/constants';
import { useUserStore } from '~/stores';
import { checkNotSameDate, isToday, log } from '~/utils';

export function useGetHomeInformation() {
  const tasks = useUserStore((state) => state.tasks);
  const meals = useUserStore((state) => state.meals);
  const bodies = useUserStore((state) => state.bodies);
  const faces = useUserStore((state) => state.faces);
  const updateWeightTime = useUserStore(
    (state) => state.profile?.updateWeightTime ?? 0
  );
  const updateHeightTime = useUserStore(
    (state) => state.profile?.updateHeightTime ?? 0
  );
  const isUpdateWeight = !checkNotSameDate(new Date(updateWeightTime), today);
  const isUpdateHeight = !checkNotSameDate(new Date(updateHeightTime), today);

  const todayTasks = [...(tasks?.filter((item) => isToday(item.time)) ?? [])];
  const sortTasks = todayTasks.sort((a, b) => {
    if (a.type === 'HABIT' && b.type === 'TASK') return -1;
    if (b.type === 'HABIT' && a.type === 'TASK') return 1;
    return 0;
  });
  const todayFace = faces?.find((item) => isToday(item.time));
  const todayBody = bodies?.find((item) => isToday(item.time));
  const todayMeals = meals?.filter((item) => isToday(item.time));
  const totalProgress = 4 + todayTasks.length;

  let done = 0;
  if (!!todayFace) {
    done += 1;
  }
  if (!!todayBody) {
    done += 1;
  }
  if (todayMeals?.length !== 0) {
    done += 1;
  }
  if (isUpdateWeight) {
    done += 1;
  }
  if (todayTasks.length !== 0) {
    const doneTasks = todayTasks?.filter((item) => item.done).length ?? 0;
    done += doneTasks;
  }

  log.debug(
    'hmm',
    done,
    totalProgress,
    Math.round((done / totalProgress) * 100)
  );

  const progress = Math.round((done / totalProgress) * 100);

  log.debug(todayFace, todayBody);

  return {
    tasks: sortTasks,
    face: todayFace,
    body: todayBody,
    meals: todayMeals,
    progress,
    isUpdateWeight,
    isUpdateHeight,
  };
}
