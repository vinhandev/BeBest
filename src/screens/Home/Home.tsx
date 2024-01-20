import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Images, Metrics, Rounds } from '~/constants';

import { Image, RoundedPanel, Row, Spacer } from '~/components/atoms';

import { styles } from './Home.styles';
import { getTime, styleBackground, styleColor } from '~/utils';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeHeader, HomeMenuAction } from '~/components/molecules';

export default function Home() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const time = getTime(new Date());
  const notifyMessage = 'Next: Study English with...';
  return (
    <ScrollView>
      <View style={styles.container}>
        <RoundedPanel />
        <Spacer size={insets.top + Metrics.large} />
        <HomeHeader avatar={''} message={notifyMessage} time={time} />
        <HomeMenuAction />
      </View>
    </ScrollView>
  );
}
