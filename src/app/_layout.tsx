import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  DarkTheme,
  AuthorizedLinks,
  LightTheme,
  PublicLinks,
} from '~/constants';
import {
  useGetAllHeightRecords,
  useGetAllWaterRecords,
  useGetAllWeightRecord,
  useGetUserBody,
  useGetUserFace,
  useGetUserMeals,
  useWatchAuth,
} from '~/hooks';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';
import { useUserStore } from '~/stores/useUserStore';

import '~/translations';
import { log, showError } from '~/utils';
import { BottomSheet, Loading } from '~/components/molecules';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useSystemStore } from '~/stores';

export default function App() {
  const { initializing, user } = useWatchAuth();
  const profile = useUserStore((state) => state.profile);
  const { get: getWater } = useGetAllWaterRecords();
  const { get: getWeights } = useGetAllWeightRecord();
  const { get: getHeights } = useGetAllHeightRecords();
  const { get: getFaces } = useGetUserFace();
  const { get: getBodies } = useGetUserBody();
  const { get: getMeals } = useGetUserMeals();
  const setLoading = useSystemStore((state) => state.setLoading);

  useEffect(() => {
    async function handleInitData() {
      setLoading(true);
      try {
        console.log('get all data');
        await getWater();
        await getWeights();
        await getHeights();
        await getFaces();
        await getBodies();
        await getMeals();
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
    void handleInitData();
  }, []);

  useEffect(() => {
    if (initializing) {
      router.replace(PublicLinks.START_UP);
      return;
    }
    if (user === null) {
      router.replace(PublicLinks.SIGN_IN);
      return;
    }
    if (profile === null && user !== null) {
      router.push(PublicLinks.INIT_PROFILE);
      return;
    } else {
      router.replace(AuthorizedLinks.HOME);
    }
  }, [initializing, user, profile]);

  const colorScheme = useColorScheme();

  return (
    <Provider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <BottomSheetModalProvider>
        <Slot />
        <BottomSheet />
        <Loading />
      </BottomSheetModalProvider>
    </Provider>
  );
}
