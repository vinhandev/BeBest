import React from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'react-native-paper';
import { FixedSizes, Metrics } from '~/constants';
import Text from '../../common/Text/Text';

type Props = {
  value: number;
  color?: string;
};
export default function CircleBar({ value, color }: Props) {
  const { colors } = useTheme();
  return (
    <View>
      <AnimatedCircularProgress
        size={FixedSizes.circle_progress_bar}
        width={Metrics.ex_small}
        fill={value}
        tintColor={color ? color : colors.black}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor={colors.backdrop}
        lineCap="round"
      >
        {(fill) => (
          <Text
            style={{ color: color ? color : colors.black }}
            variant="black_xs_bold"
          >{`${Math.round(fill)}%`}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
