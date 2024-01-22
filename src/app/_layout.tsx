import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  DarkTheme,
  AuthorizedLinks,
  LightTheme,
  PublicLinks,
} from '~/constants';
import { useWatchAuth, useWatchProfile } from '~/hooks';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';
import { useUserStore } from '~/stores/useUserStore';

import '~/translations';
import { log } from '~/utils';
import { BottomSheet, Loading } from '~/components/molecules';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const { initializing, user } = useWatchAuth();
  useWatchProfile();
  const profile = useUserStore((state) => state.profile);

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
      log.debug('profile', profile);
      router.push(PublicLinks.INIT_PROFILE);
      return;
    } else {
      log.debug('user', user);
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
