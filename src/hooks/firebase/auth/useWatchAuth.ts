import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useUserStore } from '~/stores/useUserStore';
import { usersCollection } from '~/services';
import { ProfilePropsType } from '~/types';
import { log, showError } from '~/utils';
import { useGetAllHeightRecords } from '../firestore/useGetAllHeightRecords';
import { useGetAllWaterRecords } from '../firestore/useGetAllWaterRecords';
import { useGetAllWeightRecord } from '../firestore/useGetAllWeightRecord';
import { useGetUserBody } from '../firestore/useGetUserBody';
import { useGetUserFace } from '../firestore/useGetUserFace';
import { useGetUserMeals } from '../firestore/useGetUserMeals';

export const useWatchAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setProfile = useUserStore((state) => state.setProfile);
  const { get: getWater } = useGetAllWaterRecords();
  const { get: getWeights } = useGetAllWeightRecord();
  const { get: getHeights } = useGetAllHeightRecords();
  const { get: getFaces } = useGetUserFace();
  const { get: getBodies } = useGetUserBody();
  const { get: getMeals } = useGetUserMeals();

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setInitializing(true);
    try {
      console.log('user', user);
      if (user !== null) {
        const response = await usersCollection.doc(user.uid).get();
        const profile = response.data();
        if (profile) {
          console.log('get user data');

          setProfile(response.data() as ProfilePropsType);

          await getWater(user.uid);
          await getWeights(user.uid);
          await getHeights(user.uid);
          await getFaces(user.uid);
          await getBodies(user.uid);
          await getMeals(user.uid);
        }
      }
      setUser(user);
    } catch (error) {
      showError(error);
    }
    setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return { user, initializing };
};
