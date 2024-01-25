import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useUserStore } from '~/stores/useUserStore';
import { usersCollection } from '~/services';
import { ProfilePropsType } from '~/types';
import { log } from '~/utils';

export const useWatchAuth = () => {
  const initializing = useUserStore((state) => state.initializing);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setInitializing = useUserStore((state) => state.setInitializing);
  const setProfile = useUserStore((state) => state.setProfile);

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user !== null) {
      const response = await usersCollection.doc(user.uid).get();
      const profile = response.data();
      if (profile) {
        setProfile(response.data() as ProfilePropsType);
      }
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return { user, initializing };
};
