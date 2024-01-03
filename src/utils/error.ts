import { getCurrentTimeString } from './times';

export const logError = (error: Error) => {
  const mode = process.env.MODE;
  const currentTime = getCurrentTimeString();
  if (mode !== 'production') {
    console.error(`${currentTime}: `, error);
  }
};
