import React from 'react';
import { Text as RNText, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontSizes, FontWeight } from '~/constants';

type Props = TextProps & {
  variant?:
    | 'black_l_bold'
    | 'black_m_bold'
    | 'black_s_bold'
    | 'black_xs_bold'
    | 'black_s_light'
    | 'black_s_regular'
    | 'black_l_light'
    | 'black_xl_light'
    | 'black_xl_bold'
    | 'black_xs_light'
    | 'task'
    | 'button'
    | 'error'
    | 'streak';
  isHide?: boolean;
  center?: boolean;
};
export default function Text({
  variant,
  isHide = false,
  center = false,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  if (isHide) return null;
  let custom: StyleProp<TextStyle> = {};

  type ColorsKeys = keyof typeof colors;
  type FontSizeKeys = keyof typeof FontSizes;
  type FontWeightKeys = keyof typeof FontWeight;

  const renderText = ({
    color,
    fontSize,
    fontWeight,
  }: {
    color: ColorsKeys;
    fontSize: FontSizeKeys;
    fontWeight: FontWeightKeys;
  }) => {
    return {
      color: colors[color],
      fontSize: FontSizes[fontSize],
      fontWeight: FontWeight[fontWeight],
    };
  };

  switch (variant) {
    case 'black_xs_bold':
      custom = renderText({
        color: 'black',
        fontSize: 'xs',
        fontWeight: 'bold',
      });
      break;
    case 'black_s_bold':
      custom = renderText({
        color: 'black',
        fontSize: 's',
        fontWeight: 'bold',
      });
      break;
    case 'black_m_bold':
      custom = renderText({
        color: 'black',
        fontSize: 'm',
        fontWeight: 'bold',
      });
      break;
    case 'black_l_light':
      custom = renderText({
        color: 'black',
        fontSize: 'l',
        fontWeight: 'light',
      });
      break;
    case 'black_xs_light':
      custom = renderText({
        color: 'black',
        fontSize: 'xs',
        fontWeight: 'light',
      });
      break;
    case 'error':
      custom = renderText({
        color: 'error',
        fontSize: 'xs',
        fontWeight: 'regular',
      });
      break;
    case 'streak':
      custom = renderText({
        color: 'error',
        fontSize: 's',
        fontWeight: 'bold',
      });
      break;
    case 'black_s_light':
      custom = renderText({
        color: 'black',
        fontSize: 's',
        fontWeight: 'light',
      });
      break;
    case 'black_xl_light':
      custom = renderText({
        color: 'black',
        fontSize: 'xl',
        fontWeight: 'light',
      });
      break;
    case 'black_xl_bold':
      custom = renderText({
        color: 'black',
        fontSize: 'xl',
        fontWeight: 'bold',
      });
      break;
    case 'black_l_bold':
      custom = renderText({
        color: 'black',
        fontSize: 'l',
        fontWeight: 'bold',
      });
      break;
    case 'black_s_regular':
      custom = renderText({
        color: 'black',
        fontSize: 's',
        fontWeight: 'regular',
      });
      break;
    case 'button':
      custom = renderText({
        color: 'black',
        fontSize: 'm',
        fontWeight: 'regular',
      });
      break;
    default:
      break;
  }

  return (
    <RNText
      style={[custom, style, { textAlign: center ? 'center' : 'left' }]}
      {...props}
    />
  );
}
