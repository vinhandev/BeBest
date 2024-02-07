import { todayTime } from '~/constants';
import { usersCollection, waterCollection } from '~/services';
import { RecordPropsType } from '~/types';

export const useUpdateUserWater = () => {
  async function create(filename: string, record: RecordPropsType) {
    await usersCollection.doc(record.uid).update({
      water: record.value,
      updateWaterTime: todayTime,
    });
    await waterCollection.doc(filename).set(record);
  }

  return {
    create,
  };
};
