import {
  Theme,
  DefaultTheme,
  DarkTheme as RNPDarkTheme,
} from 'react-native-paper';
import { Colors } from './colors';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
      tertiary: string;
      quaternary: string;
      white: string;
      black: string;
      error: string;
      success: string;
      purple: string;
    }
  }
}

export const LightTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.dark_blue,
    secondary: Colors.dark_grey,
    tertiary: Colors.grey,
    quaternary: Colors.light_grey,
    white: Colors.white,
    black: Colors.black,
    error: Colors.red,
    success: Colors.green,
    backdrop: Colors.grey_2,
    purple: Colors.purple,
  },
};
export const DarkTheme: ReactNativePaper.Theme = {
  ...RNPDarkTheme,
  colors: {
    ...RNPDarkTheme.colors,
    primary: Colors.dark_blue,
    secondary: Colors.dark_grey,
    tertiary: Colors.grey,
    quaternary: Colors.light_grey,
    white: Colors.white,
    black: Colors.black,
    error: Colors.red,
    success: Colors.green,
    backdrop: Colors.grey_2,
    purple: Colors.purple,

  },
};
