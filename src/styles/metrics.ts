import { Dimensions } from 'react-native';

const dimensionSize = Dimensions.get('screen');

export const Sizes = {
  small: 10,
  medium: 20,
  large: 30,
  ex_large: 40,
  device_width: dimensionSize.width,
  device_height: dimensionSize.height,
};

export const FontSizes = {
  ex_small: 12,
  small: 14,
  medium: 18,
  big: 20,
};
