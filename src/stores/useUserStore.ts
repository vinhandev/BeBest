import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { ProfilePropsType, RecordPropsType } from '~/types';
import { TaskPropsType } from '~/types/task';
import { ImagePropsType } from '~/types/images';
import { MealDefaultProps, MealProps } from '~/types/meals';

type paramType = {
  user: FirebaseAuthTypes.User | null;
  profile: ProfilePropsType | null;
  tasks: TaskPropsType[] | null;
  faces: ImagePropsType[] | null;
  bodies: ImagePropsType[] | null;
  updatedStreakDate: Date | null;
  defaultMeals: MealDefaultProps[] | null;
  meals: MealProps[] | null;
  weightRecords: RecordPropsType[] | null;
  heightRecords: RecordPropsType[] | null;
  waterRecords: RecordPropsType[] | null;
  waterPerCup: number;
  waterToday: number;
  confirmation: any;
};
type stateProps = paramType & {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setProfile: (profile: ProfilePropsType) => void;
  setTasks: (tasks: TaskPropsType[]) => void;
  setUpdatedStreakDate: (date: Date) => void;
  setFaces: (faces: ImagePropsType[]) => void;
  setBodies: (bodies: ImagePropsType[]) => void;
  setDefaultMeals: (meals: MealDefaultProps[]) => void;
  setMeals: (meals: MealProps[]) => void;
  setWeightRecords: (records: RecordPropsType[]) => void;
  setHeightRecords: (records: RecordPropsType[]) => void;
  setWaterRecords: (records: RecordPropsType[]) => void;
  setWaterPerCup: (waterPerCup: number) => void;
  setWaterToday: (waterToday: number) => void;
  setConfirmation: (confirmation: any) => void;
  reset: () => void;
};

const initProps: paramType = {
  user: null,
  profile: null,
  tasks: null,
  faces: null,
  bodies: null,
  defaultMeals: null,
  meals: null,
  updatedStreakDate: null,
  weightRecords: null,
  heightRecords: null,
  waterRecords: null,
  waterPerCup: 150,
  waterToday: 0,
  confirmation: undefined,
};

export const useUserStore = create(
  persist<stateProps>(
    (set, get) => ({
      ...initProps,
      setUser: (user) => set(() => ({ user })),
      setProfile: (profile) => set(() => ({ profile })),
      setTasks: (tasks) => set(() => ({ tasks })),
      setUpdatedStreakDate: (date) => set(() => ({ updatedStreakDate: date })),
      setFaces: (faces) => set(() => ({ faces })),
      setBodies: (bodies) => set(() => ({ bodies })),
      setDefaultMeals: (meals) => set(() => ({ defaultMeals: meals })),
      setMeals: (meals) => set(() => ({ meals })),
      setWeightRecords: (records) => set(() => ({ weightRecords: records })),
      setHeightRecords: (records) => set(() => ({ heightRecords: records })),
      setWaterPerCup: (waterPerCup) => set(() => ({ waterPerCup })),
      setWaterRecords: (records) => set(() => ({ waterRecords: records })),
      setWaterToday: (waterToday) => set(() => ({ waterToday })),
      setConfirmation: (confirmation) => set(() => ({ confirmation })),
      reset: () => set(() => initProps),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
