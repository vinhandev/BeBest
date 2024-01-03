import { Redirect } from 'expo-router';
import React from 'react';
import { useWatchAuth } from '~/hooks';

export default function App() {
  useWatchAuth();
  return <Redirect href={'/sign-in'} />;
}
