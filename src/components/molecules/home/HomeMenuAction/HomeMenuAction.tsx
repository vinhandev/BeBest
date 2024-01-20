import React, { useState } from 'react';
import { Pressable, View, Animated } from 'react-native';

import { MotiView, useAnimationState } from 'moti';

import { Row, Text } from '~/components/atoms';
import { styles } from './HomeMenuAction.styles';
import { useTheme } from 'react-native-paper';
import { log, styleBackground, stylePressed } from '~/utils';

type Props = {
  name: string | undefined;
  streak: number | undefined;
  weight: number | undefined;
  height: number | undefined;
};
export default function HomeMenuAction({
  name,
  height,
  streak,
  weight,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, styleBackground(colors.white)]}>
      <Text variant="medium_title">{name ?? ' '}</Text>
      <Row justifyContent="flex-start">
        <Text variant="label">{weight ?? 0} kg </Text>
        <Text variant="label">|</Text>
        <Text variant="label"> {height ?? 0} cm</Text>
      </Row>
      <Text>{streak ?? 0}</Text>
    </View>
  );
}
