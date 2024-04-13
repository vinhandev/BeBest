import { bodiesCollection, facesCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';

export function useGetUserBody() {
  const uid = useUserStore((state) => state.user?.uid);
  const setBodies = useUserStore((state) => state.setBodies);
  async function get(param?: string) {
    const response = await bodiesCollection
      .where('uid', '==', param ?? uid)
      .get();
    setBodies(response.docs.map((doc) => doc.data() as ImagePropsType));
  }
  return {
    get,
  };
}
