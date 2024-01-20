import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Images } from '~/constants';

import { getUriImage, styleColor } from '~/utils';

import { Image, Row, Text } from '~/components/atoms';

import { styles } from './HomeHeader.styles';
import { ImageSource } from 'expo-image';
import Styles from '~/styles';

type Props = {
  time: string;
  message: string;
  avatar: string | undefined;
};
export default function HomeHeader({ avatar, message, time }: Props) {
  const { colors } = useTheme();
  return (
    <Row>
      <View>
        <Text style={[styles.time, styleColor(colors.white)]}>{time}</Text>
        <Text style={[styles.message, styleColor(colors.white)]}>
          {message}
        </Text>
      </View>
      <View>
        <Image
          style={[styles.image, Styles.shadow]}
          defaultImage={Images.defaultUserAvatar}
          source={getUriImage(avatar)}
        />
      </View>
    </Row>
  );
}
