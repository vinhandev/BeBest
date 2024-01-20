import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon, Row } from '~/components/atoms';
import { IconType } from '~/types';

type Props = {
  settings: {
    onPress: () => void;
    title: string;
    icon: IconType;
  }[];
};
export default function ProfileSettings({ settings }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}
    >
      <FlatList
        data={settings}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                borderTopWidth: index !== 0 ? 0.5 : 0,
                paddingVertical: 20,
                marginHorizontal: 20,
              }}
            >
              <Row style={{ gap: 10 }}>
                <Icon variant={item.icon} size={20} color={colors.black} />
                <View
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <Text>{item.title}</Text>
                </View>
              </Row>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
