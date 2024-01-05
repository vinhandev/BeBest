import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon } from '~/components/atoms';
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
  const { colors } = useTheme();
  const user = useUserStore((state) => state.user);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.quaternary,
      }}
    >
      <Tabs.Screen
        name="run"
        options={{
          headerTitle: 'Run',
          tabBarShowLabel: false,
          tabBarIcon(props) {
            return <Icon variant="run" {...props} />;
          },
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="water"
        options={{
          headerTitle: 'Water',
          tabBarShowLabel: false,
          tabBarIcon(props) {
            return <Icon variant="water" {...props} />;
          },
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarShowLabel: false,
          tabBarIcon(props) {
            return <Icon variant="home" {...props} />;
          },
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="analyst"
        options={{
          headerTitle: 'Analyst',
          tabBarShowLabel: false,
          tabBarIcon(props) {
            return <Icon variant="analyst" {...props} />;
          },
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          headerShown: true,
          tabBarShowLabel: false,
          headerRight: () => <LogoutButton />,
          tabBarIcon(props) {
            return <Icon variant="profile" {...props} />;
          },
        }}
        redirect={!user}
      />
    </Tabs>
  );
}
