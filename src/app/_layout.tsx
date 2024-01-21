import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import { DarkTheme, HomeLinks, LightTheme, PublicLinks } from '~/constants';
import { useWatchAuth, useWatchProfile } from '~/hooks';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';
import { useUserStore } from '~/stores/useUserStore';

import '~/translations';
import { log } from '~/utils';
import { BottomSheet, Loading } from '~/components/molecules';

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
    if (profile === null) {
      log.debug('profile', profile);
      router.push(PublicLinks.INIT_PROFILE);
      return;
    } else {
      log.debug('user', user);
      router.replace(HomeLinks.HOME);
    }
  }, [initializing, user, profile]);

  const colorScheme = useColorScheme();

  return (
    <Provider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <Slot />
      <BottomSheet />
      <Loading />
    </Provider>
  );
}
