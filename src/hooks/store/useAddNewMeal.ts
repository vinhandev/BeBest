import { useUserStore } from '~/stores';
import { MealProps } from '~/types/meals';

export function useAddNewMeal() {
  const meals = useUserStore((state) => state.meals);
  const setMeals = useUserStore((state) => state.setMeals);
  const add = (meal: MealProps) => {
    setMeals([...(meals ?? []), meal]);
  };
  return {
    add,
  };
}
