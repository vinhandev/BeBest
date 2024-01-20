import React from 'react';
import { Text as RNText, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontSizes, FontWeight } from '~/constants';

type Props = TextProps & {
  variant?:
    | 'bold_small'
    | 'content'
    | 'button'
    | 'error'
    | 'label'
    | 'medium_title'
    | 'big_title';
  isHide?: boolean;
};
export default function Text({
  variant,
  isHide = false,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  if (isHide) return null;

  let custom: StyleProp<TextStyle> = {};
  switch (variant) {
    case 'bold_small':
      custom = {
        fontWeight: 'bold',
        fontSize: FontSizes.small,
      };
      break;
    case 'error':
      custom = {
        color: colors.error,
        fontSize: FontSizes.ex_small,
      };
      break;
    case 'label':
      custom = {
        color: colors.black,
        fontSize: FontSizes.small,
        fontWeight: '300',
      };
      break;
    case 'big_title':
      custom = {
        color: colors.black,
        fontSize: FontSizes.big,
        fontWeight: '300',
      };
      break;
    case 'medium_title':
      custom = {
        color: colors.black,
        fontSize: FontSizes.medium,
        fontWeight: FontWeight.bold,
      };
      break;
    case 'content':
      custom = {};
      break;
    case 'button':
      custom = {};
      break;
    default:
      break;
  }

  return <RNText style={[style, custom]} {...props} />;
}
