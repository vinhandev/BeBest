import { router } from 'expo-router';
import React from 'react';
import { SignUpScreen } from '~/screens';

export default function SignUpRoute() {
  function onNavigateSignIn() {
    router.back();
  }
  function onNavigateHome() {
    router.push('/home');
  }
  return <SignUpScreen onSignIn={onNavigateSignIn} onHome={onNavigateHome}/>;
}
