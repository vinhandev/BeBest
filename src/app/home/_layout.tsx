import { Redirect, Tabs } from 'expo-router';

import React from 'react';
import { useUserStore } from '~/stores/useUserStore';

export default function AppLayout() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Tabs />;
}
