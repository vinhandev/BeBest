import { useState } from 'react';
import { logError } from '~/utils';
import auth from '@react-native-firebase/auth';
import { UserCredential } from 'firebase/auth';
import { useUserStore } from '~/stores';

export const useSignIn = () => {
  const [isLoading, setLoading] = useState(false);

  const confirmation = useUserStore((state) => state.confirmation);
  const setConfirmation = useUserStore((state) => state.setConfirmation);

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
