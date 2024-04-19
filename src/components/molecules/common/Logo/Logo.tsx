import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Center, Image } from '~/components/atoms';
import { Images } from '~/constants';
import { styleBackground } from '~/utils';
import { styles } from './Logo.styles';

type Props = {
  size?: number;
};
export default function Logo({ size = 50 }: Props) {
  const { colors } = useTheme();

  const edited = StyleSheet.create({
    container: {
      height: size,
      width: size,
      borderRadius: size * 0.1,
    },
  });

  return (
    <Center style={[styles.container, edited.container]}>
      <Image
        style={[styles.container, edited.container]}
        source={Images.logo}
      />
    </Center>
  );
}
