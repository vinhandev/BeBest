import { Dimensions } from 'react-native';

const dimensionSizes = Dimensions.get('screen');
export const Metrics = {
  screenWidth: dimensionSizes.width,
  screenHeight: dimensionSizes.height,
  ex_small: 5,
  small: 10,
  medium: 20,
  large: 30,
  ex_large: 40,
} as const;

export const Rounds = {
  small: 6,
  normal: 10,
  large: 50,
  circle: 1000,
} as const;

export const FontSizes = {
  ex_small: 12,
  small: 15,
  regular: 20,
  medium: 24,
  big: 40,
} as const;

export const FixedSizes = {
  form_input: 50,
};
