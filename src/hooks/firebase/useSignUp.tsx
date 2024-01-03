import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthErrorMap,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth';
import { useState } from 'react';
import { logError } from '~/utils';
export const useSignUp = () => {
  const auth = getAuth();
  const [isLoading, setLoading] = useState(false);

  async function signUp(email: string, password: string) {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return response;
    } catch (error) {
      const code = (error as AuthError).code;
      if (code === AuthErrorCodes.EMAIL_EXISTS) {
        throw Error('The email address is already in use by another account.');
      }
      logError(error as Error);
      setLoading(false);
      throw Error('Something went wrong. Please try again.');
    }
  }

  return { isLoading, signUp };
};
