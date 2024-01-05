import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import { DarkTheme, HomeLinks, LightTheme, PublicLinks } from '~/constants';
import { useWatchAuth } from '~/hooks';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';

export default function App() {
  const { initializing, user } = useWatchAuth();

  useEffect(() => {
    if (initializing) router.replace(PublicLinks.START_UP);
    if (!user && !initializing) router.replace(PublicLinks.SIGN_IN);
    else {
      router.replace(HomeLinks.HOME);
    }
  }, [initializing, user]);

  const colorScheme = useColorScheme();

  return (
    <Provider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <Slot />
    </Provider>
  );
}
