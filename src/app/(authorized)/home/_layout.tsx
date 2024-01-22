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
        animation: 'slide_from_bottom',
        animationDuration: 100,
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="task-list" />
    </Stack>
  );
};

export default ProfileLayout;
