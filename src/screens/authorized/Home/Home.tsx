import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButtonPropsType } from '~/types';
import { CameraLinks, FixedSizes, HomeLinks, Metrics } from '~/constants';
import { checkNotSameDate, getTime, log } from '~/utils';
import { useUserStore } from '~/stores/useUserStore';

import { RoundedPanel, Spacer } from '~/components/atoms';
import { HomeHeader, HomeMenuAction, HomeTasks } from '~/components/molecules';
import { BounceWrapper, PullToScrollView } from '~/components/HOCs';

import { styles } from './Home.styles';
import { useSystemStore } from '~/stores';
import { useCameraPermission } from 'react-native-vision-camera';
import { useGetHomeInformation, useGetUserTasks } from '~/hooks';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';

export default function Home() {
  const { colors } = useTheme();
  const { t } = useTranslation('home');
  const { get } = useGetUserTasks();
  const { body, face, meals, isUpdateWeight, isUpdateHeight } =
    useGetHomeInformation();
  const tasks = useUserStore((state) => state.tasks);
  const insets = useSafeAreaInsets();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionResponse, requestPermission2] =
    MediaLibrary.usePermissions();

  const time = getTime(new Date());
  const notifyMessage = `Next: ${
    tasks?.find((item) => !item.done)?.description
  }`;
  const profile = useUserStore((state) => state.profile);
  const faces = useUserStore((state) => state.faces);
  const avatar = faces?.[faces?.length - 1]?.path ?? profile?.avatar;
  const waterToday = useUserStore((state) => state.waterToday);
  const setOpenBottomSheet = useSystemStore(
    (state) => state.setOpenBottomSheet
  );

  const innerStyle = StyleSheet.create({
    container: {
      height:
        Metrics.screenHeight -
        insets.bottom -
        insets.top -
        FixedSizes.bottom_bar,
      backgroundColor: colors.background,
    },
  });

  console.log('meals', meals, isUpdateHeight, isUpdateWeight);

  const actions: IconButtonPropsType[] = [
    {
      icon: 'face',
      onPress: async () => {
        if (hasPermission && permissionResponse?.granted) {
          router.push(CameraLinks.FACE);
        } else {
          const permission = await requestPermission();
          const permission2 = await requestPermission2();
          if (permission && permission2) {
            router.push(CameraLinks.FACE);
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('face'),
      isChecked: !!face,
    },
    {
      icon: 'body',
      onPress: async () => {
        if (hasPermission && permissionResponse?.granted) {
          router.push(CameraLinks.BODY);
        } else {
          const permission = await requestPermission();
          const permission2 = await requestPermission2();
          if (permission && permission2) {
            router.push(CameraLinks.BODY);
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('body'),
      isChecked: !!body,
    },
    {
      icon: 'meal',
      onPress: async () => {
        if (hasPermission) {
          router.push(CameraLinks.MEAL);
        } else {
          const permission = await requestPermission();
          const permission2 = await requestPermission2();
          if (permission && permission2) {
            router.push(CameraLinks.MEAL);
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('meal'),
      isChecked: meals !== undefined && meals?.length !== 0,
    },
    {
      icon: 'weight',
      onPress: () => {
        router.push(CameraLinks.WEIGHT);
      },
      title: t('weight'),
      isChecked: isUpdateWeight ?? false,
    },
    {
      icon: 'height',
      onPress: () => {
        router.push(CameraLinks.HEIGHT);
      },
      title: t('height'),
      isChecked: isUpdateHeight ?? false,
    },
  ];

  const handleRefresh = async () => {
    await get();
  };

  return (
    <View style={innerStyle.container}>
      <PullToScrollView onRefresh={handleRefresh}>
        <View style={styles.container}>
          <RoundedPanel />
          <Spacer size={insets.top} />
          <HomeHeader
            avatar={avatar}
            message={
              tasks?.filter((item) => !item.done)?.[0]?.description ?? ''
            }
            time={time}
          />
          <Spacer size={Metrics.medium} />
          <BounceWrapper>
            <HomeMenuAction
              waterToday={waterToday}
              waterGoal={profile?.waterPerDay}
              name={profile?.name}
              streak={profile?.streak}
              weight={profile?.weight}
              height={profile?.height}
              actions={actions}
            />
          </BounceWrapper>
          <Spacer size={Metrics.medium} />
          <HomeTasks />
        </View>
      </PullToScrollView>
    </View>
  );
}
