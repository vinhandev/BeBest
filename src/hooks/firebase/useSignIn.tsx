import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { logError } from '~/utils';
export const useSignIn = () => {
  const auth = getAuth();
  const [isLoading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
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
