import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButtonPropsType } from '~/types';
import { FixedSizes, Metrics } from '~/constants';
import { getTime, log } from '~/utils';
import { useUserStore } from '~/stores/useUserStore';

import { RoundedPanel, Spacer } from '~/components/atoms';
import { HomeHeader, HomeMenuAction, HomeTasks } from '~/components/molecules';
import { BounceWrapper, PullToScrollView } from '~/components/HOCs';

import { styles } from './Home.styles';
import { useSystemStore } from '~/stores';
import { useCameraPermission } from 'react-native-vision-camera';

export default function Home() {
  const { t } = useTranslation('home');
  const insets = useSafeAreaInsets();
  const { hasPermission, requestPermission } = useCameraPermission();
  const time = getTime(new Date());
  const notifyMessage = 'Next: Study English with...';
  const profile = useUserStore((state) => state.profile);
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
    },
  });

  const actions: IconButtonPropsType[] = [
    {
      icon: 'face',
      onPress: async () => {
        if (hasPermission) {
          setOpenBottomSheet(true, 'face');
        } else {
          const permission = await requestPermission();
          if (permission) {
            setOpenBottomSheet(true, 'face');
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('face'),
    },
    {
      icon: 'body',
      onPress: async () => {
        if (hasPermission) {
          setOpenBottomSheet(true, 'body');
        } else {
          const permission = await requestPermission();
          if (permission) {
            setOpenBottomSheet(true, 'body');
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('body'),
    },
    {
      icon: 'meal',
      onPress: async () => {
        if (hasPermission) {
          setOpenBottomSheet(true, 'meal');
        } else {
          const permission = await requestPermission();
          if (permission) {
            setOpenBottomSheet(true, 'meal');
          } else {
            Alert.alert('No camera permission');
          }
        }
      },
      title: t('meal'),
    },
    {
      icon: 'weight',
      onPress: () => {},
      title: t('weight'),
    },
    {
      icon: 'height',
      onPress: () => {},
      title: t('height'),
    },
  ];

  const handleRefresh = async () => {
    log.info('handleRefresh');
  };

  return (
    <View style={innerStyle.container}>
      {/* <PullToScrollView onRefresh={handleRefresh}> */}
      <View style={styles.container}>
        <RoundedPanel />
        <Spacer size={insets.top} />
        <HomeHeader avatar={''} message={notifyMessage} time={time} />
        <Spacer size={Metrics.small} />
        <BounceWrapper>
          <HomeMenuAction
            name={profile?.name}
            streak={profile?.streak}
            weight={profile?.weight}
            height={profile?.height}
            actions={actions}
          />
        </BounceWrapper>
        <Spacer size={Metrics.small} />
        <HomeTasks />
      </View>
      {/* </PullToScrollView> */}
    </View>
  );
}
