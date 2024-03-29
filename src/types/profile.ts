import { GenderType } from './gender';

export type ProfilePropsType = {
  avatar: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  waterPerDay: number;
  goalWeight: number;
  goalHeight: number;
  gender: GenderType;
  streak: number;
  mealPerDay: number;
  updateWeightTime: number;
  updateHeightTime: number;
  updateStreakTime: number;
};
