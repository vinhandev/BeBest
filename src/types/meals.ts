export type MealTimeType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type MealDefaultProps = {
  calories: number;
  time: number;
  mealTime: MealTimeType;
  image: string;
  uid: string;
};

export type MealProps = MealDefaultProps & {
  image: string;
  eatTime: number;
  type: MealTimeType;
};
