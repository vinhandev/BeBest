import React from 'react';
import { ButtonProps, Button as RNPButton } from 'react-native-paper';
import { FontSizes } from '~/constants';

type Props = Omit<ButtonProps, 'theme'>;
export default function Button({ ...props }: Props) {
  return (
    <RNPButton
      labelStyle={{
        fontSize: FontSizes.s,
        textTransform: 'capitalize',
        fontWeight: '400',
        paddingVertical: 4,
      }}
      style={{
        borderRadius: 10,
      }}
      {...props}
    />
  );
}
