import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import { useTheme } from 'react-native-paper';
import { styleBackground, styleColor } from '~/utils';
import { SafeScreen } from '~/components/HOCs';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, Row, Spacer, Text, WaveAnimation } from '~/components/atoms';
import { FixedSizes, Metrics } from '~/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Button, Header, SwipeSelector } from '~/components/molecules';
import { router } from 'expo-router';

export default function WaterEditRouter() {
  const { colors } = useTheme();
  const waterPerCup = useUserStore((state) => state.waterPerCup);
  const setWaterPerCup = useUserStore((state) => state.setWaterPerCup);

  const [selectWaterPerCup, setSelectWaterPerCup] = useState(waterPerCup);

  const handleAddWater = () => {
    setWaterPerCup(selectWaterPerCup);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Water" left={{ icon: 'back', onPress: router.back }} />
      <View
        style={{
          flex: 1,
          padding: Metrics.medium,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Spacer size={10} />
        <View style={{ paddingVertical: Metrics.large }}>
          <Text center variant="black_l_bold">{`${selectWaterPerCup} ml`}</Text>
          <Spacer size={10} />
          <SwipeSelector
            color={colors.black}
            current={selectWaterPerCup}
            max={1000}
            min={0}
            onChange={setSelectWaterPerCup}
            step={50}
          />
        </View>
        <Button onPress={handleAddWater} mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
}
