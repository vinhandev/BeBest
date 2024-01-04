import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

import React from 'react';
import { Pressable, Text } from 'react-native';
import { useSignOut } from '~/hooks';
import { useUserStore } from '~/stores/useUserStore';

export const LogoutButton = () => {
  const { signOut } = useSignOut();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Text>Sign Out</Text>
    </Pressable>
  );
};
export default function AppLayout() {
  const user = useUserStore((state) => state.user);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="run"
        options={{
          headerTitle: 'Run',
          tabBarLabel: 'Run',
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="water"
        options={{
          headerTitle: 'Water',
          tabBarLabel: 'Water',
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarLabel: 'Home',
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="analyst"
        options={{
          headerTitle: 'Analyst',
          tabBarLabel: 'Analyst',
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!user}
      />
    </Tabs>
  );
}
