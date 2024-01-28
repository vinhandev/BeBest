import React, { useEffect, useState } from 'react';

import { View } from 'moti';
import { Header } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Image, Spacer, Text } from '~/components/atoms';
import { FixedSizes, Metrics } from '~/constants';
import { TouchableOpacity } from 'react-native-ui-lib';
import { log } from '~/utils';
import { useGetUserFace } from '~/hooks';
import { RefreshControl } from 'react-native';

export default function FaceListRouter() {
  const faces = useUserStore((state) => state.faces);

  log.debug(faces);

  const [refreshing, setRefreshing] = useState(false);
  const { get } = useGetUserFace();

  useEffect(() => {
    get();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    get();
    setRefreshing(false);
  }

  return (
    <View>
      <Header title="Faces" left={{ icon: 'back', onPress: router.back }} />
      <View
        style={{
          padding: Metrics.medium,
          height:
            Metrics.screenHeight - FixedSizes.header - FixedSizes.bottom_bar,
        }}
      >
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          numColumns={3}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Spacer size={Metrics.medium} />}
          data={faces}
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
