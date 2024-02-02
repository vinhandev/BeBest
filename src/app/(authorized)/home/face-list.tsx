import React, { useEffect, useState } from 'react';

import { View } from 'moti';
import { Header, PictureModal } from '~/components/molecules';
import { router } from 'expo-router';
import { useUserStore } from '~/stores';
import { FlatList } from 'react-native-gesture-handler';
import { Image, Spacer, Text } from '~/components/atoms';
import { FixedSizes, HomeLinks, Metrics, Rounds } from '~/constants';
import { TouchableOpacity } from 'react-native-ui-lib';
import { log } from '~/utils';
import { useGetUserFace } from '~/hooks';
import { RefreshControl } from 'react-native';
import Styles from '~/styles';

export default function FaceListRouter() {
  const faces = useUserStore((state) => state.faces);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

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

  function handleOpenModal(paramIndex: number) {
    setSelectedIndex(paramIndex);
    setOpen(true);
  }

  return (
    <View>
      <View>
        <Header
          title="Faces"
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
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
                key={index}
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
                    style={[
                      {
                        width: 100,
                        height: 100,
                        borderRadius: Rounds.small,
                      },
                    ]}
                    source={item.path}
                  />
                </View>
                <Spacer size={5} />
                <Text variant="black_xs_bold">
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
          faces?.map((item) => ({
            time: item.time,
            path: item.path,
          })) ?? []
        }
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        aspectRatio={1}
      />
    </View>
  );
}
