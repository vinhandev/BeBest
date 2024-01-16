import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import { DarkTheme, HomeLinks, LightTheme, PublicLinks } from '~/constants';
import { useWatchAuth } from '~/hooks';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';
import { useUserStore } from '~/stores/useUserStore';

import '~/translations';

export default function App() {
  const { initializing, user } = useWatchAuth();
  const profile = useUserStore((state) => state.profile);

  console.log('profile', profile);
  console.log('user', user, !!initializing);

  useEffect(() => {
    if (initializing) {
      router.replace(PublicLinks.START_UP);
      return;
    }
    if (!user) {
      router.replace(PublicLinks.SIGN_IN);
      return;
    }
    if (!profile) {
      router.replace(PublicLinks.INIT_PROFILE);
      return;
    } else {
      router.replace(HomeLinks.HOME);
    }
  }, [initializing, user, profile]);

  const colorScheme = useColorScheme();

  return (
    <Provider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <Slot />
    </Provider>
  );
}
