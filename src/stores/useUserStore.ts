import { User } from 'firebase/auth';
import { create } from 'zustand';

type stateProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<stateProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
