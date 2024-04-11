import { router } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeScreen } from '~/components/HOCs';
import { Spacer } from '~/components/atoms';
import {
  ProfileBasicInformation,
  ProfileSettings,
} from '~/components/molecules';
import { HomeLinks, ProfileLinks } from '~/constants';
import { useSignOut } from '~/hooks';

export default function Profile() {
  const { signOut } = useSignOut();

  const navigateEditProfile = () => {
    router.push(ProfileLinks.EDIT);
  };
  return (
    <SafeScreen>
      <ProfileBasicInformation onPress={navigateEditProfile} />
      <Spacer size={10} />
      <ProfileSettings
        settings={[
          {
            icon: 'album',
            title: 'Face Albums',
            onPress: () => {
              router.push(HomeLinks.FACE_LIST);
            },
          },
          {
            icon: 'album',
            title: 'Body Albums',
            onPress: () => {
              router.push(HomeLinks.BODY_LIST);
            },
          },
          {
            icon: 'album',
            title: 'Meal Albums',
            onPress: () => {
              router.push(HomeLinks.MEAL_LIST);
            },
          },
          {
            icon: 'logout',
            title: 'Log Out',
            onPress: signOut,
          },
        ]}
      />
    </SafeScreen>
  );
}
