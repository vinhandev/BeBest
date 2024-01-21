import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { AnimatePresence, View } from 'moti';

import { useSystemStore } from '~/stores';

import { styles } from './Loading.styles';
import { styleBackground } from '~/utils';

export default function Loading() {
  const { colors } = useTheme();
  const loading = useSystemStore((state) => state.loading);
  return (
    <AnimatePresence>
      {loading && (
        <View
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={[styles.container, styleBackground(`${colors.black}AA`)]}
        >
          <ActivityIndicator color={colors.white} size={'large'} />
        </View>
      )}
    </AnimatePresence>
  );
}
