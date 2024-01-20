import { Animated } from 'react-native';

export const styleBackground = (backgroundColor: string) => {
  return {
    backgroundColor,
  };
};
export const styleColor = (color: string) => {
  return {
    color,
  };
};
export const styleBorderColor = (borderColor: string) => {
  return {
    borderColor,
  };
};

export const stylePressed = (
  pressed: boolean,
  value?: number | Animated.Value
) => {
  return {
    transform: [
      {
        scale: pressed ? value ?? 0.95 : 1,
      },
    ],
  };
};
