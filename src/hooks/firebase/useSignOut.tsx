import auth from '@react-native-firebase/auth';
import { logError } from '~/utils';
export function useSignOut() {
  async function signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      logError(error as Error);
    }
  }
  return { signOut };
}
