import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Metrics } from '~/constants';

import { RoundedPanel, Row, Spacer } from '~/components/atoms';

import { styles } from './Home.styles';
import { Image } from 'expo-image';
import { getTime, styleBackground, styleColor } from '~/utils';
import { ScrollView } from 'react-native-gesture-handler';

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
        <Row>
          <View>
            <Text style={[styles.time, styleColor(colors.white)]}>{time}</Text>
            <Text style={[styles.message, styleColor(colors.white)]}>
              {notifyMessage}
            </Text>
          </View>
          <View>
            <Image style={[styles.image, styleBackground(colors.quaternary)]} />
          </View>
        </Row>
      </View>
    </ScrollView>
  );
}
