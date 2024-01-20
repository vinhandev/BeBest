import React from 'react';
import { Children, ReactNode } from 'react';
import {
  FlexAlignType,
  FlexStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  children: ReactNode;
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  style?: StyleProp<ViewStyle>;
};
export default function Row({
  children,
  alignItems = 'center',
  justifyContent = 'space-between',
  style,
}: Props) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          alignItems,
          justifyContent,
        },
      ]}
    >
      {children}
    </View>
  );
}
