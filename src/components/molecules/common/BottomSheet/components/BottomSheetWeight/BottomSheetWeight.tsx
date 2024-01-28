import React, { useState } from 'react';
import { View } from 'moti';

import { Metrics, today } from '~/constants';
import { useAddNewTask, useAddTask } from '~/hooks';

import { styles } from './BottomSheetWeight.styles';
import Button from '../../../Button/Button';
import { Spacer, Text } from '~/components/atoms';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime } from '~/utils';
import { Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import SwipeSelector from '../../../SwipeSelector/SwipeSelector';

export const SnapPoints = ['40%'];
export const Component = () => {
  const { colors } = useTheme();
  const goalWeight = useUserStore((state) => state.profile?.goalWeight);
  const weight = useUserStore((state) => state.profile?.weight);
  const [selectWeight, setSelectWeight] = useState(weight || 0);
  const { control, handleSubmit, reset } = useAddTask();
  const { addTask } = useAddNewTask();
  const { close } = useBottomSheet();

  const onValid = (data: any) => {
    const param: TaskPropsType = {
      time: new Date().getTime(),
      description: data.description,
      done: false,
      doneTime: compileDueTime(data.dueDate, data.dueTime).getTime(),
      type: data.type,
    };
    addTask(param);
    reset({
      dueTime: today,
      dueDate: today,
      description: '',
      type: 'TASK',
    });
    close();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Spacer size={Metrics.small} />
      <View>
        <Text center variant="black_s_light">
          Target
        </Text>
        <Text
          style={{
            lineHeight: 15,
          }}
          center
          variant="black_s_bold"
        >
          {`${goalWeight} kg`}
        </Text>
      </View>
      <View style={{ flex: 1, paddingVertical: Metrics.large }}>
        <Text variant="black_xl_light" center>{`${selectWeight} kg`}</Text>
        <SwipeSelector
          color={colors.black}
          current={selectWeight}
          max={200}
          min={0}
          onChange={setSelectWeight}
          step={0.5}
        />
      </View>
      <Button onPress={handleSubmit(onValid)} mode="contained">
        Save
      </Button>
    </View>
  );
};
