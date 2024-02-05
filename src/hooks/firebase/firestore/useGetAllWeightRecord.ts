import { weightCollection } from '~/services';
import { useUserStore } from '~/stores';
import { RecordPropsType } from '~/types';

export function useGetAllWeightRecord() {
  const uid = useUserStore((state) => state.user?.uid);
  const setWeightRecords = useUserStore((state) => state.setWeightRecords);
  async function get() {
    const response = await weightCollection.where('uid', '==', uid).get();
    setWeightRecords(response.docs.map((doc) => doc.data() as RecordPropsType));
  }
  return {
    get,
  };
}
