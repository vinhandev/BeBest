import React from 'react';

import { Redirect } from 'expo-router';
import { PublicLinks } from '~/constants';


export default function StartPage() {
 
  return <Redirect href={PublicLinks.SIGN_IN} />;
}
