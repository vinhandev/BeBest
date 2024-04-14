import React from 'react';
import { MotiView } from 'moti';
import { styles } from './RoundedPanel.styles';
import { useTheme } from 'react-native-paper';
import { styleBackground } from '~/utils';
import { Metrics } from '~/constants';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoundedPanel() {
  const { colors } = useTheme();
  return (
    <MotiView
      from={{ height: 0 }}
      animate={{ height: Metrics.screenHeight * 0.3 }}
      style={[styles.container]}
    >
      <LinearGradient
        colors={[colors.primary, colors.purple]}
        style={styles.gradient}
      />
    </MotiView>
  );
}
