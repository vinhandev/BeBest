import React, { useState } from 'react';

import { View } from 'moti';
import { Calendar, Header, Task } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Image, Spacer, Text } from '~/components/atoms';
import { FixedSizes, Metrics } from '~/constants';
import { checkNotSameDate } from '~/utils';
import { loadImageFromFile } from 'react-native-jsi-image';
import { TouchableOpacity } from 'react-native-ui-lib';

export default function FaceListRouter() {
  const bodies = useUserStore((state) => state.body);

  const [chooseDate, setChooseDate] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setChooseDate(date);
  };

  return (
    <View>
      <Header title="Bodies" left={{ icon: 'back', onPress: router.back }} />
      <View
        style={{
          padding: Metrics.medium,
          height:
            Metrics.screenHeight - FixedSizes.header - FixedSizes.bottom_bar,
        }}
      >
        <FlatList
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Spacer size={Metrics.medium} />}
          data={bodies}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                width: (Metrics.screenWidth - 2 * Metrics.medium) / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                key={index}
                style={{
                  width: 100,
                  height: 200,
                }}
                source={item.path}
              />
              <Spacer size={5} />
              <Text variant="black_xs_light">
                {new Date(item.time).toDateString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
