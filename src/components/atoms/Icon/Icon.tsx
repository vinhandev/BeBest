import React from 'react';
import {
  Ionicons,
  Foundation,
  FontAwesome5,
  Entypo,
  AntDesign,
} from '@expo/vector-icons';

import { IconType } from '~/types';

type Props = {
  variant: IconType;
  size: number;
  color: string;
};
export default function Icon({ variant, ...props }: Props) {
  switch (variant) {
    case 'home':
      return <Foundation name="home" {...props} />;
    case 'analyst':
      return <Foundation name="graph-pie" {...props} />;
    case 'profile':
      return <FontAwesome5 name="user-alt" {...props} size={props.size - 4} />;
    case 'run':
      return <FontAwesome5 name="running" {...props} />;
    case 'water':
      return <Entypo name="cup" {...props} />;
    case 'right':
      return <AntDesign name="right" {...props} />;
    case 'left':
      return <AntDesign name="left" {...props} />;
    case 'logout':
      return <AntDesign name="logout" {...props} />;
    case 'eye':
      return <Ionicons name="eye" {...props} />;
    case 'eye-off':
      return <Ionicons name="eye-off" {...props} />;
    default:
      break;
  }
}
