import React from 'react';

import { View } from 'moti';
import { Icon, Row, Text } from '~/components/atoms';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styleBackground, styleColor } from '~/utils';
import { useTheme } from 'react-native-paper';
import { FixedSizes, Rounds } from '~/constants';
import { IconType } from '~/types';
import { TouchableOpacity } from 'react-native-ui-lib';

type Props = {
  title: string;
  right?: {
    icon: IconType;
    onPress: () => void;
  };
  left?: {
    icon: IconType;
    onPress: () => void;
  };
};
export default function Header({ title, left, right }: Props) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[
        {
          height: FixedSizes.header,
          borderBottomRightRadius: Rounds.normal,
          borderBottomLeftRadius: Rounds.normal,
        },
        styleBackground(colors.primary),
      ]}
      edges={['top']}
    >
      <Row style={[{ height: '100%' }]}>
        <TouchableOpacity
          disabled={!left}
          onPress={left?.onPress}
          style={{
            height: '100%',
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {left && <Icon variant={left.icon} color={colors.white} size={20} />}
        </TouchableOpacity>
        <Text
          center
          style={[
            {
              flexGrow: 1,
            },
            styleColor(colors.white),
          ]}
          variant="black_m_bold"
        >
          {title}
        </Text>
        <TouchableOpacity
          disabled={!right}
          onPress={right?.onPress}
          style={{
            height: '100%',
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {right && (
            <Icon variant={right.icon} color={colors.white} size={20} />
          )}
        </TouchableOpacity>
      </Row>
    </SafeAreaView>
  );
}
