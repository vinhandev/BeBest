import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import { useTheme } from 'react-native-paper';
import {
  getDateStringForImageFile,
  showToast,
  styleBackground,
  styleColor,
} from '~/utils';
import { SafeScreen } from '~/components/HOCs';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, Row, Text, WaveAnimation } from '~/components/atoms';
import { FixedSizes, Metrics, WaterLinks, today, todayTime } from '~/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import {
  useGetAllWaterRecords,
  useGetHomeInformation,
  useUpdateUserWater,
} from '~/hooks';
import { useSystemStore } from '~/stores';

export default function WaterRouter() {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const setLoading = useSystemStore((state) => state.setLoading);
  const profile = useUserStore((state) => state.profile);
  const uid = useUserStore((state) => state.user?.uid ?? '');
  const waterPerCup = useUserStore((state) => state.waterPerCup);
  const { create } = useUpdateUserWater();
  const { get } = useGetAllWaterRecords();
  const time = getDateStringForImageFile(today);
  const { water } = useGetHomeInformation();
  const filename = `${uid}_${time}`;

  const drinkWater = useUserStore((state) => state.waterToday);
  const setDrinkWater = useUserStore((state) => state.setWaterToday);

  useEffect(() => {
    if (water !== 0) {
      setDrinkWater(water);
    }
  }, []);

  const handleAddWater = async () => {
    setLoading(true);
    try {
      if (profile?.waterPerDay) {
        if (drinkWater < (profile.waterPerDay ?? 0)) {
          if (drinkWater + waterPerCup >= profile.waterPerDay) {
            await create(filename, {
              time: todayTime,
              uid,
              value: drinkWater + waterPerCup,
            });
            await get();
          }
          setDrinkWater(drinkWater + waterPerCup);
        }
      }
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <View
      style={[
        styleBackground(colors.primary),
        {
          flex: 1,
          paddingTop: top,
        },
      ]}
    >
      <View
        style={{
          padding: Metrics.medium,
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push(WaterLinks.EDIT);
          }}
        >
          <Icon variant="edit" color={colors.white} size={20} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            paddingVertical: Metrics.ex_large,
          }}
        >
          <View>
            <Text
              center
              style={[
                styleColor(colors.white),
                {
                  fontSize: 100,
                  fontWeight: 'bold',
                },
              ]}
            >
              {`${Math.round(
                (drinkWater / (profile?.waterPerDay ?? 1)) * 100
              )}%`}
            </Text>
            <Text
              center
              style={[
                styleColor(colors.white),
                {
                  letterSpacing: 10,
                },
              ]}
              variant="black_l_light"
            >{`${drinkWater} / ${profile?.waterPerDay ?? 0} ml`}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleAddWater}
              style={[
                styleBackground(colors.white),
                {
                  paddingVertical: 10,
                  paddingHorizontal: 20,

                  justifyContent: 'center',
                  alignItems: 'center',

                  borderRadius: 1000,
                },
              ]}
            >
              <Row>
                <Icon variant="add" color={colors.primary} size={30} />
                <Text variant="black_m_regular">{`${waterPerCup} ml`}</Text>
              </Row>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -2,
          justifyContent: 'flex-end',
        }}
      >
        <WaveAnimation
          waterPercent={drinkWater / (profile?.waterPerDay ?? 1)}
        />
      </View>
    </View>
  );
}
