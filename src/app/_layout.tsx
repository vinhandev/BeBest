import { Slot } from 'expo-router';
import React from 'react';
import {
  DarkTheme,
  LightTheme,
} from '~/constants';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';

import '~/translations';
import { BottomSheet, Loading } from '~/components/molecules';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
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
