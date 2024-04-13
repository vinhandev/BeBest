import { waterCollection, weightCollection } from '~/services';
import { useUserStore } from '~/stores';
import { RecordPropsType } from '~/types';

export function useGetAllWaterRecords() {
  const uid = useUserStore((state) => state.user?.uid);
  const setWaterRecords = useUserStore((state) => state.setWaterRecords);
  async function get(param?: string) {
    const response = await waterCollection
      .where('uid', '==', param ?? uid)
      .get();
    setWaterRecords(response.docs.map((doc) => doc.data() as RecordPropsType));
  }
  return {
    get,
  };
}
