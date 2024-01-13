import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { ProfilePropsType } from '~/types';

type paramType = {
  initializing: boolean;
  user: FirebaseAuthTypes.User | null;
  profile: ProfilePropsType | undefined;
};
type stateProps = paramType & {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setInitializing: (initializing: boolean) => void;
  setProfile: (profile: ProfilePropsType) => void;
};

const initProps: paramType = {
  user: null,
  initializing: false,
  profile: undefined,
};

export const useUserStore = create(
  persist<stateProps>(
    (set, get) => ({
      ...initProps,
      setUser: (user) => set(() => ({ user })),
      setInitializing: (initializing) => set(() => ({ initializing })),
      setProfile: (profile) => set(() => ({ profile })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
