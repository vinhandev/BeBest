import { Dimensions } from 'react-native';

const dimensionSizes = Dimensions.get('screen');
export const Metrics = {
  screenWidth: dimensionSizes.width,
  screenHeight: dimensionSizes.height,
  ex_small: 5,
  small: 10,
  medium: 25,
  large: 30,
  ex_large: 40,
} as const;

export const Rounds = {
  small: 10,
  normal: 10,
  large: 30,
  circle: 1000,
} as const;

export const FontSizes = {
  xs: 12,
  s: 15,
  m: 20,
  l: 24,
  xl: 40,
} as const;

export const FixedSizes = {
  form_input: 50,
  avatar: 50,
  border_width: 0.3,
  circle_progress_bar: 50,
  radio: 20,
  bottom_bar: 67,
  header: 80,
  day: 80,
};

export const FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
} as const;
