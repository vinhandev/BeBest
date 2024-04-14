import React, { useState } from 'react';
import { View } from 'moti';

import { HomeLinks, Metrics, today, todayTime } from '~/constants';
import {
  useAddNewTask,
  useAddTask,
  useGetAllWeightRecord,
  useUpdateUserWeight,
} from '~/hooks';

import { styles } from './AddWeight.styles';
import { Spacer, Text } from '~/components/atoms';
import { useSystemStore, useUserStore } from '~/stores';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime, getDateStringForImageFile, showToast } from '~/utils';
import { Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button, Header, SwipeSelector } from '~/components/molecules';
import { router } from 'expo-router';

export default function Weight() {
  const { colors } = useTheme();
  const goalWeight = useUserStore((state) => state.profile?.goalWeight);
  const weight = useUserStore((state) => state.profile?.weight);
  const [selectWeight, setSelectWeight] = useState(weight || 0);
  const { get } = useGetAllWeightRecord();

  const uid = useUserStore((state) => state.user?.uid ?? '');
  const setLoading = useSystemStore((state) => state.setLoading);
  const setConfettiVariant = useSystemStore((state) => state.setConfettiVariant);
  const time = getDateStringForImageFile(today);
  const filename = `${uid}_${time}`;

  const { create } = useUpdateUserWeight();
  const handleSaveWeight = async () => {
    setLoading(true);
    try {
      await create(filename, {
        time: todayTime,
        uid,
        value: selectWeight,
      });
      await get();
      setConfettiVariant('weight');
      router.push(HomeLinks.CONFETTI);
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
            {`${goalWeight} kg`}
          </Text>
        </View>
        <View style={{ paddingVertical: Metrics.large }}>
          <Text variant="black_xl_bold" center>{`${selectWeight.toFixed(
            2
          )} kg`}</Text>
          <Spacer size={10} />
          <SwipeSelector
            color={colors.black}
            current={selectWeight}
            max={200}
            min={0}
            onChange={setSelectWeight}
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
