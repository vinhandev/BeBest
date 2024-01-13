import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="home"
        options={{
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="edit"
        options={{
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default ProfileLayout;
