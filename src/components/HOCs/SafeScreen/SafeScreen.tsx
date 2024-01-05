import React, { ReactNode } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  background?: string;
  children: ReactNode;
};
export default function SafeScreen({ background, children }: Props) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: background ?? colors.background }}
    >
      {children}
    </SafeAreaView>
  );
}
