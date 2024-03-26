import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import colors from 'react-native-ui-lib/src/style/colors';
import { Image, Text } from '~/components/atoms';
import { Rounds, Metrics } from '~/constants';
import { styleColor } from '~/utils';

type Props = {
  image: string;
  text: string;
  subText: string;
};
export default function TodayImage({ image, text, subText }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: Rounds.small,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.white,
          borderRadius: Rounds.small,
        }}
        source={image}
      />
      <LinearGradient
        colors={['#00000000', '#000000CC']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: Rounds.small,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: Metrics.small,
          bottom: Metrics.small,
        }}
      >
        <Text style={[styleColor(colors.white)]} variant="black_s_bold">
          {text}
        </Text>
        {subText && (
          <Text style={[styleColor(colors.white)]} variant="black_s_light">
            {subText}
          </Text>
        )}
      </View>
    </View>
  );
}
