import { facesCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';

export function useGetUserFace() {
  const uid = useUserStore((state) => state.user?.uid);
  const setFaces = useUserStore((state) => state.setFaces);
  async function get(param?: string) {
    const response = await facesCollection
      .where('uid', '==', param ?? uid)
      .get();
    setFaces(response.docs.map((doc) => doc.data() as ImagePropsType));
  }
  return {
    get,
  };
}
