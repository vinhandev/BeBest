import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTheme } from 'react-native-paper';

export function Background() {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[
        colors.water,
        colors.purple,
        colors.water,
        colors.success,
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
      }}
    />
  );
}
