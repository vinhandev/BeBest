import React from 'react';
import { Text as RNText, TextProps, StyleProp, TextStyle } from 'react-native';
import { FontSizes } from '~/constants';
import { Sizes } from '~/styles';

type Props = TextProps & {
  variant?: 'bold_small' | 'content' | 'button';
};
export default function Text({ variant, style, ...props }: Props) {
  let customStyle: StyleProp<TextStyle> = {};
  switch (variant) {
    case 'bold_small':
      customStyle = {
        fontWeight: 'bold',
        fontSize: FontSizes.small,
      };
      break;
    case 'content':
      customStyle = {};
      break;
    case 'button':
      customStyle = {};
      break;
    default:
      break;
  }
  return <RNText style={[style, customStyle]} {...props} />;
}
