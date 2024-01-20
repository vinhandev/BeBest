import { useUserStore } from '~/stores/useUserStore';
import { log } from './logs';

export const logOut = () => {
  log.debug('Log Out');
  useUserStore.getState().reset();
};
