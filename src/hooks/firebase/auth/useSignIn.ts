import { useState } from 'react';
import { logError } from '~/utils';
import auth from '@react-native-firebase/auth';
import { UserCredential } from 'firebase/auth';

export const useSignIn = () => {
  const [isLoading, setLoading] = useState(false);
  const [confirmation, setConfirmation] =
    useState<(verificationCode: string) => Promise<UserCredential | null>>();
  const [code, setCode] = useState('');

  async function signIn(phone: string) {
    setLoading(true);
    try {
      const response = await auth().signInWithPhoneNumber(phone);

      setLoading(false);
      setConfirmation(response.confirm as any);
    } catch (error) {
      logError(error as Error);
      setLoading(false);
      throw Error('Something went wrong. Please try again.');
    }
  }

  async function confirmCode() {
    setLoading(true);
    try {
      await confirmation?.(code);
      setLoading(false);
      return true;
    } catch (error) {
      logError(error as Error);
      setLoading(false);
      return false;
    }
  }

  return {
    isLoading,
    signIn,
    confirmCode,
    onChangeCode: setCode,
    code,
    isSended: !!confirmation,
  };
};
