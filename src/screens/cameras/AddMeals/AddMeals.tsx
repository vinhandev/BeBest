import React, { useState } from 'react';

import { useCreateUserMeal } from '~/hooks';

import { meals } from '~/constants';
import { CameraLayout } from '~/components/molecules';
import { MealTimeType } from '~/types/meals';

export default function AddMealsScreen() {
  let filterMeals = meals;
  const [mealTime, setMealTime] = useState<MealTimeType>(
    filterMeals[0].value as MealTimeType
  );
  const [calories, setCalories] = useState<number>(500);

  const { create } = useCreateUserMeal();

  return (
    <CameraLayout
      calories={calories}
      onChangeCalories={setCalories}
      imageType="meals"
      mealTime={mealTime}
      onChangeMealTime={setMealTime}
      onCreate={create}
      photoAspectRatio={1}
    />
  );
}
