import React, { useEffect, useState } from 'react';

import { View } from 'moti';
import { Calendar, Header } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Image, Spacer, Text } from '~/components/atoms';
import { FixedSizes, HomeLinks, Metrics } from '~/constants';
import { TouchableOpacity } from 'react-native-ui-lib';
import { useGetUserMeals } from '~/hooks';
import { checkNotSameDate } from '~/utils';

export default function MealListRouter() {
  const meals = useUserStore((state) => state.meals);
  const { get } = useGetUserMeals();
  useEffect(() => {
    get();
  }, []);

  const [chooseDate, setChooseDate] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setChooseDate(date);
  };

  const filterMeals = meals?.filter(
    (item) => !checkNotSameDate(new Date(item.time), chooseDate)
  );

  return (
    <View>
      <Header
        title="Meals"
        left={{
          icon: 'back',
          onPress: () => {
            router.replace(HomeLinks.HOME);
          },
        }}
      />
      <Calendar onPress={handleSelectDate} selectedDate={chooseDate} />
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
          data={filterMeals}
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
                  height: 100,
                }}
                source={item.image}
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
