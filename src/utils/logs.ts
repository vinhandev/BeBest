import {
  logger,
  consoleTransport,
  fileAsyncTransport,
  configLoggerType,
} from 'react-native-logs';
import * as FileSystem from 'expo-file-system';

const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    FS: FileSystem,
  },
};

export const log = logger.createLogger(config);
