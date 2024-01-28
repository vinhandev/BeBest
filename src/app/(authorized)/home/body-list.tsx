import React, { useEffect } from 'react';

import { View } from 'moti';
import { Header } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Image, Spacer, Text } from '~/components/atoms';
import { FixedSizes, HomeLinks, Metrics, Rounds } from '~/constants';
import { TouchableOpacity } from 'react-native-ui-lib';
import { useGetUserBody } from '~/hooks';
import Styles from '~/styles';

export default function BodyListRouter() {
  const bodies = useUserStore((state) => state.bodies);

  const { get } = useGetUserBody();
  useEffect(() => {
    get();
  }, []);

  return (
    <View>
      <Header
        title="Bodies"
        left={{
          icon: 'back',
          onPress: () => {
            router.replace(HomeLinks.HOME);
          },
        }}
      />
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
              <View style={Styles.shadow}>
                <Image
                  key={index}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 2 / 3,
                    resizeMode: 'cover',
                    borderRadius: Rounds.small,
                  }}
                  source={item.path}
                />
              </View>
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
