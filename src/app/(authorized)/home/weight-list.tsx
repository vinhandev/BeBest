import React, { useEffect, useState } from 'react';

import { View } from 'moti';
import { Calendar, Header, Task } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Row, Spacer, Text } from '~/components/atoms';
import { FixedSizes, Metrics, Rounds } from '~/constants';
import { checkNotSameDate, styleBackground } from '~/utils';
import { useGetUserWeight } from '~/hooks';
import { useTheme } from 'react-native-paper';

export default function WeightListRouter() {
  const { colors } = useTheme();
  const weightRecords = useUserStore((state) => state.weightRecords);
  const { get } = useGetUserWeight();

  useEffect(() => {
    get();
  }, []);

  return (
    <View>
      <Header title="Weight Records" left={{ icon: 'back', onPress: router.back }} />
      <View
        style={{
          padding: Metrics.medium,
        }}
      >
        <FlatList
          data={weightRecords}
          ItemSeparatorComponent={() => <Spacer size={8} />}
          renderItem={({ item, index }) => (
            <Row
              style={[
                {
                  borderWidth: FixedSizes.border_width,
                  borderRadius: Rounds.small,
                  padding: 10,
                },
                styleBackground(colors.white),
              ]}
            >
              <Text variant="black_s_light">
                {new Date(item.time).toDateString()}
              </Text>
              <Text variant="black_s_bold">{`${item.value} kg`}</Text>
            </Row>
          )}
        />
      </View>
    </View>
  );
}
