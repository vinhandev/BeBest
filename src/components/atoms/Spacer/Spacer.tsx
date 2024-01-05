import React = require('react');
import { View } from 'react-native';

type Props = {
  size?: number;
};
export default function Spacer({ size = 5 }: Props) {
  return <View style={{ height: size }} />;
}
