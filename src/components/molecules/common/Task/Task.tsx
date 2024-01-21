import React from 'react';

import { View } from 'moti';
import { useTheme } from 'react-native-paper';

import { TaskPropsType } from '~/types/task';
import {
  getTime,
  styleBackground,
  styleBorderColor,
  styleColor,
  stylePressed,
} from '~/utils';

import { Row, Text } from '~/components/atoms';

import { styles } from './Task.styles';
import { FixedSizes, Metrics } from '~/constants';
import { Checkbox, RadioButton } from 'react-native-ui-lib';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  disabled?: boolean;
  task: TaskPropsType;
  onPress: (selected: boolean) => void;
  onDelete: () => void;
};
export default function Task({
  disabled = false,
  task,
  onPress,
  onDelete,
}: Props) {
  const { description, done, doneTime, type } = task;
  const { colors } = useTheme();

  const text = done
    ? colors.white
    : type === 'HABIT'
    ? colors.purple
    : colors.success;
  const typeColor = type === 'HABIT' ? colors.purple : colors.success;

  const innerStyle = StyleSheet.create({
    description: {
      textDecorationLine: done ? 'line-through' : 'none',
    },
  });

  return (
    <Pressable
      disabled={disabled}
      onLongPress={onDelete}
      style={({ pressed }) => stylePressed(pressed)}
    >
      <Row
        gap={Metrics.small}
        style={[
          styles.container,
          styleBackground(done ? typeColor : colors.white),
          styleBorderColor(colors.disabled),
        ]}
      >
        <Text variant="black_s_bold">{getTime(doneTime)}</Text>
        <Text style={styleColor(text)} variant="black_s_bold">
          {type}
        </Text>
        <Text style={[styles.description, innerStyle.description]}>
          {description}
        </Text>
        <Text>{done}</Text>
        <Checkbox
          color={done ? typeColor : colors.disabled}
          size={FixedSizes.radio}
          value={done}
          onValueChange={disabled ? undefined : onPress}
        />
      </Row>
    </Pressable>
  );
}
