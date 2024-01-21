import React from 'react';
import { View } from 'moti';

import { Metrics, taskTypes } from '~/constants';
import { useAddNewTask, useAddTask } from '~/hooks';

import FormInput from '../../../FormInput';
import { styles } from './BottomSheetAddTask.styles';
import Button from '../../../Button/Button';
import { Row, Spacer, Text } from '~/components/atoms';
import { useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime } from '~/utils';
import { Keyboard } from 'react-native';

export const snapPoints = ['80%'];
export const component = () => {
  const { control, handleSubmit, reset } = useAddTask();
  const { addTask } = useAddNewTask();
  const { close } = useBottomSheet();

  const onValid = (data: any) => {
    const param: TaskPropsType = {
      time: new Date().getTime(),
      description: data.description,
      done: false,
      doneTime: compileDueTime(data.due, data.time).getTime(),
      type: data.type,
    };
    addTask(param);
    reset();
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
      />
      <Row gap={Metrics.ex_small}>
        <FormInput
          label="Due Date"
          name="due"
          variant="date"
          control={control}
        />
        <FormInput
          label="Estimate"
          name="time"
          variant="date"
          mode="time"
          control={control}
        />
      </Row>

      <Spacer size={Metrics.ex_small} />
      <Button onPress={handleSubmit(onValid)} mode="contained">
        Add Task
      </Button>
    </View>
  );
};
