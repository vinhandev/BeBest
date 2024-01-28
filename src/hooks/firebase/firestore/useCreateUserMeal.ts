import {
  mealsCollection,
} from '~/services';
import { MealDefaultProps } from '~/types/meals';

export const useCreateUserMeal = () => {
  async function create(filename: string, image: MealDefaultProps) {
    await mealsCollection.doc(filename).set(image);
  }

  return {
    create,
  };
};
