import React from 'react';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import { View } from 'react-native';
import { Spacer, Text } from '~/components/atoms';

type Props = {
  label?: string | undefined;
  invalid?: boolean;
  error?: FieldError | undefined;
  children: ReactNode;
};
export default function FormControlWrapper({
  error,
  invalid = false,
  label = '',
  children,
}: Props) {
  return (
    <View style={{ flexGrow: 1 }}>
      <Text isHide={!label} variant="black_s_light">
        {label}
      </Text>
      <Spacer size={10} />
      {children}
      <Spacer size={5} />
      <Text isHide={!invalid} variant="error">
        {error?.message}
      </Text>
    </View>
  );
}
