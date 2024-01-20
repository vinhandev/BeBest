import Config from 'react-native-config';
import { getCurrentTimeString } from './times';
import { log } from './logs';

export const logError = (error: Error) => {
  const mode = Config.MODE;
  const currentTime = getCurrentTimeString();
  if (mode !== 'production') {
    console.error(`${currentTime}: `, error);
  }
};

export const showError = (error: unknown) => {
  if (error instanceof Error) {
    log.error(error);
  }
};
