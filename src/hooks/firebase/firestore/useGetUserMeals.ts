import { bodiesCollection, facesCollection, mealsCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';
import { MealDefaultProps, MealProps } from '~/types/meals';

export function useGetUserMeals() {
  const uid = useUserStore((state) => state.user?.uid);
  const setMeals = useUserStore((state) => state.setMeals);
  async function get() {
    const response = await mealsCollection.where('uid', '==', uid).get();
    setMeals(response.docs.map((doc) => doc.data() as MealProps));
  }
  return {
    get,
  };
}
