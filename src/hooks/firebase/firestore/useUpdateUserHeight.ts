import { todayTime } from '~/constants';
import { heightCollection, mealsCollection, usersCollection, weightCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ProfilePropsType, RecordPropsType } from '~/types';
import { MealDefaultProps } from '~/types/meals';

export const useUpdateUserHeight = () => {
  const setProfile = useUserStore((state) => state.setProfile);
  async function create(filename: string, record: RecordPropsType) {
    await usersCollection.doc(record.uid).update({
      height: record.value,
      updateHeightTime: todayTime,
    });
    await heightCollection.doc(filename).set(record);
    const response = await usersCollection.doc(record.uid).get();
    const profile = response.data();
    if (profile) {
      setProfile(response.data() as ProfilePropsType);
    }
  }

  return {
    create,
  };
};
