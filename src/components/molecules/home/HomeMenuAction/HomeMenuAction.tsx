import React from 'react';

import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { checkNotSameDate, styleBackground } from '~/utils';
import { IconButtonPropsType } from '~/types';

import { Icon, Row, Spacer, Text } from '~/components/atoms';
import { styles } from './HomeMenuAction.styles';
import IconButton from '../../common/IconButton/IconButton';
import { useUserStore } from '~/stores';
import { BlurView } from 'expo-blur';
import Styles from '~/styles';
import { Rounds } from '~/constants';

type Props = {
  name: string | undefined;
  streak: number | undefined;
  weight: number | undefined;
  height: number | undefined;
  waterToday: number | undefined;
  waterGoal: number | undefined;
  actions: IconButtonPropsType[];
};
export default function HomeMenuAction({
  name,
  height,
  streak,
  weight,
  actions,
  waterGoal = 0,
  waterToday = 0,
}: Props) {
  const { colors } = useTheme();

  const isEnoughWater = waterToday !== 0 && waterToday >= waterGoal;

  const updatedStreakDate = useUserStore((state) => state.updatedStreakDate);

  const checkedStreak = updatedStreakDate
    ? !checkNotSameDate(updatedStreakDate, new Date())
    : false;
  const streakStatusColor = checkedStreak ? colors.success : colors.error;
  const waterColor = isEnoughWater ? colors.water : colors.disabled;
  return (
    <View
      style={[
        {
          borderRadius: Rounds.small,
          overflow: 'hidden',
        },
        Styles.shadow,
      ]}
    >
      <BlurView intensity={80} style={[styles.container]}>
        <Text variant="black_l_bold">{name ?? ' '}</Text>
        <Row justifyContent="flex-start">
          <Text variant="black_s_light">{weight ?? 0} kg </Text>
          <Text variant="black_s_light">|</Text>
          <Text variant="black_s_light"> {height ?? 0} cm</Text>
        </Row>
        <Row justifyContent="flex-start" gap={5}>
          <Row justifyContent="flex-start">
            <Icon variant="streak" size={15} color={streakStatusColor} />
            <Text
              style={{
                color: streakStatusColor,
              }}
              variant="streak"
            >{` ${streak ?? 0} streaks`}</Text>
          </Row>
          <Row justifyContent="flex-start">
            <Icon
              variant={isEnoughWater ? 'water' : 'noWater'}
              size={15}
              color={waterColor}
            />
            <Text
              style={{
                color: waterColor,
              }}
              variant="streak"
            >{` ${waterToday}/${waterGoal} ml`}</Text>
          </Row>
        </Row>
        <Spacer size={5} />
        <Row gap={5} style={styles.actions}>
          {actions.map((action, index) => (
            <IconButton
              key={index}
              icon={action.icon}
              title={action.title}
              onPress={action.onPress}
              color={action.isChecked ? colors.success : colors.quaternary}
              textColor={'#00000099'}
              isChecked={action.isChecked}
            />
          ))}
        </Row>
      </BlurView>
    </View>
  );
}
