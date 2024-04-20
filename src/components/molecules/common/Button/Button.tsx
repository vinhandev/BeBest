import React from 'react';
import { ButtonProps, Button as RNPButton } from 'react-native-paper';
import { FontSizes, FontWeight } from '~/constants';

type Props = Omit<ButtonProps, 'theme'>;
export default function Button({ ...props }: Props) {
  return (
    <RNPButton
      labelStyle={{
        borderRadius: 10,

        fontSize: FontSizes.s,
        textTransform: 'capitalize',
        fontWeight: FontWeight.medium,
      }}
      contentStyle={{
        paddingVertical: 8,
        borderRadius: 10,
      }}
      style={{
        borderRadius: 10,
      }}
      {...props}
    />
  );
}
