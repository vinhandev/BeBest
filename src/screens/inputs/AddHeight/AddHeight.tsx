import React, { useState } from 'react';
import { View } from 'moti';

import { HomeLinks, Metrics, today, todayTime } from '~/constants';
import {
  useAddNewTask,
  useAddTask,
  useGetAllHeightRecords,
  useUpdateUserHeight,
  useUpdateUserWeight,
} from '~/hooks';

import { styles } from './AddHeight.styles';
import { Spacer, Text } from '~/components/atoms';
import { useSystemStore, useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime, getDateStringForImageFile, showToast } from '~/utils';
import { Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button, Header, SwipeSelector } from '~/components/molecules';
import { router } from 'expo-router';

export default function Height() {
  const { colors } = useTheme();
  const goalHeight = useUserStore((state) => state.profile?.goalHeight);
  const height = useUserStore((state) => state.profile?.height);
  const [selectHeight, setSelectHeight] = useState(height || 0);

  const uid = useUserStore((state) => state.user?.uid ?? '');
  const setLoading = useSystemStore((state) => state.setLoading);
  const time = getDateStringForImageFile(today);
  const filename = `${uid}_${time}`;
  const { get } = useGetAllHeightRecords();

  const { create } = useUpdateUserHeight();
  const handleSaveWeight = async () => {
    setLoading(true);
    try {
      await create(filename, {
        time: todayTime,
        uid,
        value: selectHeight,
      });
      await get();
      router.push(HomeLinks.HOME);
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add Weight"
        left={{
          icon: 'back',
          onPress: () => {
            router.push(HomeLinks.HOME);
          },
        }}
      />
      <View
        style={{
          flex: 1,
          padding: Metrics.medium,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text center variant="black_s_light">
            Target
          </Text>
          <Text
            style={{
              lineHeight: 15,
            }}
            center
            variant="black_s_bold"
          >
            {`${goalHeight} cm`}
          </Text>
        </View>
        <View style={{ paddingVertical: Metrics.large }}>
          <Text variant="black_xl_bold" center>{`${selectHeight.toFixed(
            2
          )} cm`}</Text>
          <Spacer size={10} />
          <SwipeSelector
            color={colors.black}
            current={selectHeight}
            max={200}
            min={0}
            onChange={setSelectHeight}
            step={0.5}
          />
        </View>
        <Button onPress={handleSaveWeight} mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
}
