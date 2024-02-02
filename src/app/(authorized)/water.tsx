import React from 'react';
import { View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import { useTheme } from 'react-native-paper';
import { styleBackground, styleColor } from '~/utils';
import { SafeScreen } from '~/components/HOCs';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, Row, Text, WaveAnimation } from '~/components/atoms';
import { FixedSizes, Metrics } from '~/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WaterRouter() {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const profile = useUserStore((state) => state.profile);

  const [drinkWater, setDrinkWater] = React.useState(0);
  const [waterPerCup, setWaterPerCup] = React.useState(150);

  const handleAddWater = () => {
    if (drinkWater + waterPerCup > (profile?.waterPerDay ?? 0)) {
    } else {
      setDrinkWater(drinkWater + waterPerCup);
    }
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
        <TouchableOpacity>
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
        }}
      >
        <WaveAnimation
          waterPercent={drinkWater / (profile?.waterPerDay ?? 1)}
        />
      </View>
    </View>
  );
}
