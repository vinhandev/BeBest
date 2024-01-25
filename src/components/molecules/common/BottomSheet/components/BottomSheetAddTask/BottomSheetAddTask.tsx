import React from 'react';
import { View } from 'moti';

import { Metrics, taskTypes, today } from '~/constants';
import { useAddNewTask, useAddTask } from '~/hooks';

import FormInput from '../../../FormInput';
import { styles } from './BottomSheetAddTask.styles';
import Button from '../../../Button/Button';
import { Row, Spacer, Text } from '~/components/atoms';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime, log } from '~/utils';
import { Keyboard } from 'react-native';

export const SnapPoints = ['55%'];
export const Component = () => {
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
      <Text center variant="black_m_bold">
        Add New Task
      </Text>
      <Spacer size={Metrics.small} />
      <FormInput
        label="Type"
        name="type"
        variant="select"
        data={taskTypes}
        control={control}
      />
      <FormInput
        label="Description"
        name="description"
        variant="text"
        control={control}
        placeholder="What do you want to do today?"
      />
      <Row gap={Metrics.medium}>
        <FormInput
          label="Due Date"
          name="dueDate"
          variant="date"
          control={control}
        />
        <FormInput
          label="Estimate"
          name="dueTime"
          variant="date"
          mode="time"
          control={control}
        />
      </Row>
      <Text variant="black_xs_light">Habit will last 60 days</Text>

      <Spacer size={Metrics.ex_small} />
      <Button onPress={handleSubmit(onValid)} mode="contained">
        Add Task
      </Button>
    </View>
  );
};
