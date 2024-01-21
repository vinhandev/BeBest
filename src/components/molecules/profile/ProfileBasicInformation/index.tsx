import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon, Image, Row, Text } from '~/components/atoms';
import { styles } from './styles';
import { Images } from '~/constants';
import { useUserStore } from '~/stores/useUserStore';

type Props = {
  onPress: () => void;
};
export default function ProfileBasicInformation({ onPress }: Props) {
  const { colors } = useTheme();
  const profile = useUserStore((state) => state.profile);
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
          defaultImage={Images.defaultUserAvatar}
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
          <Text variant="black_s_bold" style={styles.container}>
            {profile?.name}
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
