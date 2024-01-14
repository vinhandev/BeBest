import React from 'react';
import { View, ViewProps } from 'react-native';

type Props = ViewProps;
export default function Center({ style, ...props }: Props) {
  return (
    <View
      style={[
        { alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
        style,
      ]}
      {...props}
    />
  );
}
