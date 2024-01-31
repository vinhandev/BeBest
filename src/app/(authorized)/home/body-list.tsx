import React, { useEffect, useState } from 'react';

import { View } from 'moti';
import { Header, PictureModal } from '~/components/molecules';
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

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { get } = useGetUserBody();

  function handleOpenModal(paramIndex: number) {
    setSelectedIndex(paramIndex);
    setOpen(true);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <View>
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
                onPress={() => handleOpenModal(index)}
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
                      width: '95%',
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
      <PictureModal
        open={open}
        setOpen={setOpen}
        photos={
          bodies?.map((item) => ({
            time: item.time,
            path: item.path,
          })) ?? []
        }
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        aspectRatio={2 / 3}
      />
    </View>
  );
}
