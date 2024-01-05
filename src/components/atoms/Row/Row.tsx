import React from 'react';
import { Children, ReactNode } from 'react';
import { FlexAlignType, FlexStyle, View } from 'react-native';

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
};
export default function Row({
  children,
  alignItems = 'center',
  justifyContent = 'space-between',
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems,
        justifyContent,
      }}
    >
      {children}
    </View>
  );
}
