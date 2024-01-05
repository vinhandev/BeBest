import React from 'react';
import { MotiView } from 'moti';
import { styles } from './RoundedPanel.styles';
import { useTheme } from 'react-native-paper';
import { styleBackground } from '~/utils';
import { Metrics } from '~/constants';

export default function RoundedPanel() {
  const { colors } = useTheme();
  return (
    <MotiView
      from={{ height: 0 }}
      animate={{ height: Metrics.screenHeight * 0.25 }}
      style={[styles.container, styleBackground(colors.primary)]}
    />
  );
}
