import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';

type paramType = {
  initializing: boolean;
  user: FirebaseAuthTypes.User | null;
};
type stateProps = paramType & {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setInitializing: (initializing: boolean) => void;
};

const initProps: paramType = {
  user: null,
  initializing: false,
};

export const useUserStore = create<stateProps>((set) => ({
  ...initProps,
  setUser: (user) => set({ user }),
  setInitializing: (initializing) => set({ initializing }),
}));
