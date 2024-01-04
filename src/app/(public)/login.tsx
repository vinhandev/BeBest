import { router } from 'expo-router';
import React from 'react';
import { HomeLinks, PublicLinks } from '~/constants';
import { SignInScreen } from '~/screens';

export default function SignInRouter() {
  function onNavigateSignUp() {
    router.push(PublicLinks.SIGN_UP);
  }
  function onNavigateHome() {
    router.push(HomeLinks.HOME);
  }
  return <SignInScreen onSignUp={onNavigateSignUp} onHome={onNavigateHome} />;
}
