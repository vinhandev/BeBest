import { useState } from 'react';
import { logError } from '~/utils';
import auth from '@react-native-firebase/auth';

export const useSignIn = () => {
  const [isLoading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      return response.user;
    } catch (error) {
      logError(error as Error);
      setLoading(false);
      throw Error('Something went wrong. Please try again.');
    }
  }

  return { isLoading, signIn };
};
