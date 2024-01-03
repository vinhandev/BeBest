import { router } from 'expo-router';
import React from 'react';
import { SignInScreen } from '~/screens';

export default function SignInRoute() {
  function onNavigateSignUp() {
    router.push('/sign-up');
  }
  function onNavigateHome() {
    router.push('/home');
  }
  return <SignInScreen onSignUp={onNavigateSignUp} onHome={onNavigateHome}/>;
}
