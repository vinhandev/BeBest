import { useEffect } from 'react';
import { today } from '~/constants';
import { useUserStore } from '~/stores';
import { checkNotSameDate, isToday, log } from '~/utils';

export function useGetHomeInformation() {
  const waterPerDay = useUserStore((state) => state.profile?.waterPerDay);
  const tasks = useUserStore((state) => state.tasks);
  const meals = useUserStore((state) => state.meals);
  const bodies = useUserStore((state) => state.bodies);
  const faces = useUserStore((state) => state.faces);
  const water = useUserStore((state) => state.waterRecords);
  const weightRecords = useUserStore((state) => state.weightRecords);
  const heightRecords = useUserStore((state) => state.heightRecords);
  const todayWater = useUserStore((state) => state.waterToday);
  const setWaterToday = useUserStore((state) => state.setWaterToday);
  const updateWeightTime = useUserStore(
    (state) => state.profile?.updateWeightTime ?? 0
  );
  const updateHeightTime = useUserStore(
    (state) => state.profile?.updateHeightTime ?? 0
  );

  console.log('updated', updateWeightTime, updateHeightTime);

  const isUpdateWeight =
    weightRecords &&
    weightRecords?.length > 0 &&
    !checkNotSameDate(
      new Date(weightRecords?.[weightRecords?.length - 1].time),
      today
    );
  const isUpdateHeight =
    heightRecords &&
    heightRecords?.length > 0 &&
    !checkNotSameDate(
      new Date(heightRecords?.[heightRecords?.length - 1].time),
      today
    );

  const todayTasks = [...(tasks?.filter((item) => isToday(item.time)) ?? [])];
  const sortTasks = todayTasks.sort((a, b) => {
    if (a.type === 'HABIT' && b.type === 'TASK') return -1;
    if (b.type === 'HABIT' && a.type === 'TASK') return 1;
    return 0;
  });
  const todayFace = faces?.find((item) => isToday(item.time));
  const todayBody = bodies?.find((item) => isToday(item.time));
  const todayMeals = meals?.filter((item) => isToday(item.time));
  const totalProgress = 6 + todayTasks.length;
  const todayWaterRecords =
    water?.find((item) => isToday(item.time))?.value ?? 0;
  useEffect(() => {
    if(!todayWaterRecords){
      setWaterToday(0)
    }
  },[])
  let done = 0;
  if (!!todayFace) {
    done += 1;
  }
  if (todayWater >= (waterPerDay ?? 0)) {
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
  if (isUpdateHeight) {
    done += 1;
  }
  if (todayTasks.length !== 0) {
    const doneTasks = todayTasks?.filter((item) => item.done).length ?? 0;
    done += doneTasks;
  }

  const progress = Math.round((done / totalProgress) * 100);

  return {
    tasks: sortTasks,
    face: todayFace,
    body: todayBody,
    meals: todayMeals,
    water: todayWaterRecords,
    progress,
    isUpdateWeight,
    isUpdateHeight,
  };
}
