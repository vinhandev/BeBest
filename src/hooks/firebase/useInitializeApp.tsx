import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '~/stores/useUserStore';

export const useInitializeApp = () => {
  const setUser = useUserStore((state) => state.setUser);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
};
