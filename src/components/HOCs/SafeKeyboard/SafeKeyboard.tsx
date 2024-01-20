import React from 'react';
import { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Metrics } from '~/constants';

export default function SafeKeyboard(props: ScrollViewProps) {
  return (
    <ScrollView
      scrollEnabled={false}
      automaticallyAdjustKeyboardInsets
      {...props}
    />
  );
}
