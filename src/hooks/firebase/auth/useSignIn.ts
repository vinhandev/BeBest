import { useState } from 'react';
import { logError } from '~/utils';
import auth from '@react-native-firebase/auth';
import { UserCredential } from 'firebase/auth';

export const useSignIn = () => {
  const [isLoading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>();

  async function signIn(phone: string) {
    setLoading(true);
    try {
      const response = await auth().signInWithPhoneNumber(phone);
      setLoading(false);
      setConfirmation(response);
      return response;
    } catch (error) {
      setLoading(false);

      logError(error as Error);
      throw Error('Something went wrong. Please try again.');
    }
  }

  const verifyCode = async (code: string) => {
    if (confirmation) {
      setLoading(true);
      try {
        const response = await confirmation.confirm(code);
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        logError(error as Error);
        throw Error('Something went wrong. Please try again.');
      }
    }
  };

  return {
    isLoading,
    isSended: !!confirmation,
    signIn,
    verifyCode,
  };
};
