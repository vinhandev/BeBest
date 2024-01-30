import { bodiesCollection, facesCollection, tasksCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';
import { TaskPropsType } from '~/types/task';

export function useGetUserTasks() {
  const uid = useUserStore((state) => state.user?.uid);
  const setTasks = useUserStore((state) => state.setTasks);
  async function get() {
    const response = await tasksCollection.where('uid', '==', uid).get();
    setTasks(response.docs.map((doc) => doc.data() as TaskPropsType));
  }
  return {
    get,
  };
}
