import { Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  AuthorizedLinks,
  DarkTheme,
  LightTheme,
  PublicLinks,
} from '~/constants';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';

import '~/translations';
import { BottomSheet, Loading } from '~/components/molecules';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useWatchAuth } from '~/hooks';
import { useUserStore } from '~/stores';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const colorScheme = useColorScheme();

  const { initializing, user } = useWatchAuth();
  const profile = useUserStore((state) => state.profile);

  useEffect(() => {
    if (!initializing) {
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
    }
  }, [initializing, user, profile]);


  return (
    <Provider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <BottomSheetModalProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Slot />
        <BottomSheet />
        <Loading />
      </BottomSheetModalProvider>
    </Provider>
  );
}
