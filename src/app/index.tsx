import React from 'react';

import { Redirect } from 'expo-router';
import { PublicLinks } from '~/constants';

import '../translations';

export default function StartPage() {
  return <Redirect href={PublicLinks.START_UP} />;
}
