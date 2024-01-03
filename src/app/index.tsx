import '~/services/firebase/config';
import { Redirect } from 'expo-router';
import React from 'react';
import { useInitializeApp } from '~/hooks';

export default function App() {
  useInitializeApp();
  return <Redirect href={'/sign-in'} />;
}
