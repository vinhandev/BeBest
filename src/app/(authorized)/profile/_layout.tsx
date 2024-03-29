import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      initialRouteName="main"
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default ProfileLayout;
