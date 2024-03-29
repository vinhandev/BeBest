import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { ProfilePropsType, RecordPropsType } from '~/types';
import { TaskPropsType } from '~/types/task';
import { ImagePropsType } from '~/types/images';
import { MealDefaultProps, MealProps } from '~/types/meals';

type paramType = {
  initializing: boolean;
  user: FirebaseAuthTypes.User | null;
  profile: ProfilePropsType | null;
  tasks: TaskPropsType[] | null;
  faces: ImagePropsType[] | null;
  bodies: ImagePropsType[] | null;
  updatedStreakDate: Date | null;
  defaultMeals: MealDefaultProps[] | null;
  meals: MealProps[] | null;
  weightRecords: RecordPropsType[] | null;
  waterRecords: RecordPropsType[] | null;
  waterPerCup: number;
};
type stateProps = paramType & {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setInitializing: (initializing: boolean) => void;
  setProfile: (profile: ProfilePropsType) => void;
  setTasks: (tasks: TaskPropsType[]) => void;
  setUpdatedStreakDate: (date: Date) => void;
  setFaces: (faces: ImagePropsType[]) => void;
  setBodies: (bodies: ImagePropsType[]) => void;
  setDefaultMeals: (meals: MealDefaultProps[]) => void;
  setMeals: (meals: MealProps[]) => void;
  setWeightRecords: (records: RecordPropsType[]) => void;
  setWaterRecords: (records: RecordPropsType[]) => void;
  setWaterPerCup: (waterPerCup: number) => void;
  reset: () => void;
};

const initProps: paramType = {
  user: null,
  initializing: false,
  profile: null,
  tasks: null,
  faces: null,
  bodies: null,
  defaultMeals: null,
  meals: null,
  updatedStreakDate: null,
  weightRecords: null,
  waterRecords: null,
  waterPerCup: 150,
};

export const useUserStore = create(
  persist<stateProps>(
    (set, get) => ({
      ...initProps,
      setUser: (user) => set(() => ({ user })),
      setInitializing: (initializing) => set(() => ({ initializing })),
      setProfile: (profile) => set(() => ({ profile })),
      setTasks: (tasks) => set(() => ({ tasks })),
      setUpdatedStreakDate: (date) => set(() => ({ updatedStreakDate: date })),
      setFaces: (faces) => set(() => ({ faces })),
      setBodies: (bodies) => set(() => ({ bodies })),
      setDefaultMeals: (meals) => set(() => ({ defaultMeals: meals })),
      setMeals: (meals) => set(() => ({ meals })),
      setWeightRecords: (records) => set(() => ({ weightRecords: records })),
      setWaterPerCup: (waterPerCup) => set(() => ({ waterPerCup })),
      setWaterRecords: (records) => set(() => ({ waterRecords: records })),
      reset: () => set(() => initProps),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
