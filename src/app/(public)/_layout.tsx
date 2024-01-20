import React from 'react';
import { Stack } from 'expo-router';

const PublicNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Clerk Auth App',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="start-up"
        options={{
          headerTitle: 'Reset Password',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="init-profile"
        options={{
          headerTitle: 'Init Profile',
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicNavigator;
