import { GenderType } from './gender';

export type ProfilePropsType = {
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
};
