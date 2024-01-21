import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { ProfilePropsType } from '~/types';
import { TaskPropsType } from '~/types/task';

type paramType = {
  initializing: boolean;
  user: FirebaseAuthTypes.User | null;
  profile: ProfilePropsType | null;
  tasks: TaskPropsType[] | null;
  updatedStreakDate: Date | null;
};
type stateProps = paramType & {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setInitializing: (initializing: boolean) => void;
  setProfile: (profile: ProfilePropsType) => void;
  setTasks: (tasks: TaskPropsType[]) => void;
  setUpdatedStreakDate: (date: Date) => void;
  reset: () => void;
};

const initProps: paramType = {
  user: null,
  initializing: false,
  profile: null,
  tasks: null,
  updatedStreakDate: null,
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
      reset: () => set(() => initProps),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
