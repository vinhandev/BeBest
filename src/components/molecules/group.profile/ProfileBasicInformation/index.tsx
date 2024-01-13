import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon, Row, Text } from '~/components/atoms';
import { styles } from './styles';

type Props = {
  onPress: () => void;
};
const defaultAvatar = 'https://i.pravatar.cc/300?u=a042581f4e29026704d';
export default function ProfileBasicInformation({ onPress }: Props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        padding: 20,
        backgroundColor: colors.white,
      }}
    >
      <Row justifyContent="flex-start">
        <Image
          source={{ uri: defaultAvatar }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 1000,
            backgroundColor: colors.primary,
          }}
        />
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <Text variant="bold_small" style={styles.container}>
            UserName
          </Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Row style={{ gap: 5 }}>
              <Text>Edit Profile</Text>
              <Icon variant="right" size={15} color={colors.black} />
            </Row>
          </TouchableOpacity>
        </View>
      </Row>
    </TouchableOpacity>
  );
}
