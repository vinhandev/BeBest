import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyleSheet, View } from 'react-native';
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

export default function Home() {
  const { t } = useTranslation('home');
  const insets = useSafeAreaInsets();
  const time = getTime(new Date());
  const notifyMessage = 'Next: Study English with...';
  const profile = useUserStore((state) => state.profile);

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
      onPress: () => {},
      title: t('face'),
    },
    {
      icon: 'body',
      onPress: () => {},
      title: t('body'),
    },
    {
      icon: 'meal',
      onPress: () => {},
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
