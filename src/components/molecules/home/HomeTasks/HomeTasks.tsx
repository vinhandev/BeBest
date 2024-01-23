import React from 'react';
import { View } from 'moti';
import { useTranslation } from 'react-i18next';

import { Alert, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';

import { HomeLinks, Metrics } from '~/constants';
import { checkNotSameDate, styleBackground, styleBorderColor } from '~/utils';
import { useSystemStore, useUserStore } from '~/stores';

import { CircleBar, Row, Spacer, Text } from '~/components/atoms';
import IconButton from '../../common/IconButton/IconButton';
import { BounceWrapper } from '~/components/HOCs';
import Task from '../../common/Task/Task';

import { styles } from './HomeTasks.styles';
import { useCheckTask, useDeleteTask, useUpdateStreak } from '~/hooks';
import { router } from 'expo-router';

export default function HomeTasks() {
  const { t } = useTranslation('home');
  const { colors } = useTheme();

  const { checkTask } = useCheckTask();
  const { deleteTask } = useDeleteTask();
  const { incrementStreak } = useUpdateStreak();

  const setOpenBottomSheet = useSystemStore(
    (state) => state.setOpenBottomSheet
  );

  const tasks = useUserStore((state) => state.tasks);
  const filterTasks = tasks?.filter((item) =>
    !checkNotSameDate(new Date(item.time), new Date())
  );
  const updatedStreakDate = useUserStore((state) => state.updatedStreakDate);
  const percentOfDoneTask =
    tasks?.length !== 0 && tasks !== null
      ? Math.round(
          (tasks?.filter((task) => task.done).length / tasks?.length) * 100
        )
      : 0;

  const checkedStreak = updatedStreakDate
    ? !checkNotSameDate(updatedStreakDate, new Date())
    : false;
  const streakStatusColor = checkedStreak ? colors.success : colors.error;
  const handlePressTask = (index: number, selected: boolean) => {
    checkTask(index, selected);
  };

  const handleDeleteTask = (index: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteTask(index);
        },
      },
    ]);
  };
  const handleOpenAddTaskBottomSheet = () => {
    setOpenBottomSheet(true, 'add_task');
  };

  const handleIncrementStreak = () => {
    Alert.alert(
      'Streak',
      'Are you sure you want to checked streak for today? Cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            incrementStreak();
          },
        },
      ]
    );
  };

  const handleTaskList = () => {
    router.push(HomeLinks.TASK_LIST);
  };

  return (
    <View>
      <Text variant="black_l_bold">{t('tasks_title')}</Text>
      <Spacer size={Metrics.ex_small} />
      <BounceWrapper>
        <Row
          gap={Metrics.ex_small}
          style={[
            styles.container,
            styleBackground(colors.white),
            styleBorderColor(colors.disabled),
          ]}
        >
          <CircleBar
            color={percentOfDoneTask === 100 ? streakStatusColor : colors.black}
            value={percentOfDoneTask}
          />
          <View style={styles.status}>
            <Text
              style={{
                color:
                  percentOfDoneTask === 100 ? streakStatusColor : colors.black,
              }}
              variant={
                percentOfDoneTask === 100 ? 'black_s_bold' : 'black_s_regular'
              }
            >
              {t('tasks_status_title')}
            </Text>
          </View>
          <IconButton
            disabled={percentOfDoneTask !== 100 || checkedStreak}
            icon="checked"
            onPress={handleIncrementStreak}
            color={percentOfDoneTask === 100 ? streakStatusColor : undefined}
            textColor={percentOfDoneTask === 100 ? colors.white : undefined}
          />
          <IconButton
            disabled={checkedStreak}
            icon="add"
            onPress={handleOpenAddTaskBottomSheet}
          />
          <IconButton icon="list" onPress={handleTaskList} />
        </Row>
      </BounceWrapper>
      <Spacer size={Metrics.small} />
      <FlatList
        ItemSeparatorComponent={() => <Spacer size={Metrics.ex_small} />}
        scrollEnabled={false}
        data={filterTasks}
        renderItem={({ item, index }) => (
          <Task
            disabled={checkedStreak}
            key={index}
            task={item}
            onPress={(selected) => {
              handlePressTask(index, selected);
            }}
            onDelete={() => {
              handleDeleteTask(index);
            }}
          />
        )}
      />
    </View>
  );
}
