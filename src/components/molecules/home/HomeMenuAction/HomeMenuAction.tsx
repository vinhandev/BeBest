import React from 'react';

import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { checkNotSameDate, styleBackground } from '~/utils';
import { IconButtonPropsType } from '~/types';

import { Icon, Row, Spacer, Text } from '~/components/atoms';
import { styles } from './HomeMenuAction.styles';
import IconButton from '../../common/IconButton/IconButton';
import { useUserStore } from '~/stores';

type Props = {
  name: string | undefined;
  streak: number | undefined;
  weight: number | undefined;
  height: number | undefined;
  actions: IconButtonPropsType[];
};
export default function HomeMenuAction({
  name,
  height,
  streak,
  weight,
  actions,
}: Props) {
  const { colors } = useTheme();

  const updatedStreakDate = useUserStore((state) => state.updatedStreakDate);

  const checkedStreak = updatedStreakDate
    ? !checkNotSameDate(updatedStreakDate, new Date())
    : false;
  const streakStatusColor = checkedStreak ? colors.success : colors.error;

  return (
    <View style={[styles.container, styleBackground(colors.white)]}>
      <Text variant="black_l_bold">{name ?? ' '}</Text>
      <Row justifyContent="flex-start">
        <Text variant="black_s_light">{weight ?? 0} kg </Text>
        <Text variant="black_s_light">|</Text>
        <Text variant="black_s_light"> {height ?? 0} cm</Text>
      </Row>
      <Row justifyContent="flex-start">
        <Icon variant="streak" size={15} color={streakStatusColor} />
        <Text
          style={{
            color: streakStatusColor,
          }}
          variant="streak"
        >{` ${streak ?? 0} streaks`}</Text>
      </Row>
      <Spacer size={5} />
      <Row style={styles.actions}>
        {actions.map((action, index) => (
          <IconButton
            key={index}
            icon={action.isChecked ? 'checked' : action.icon}
            title={action.title}
            onPress={action.onPress}
            color={action.isChecked ? colors.success : colors.quaternary}
          />
        ))}
      </Row>
    </View>
  );
}
