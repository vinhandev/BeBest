import { Redirect, Slot, router } from 'expo-router';
import React, { useEffect } from 'react';
import { HomeLinks, PublicLinks } from '~/constants';
import { useWatchAuth } from '~/hooks';

export default function App() {
  const { initializing, user } = useWatchAuth();

  useEffect(() => {
    if (initializing) router.replace(PublicLinks.START_UP);
    if (!user && !initializing) router.replace(PublicLinks.SIGN_IN);
    else {
      router.replace(HomeLinks.HOME);
    }
  }, [initializing, user]);
  return <Slot />;
}
