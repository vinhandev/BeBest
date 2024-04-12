import { heightCollection, weightCollection } from '~/services';
import { useUserStore } from '~/stores';
import { RecordPropsType } from '~/types';

export function useGetAllHeightRecords() {
  const uid = useUserStore((state) => state.user?.uid);
  const setHeightRecords = useUserStore((state) => state.setHeightRecords);
  async function get() {
    const response = await heightCollection.where('uid', '==', uid).get();
    setHeightRecords(response.docs.map((doc) => doc.data() as RecordPropsType));
  }
  return {
    get,
  };
}
