import React, { useState } from 'react';

import { View } from 'moti';
import { Calendar, Header, Task } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Spacer } from '~/components/atoms';
import { Metrics } from '~/constants';
import { checkNotSameDate } from '~/utils';

export default function TaskListRouter() {
  const tasks = useUserStore((state) => state.tasks);

  const [chooseDate, setChooseDate] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setChooseDate(date);
  };

  const filterTasks = tasks?.filter((item) =>
    !checkNotSameDate(new Date(item.time), chooseDate)
  );

  return (
    <View>
      <Header title="Tasks" left={{ icon: 'back', onPress: router.back }} />
      <Calendar selectedDate={chooseDate} onPress={handleSelectDate} />
      <View
        style={{
          padding: Metrics.medium,
        }}
      >
        <FlatList
          data={filterTasks}
          ItemSeparatorComponent={() => <Spacer size={8} />}
          renderItem={({ item }) => (
            <Task task={item} disabled onPress={() => {}} onDelete={() => {}} />
          )}
        />
      </View>
    </View>
  );
}
