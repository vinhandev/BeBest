import auth from '@react-native-firebase/auth';
import { logError, logOut } from '~/utils';
export function useSignOut() {
  async function signOut() {
    try {
      await auth().signOut();
      logOut();
    } catch (error) {
      logError(error as Error);
    }
  }
  return { signOut };
}
