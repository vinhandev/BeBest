export type MealTimeType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type MealDefaultProps = {
  name: string;
  material: string;
  calories: number;
  time: number;
  mealTime: MealTimeType;
};

export type MealProps = MealDefaultProps & {
  image: string;
  eatTime: number;
  type: MealTimeType;
};
