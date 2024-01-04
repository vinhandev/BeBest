import React from 'react';
import { Text, View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import auth from '@react-native-firebase/auth';
export default function RunRouter() {
  return (
    <View>
      <Text>Run</Text>
    </View>
  );
}
