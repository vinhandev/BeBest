import { router } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Spacer } from '~/components/atoms';
import {
  ProfileBasicInformation,
  ProfileSettings,
} from '~/components/molecules';
import { useSignOut } from '~/hooks';

export default function Profile() {
  const { signOut } = useSignOut();

  const navigateEditProfile = () => {
    router.push('/group.profile/edit');
  };
  return (
    <View>
      <ProfileBasicInformation onPress={navigateEditProfile} />
      <Spacer size={10} />
      <ProfileSettings
        settings={[
          {
            icon: 'logout',
            title: 'Log Out',
            onPress: signOut,
          },
        ]}
      />
    </View>
  );
}
