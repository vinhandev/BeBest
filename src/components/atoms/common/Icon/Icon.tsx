import React from 'react';
import {
  Ionicons,
  Foundation,
  FontAwesome,
  FontAwesome5,
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
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
    case 'today':
      return <Ionicons name="today" {...props} />;
    case 'camera-flip':
      return <MaterialIcons name="flip-camera-ios" {...props} />;
    case 'compare':
      return <MaterialCommunityIcons name="compare" {...props} />;
    case 'image':
      return <MaterialCommunityIcons name="image" {...props} />;
    case 'close':
      return <MaterialIcons name="close" {...props} />;
    case 'run':
      return <FontAwesome5 name="running" {...props} />;
    case 'water':
      return <Entypo name="cup" {...props} />;
    case 'album':
      return <Ionicons name="albums" {...props} />;
    case 'face':
      return <MaterialIcons name="tag-faces" {...props} />;
    case 'back':
      return <Ionicons name="chevron-back" {...props} />;
    case 'next':
      return <Ionicons name="chevron-forward" {...props} />;
    case 'body':
      return <Ionicons name="body" {...props} />;
    case 'meal':
      return <MaterialIcons name="set-meal" {...props} />;
    case 'weight':
      return <FontAwesome5 name="weight" {...props} />;
    case 'checked':
      return <FontAwesome name="check" {...props} />;
    case 'height':
      return <MaterialCommunityIcons name="human-male-height" {...props} />;
    case 'streak':
      return <FontAwesome5 name="fire" {...props} />;
    case 'right':
      return <AntDesign name="right" {...props} />;
    case 'left':
      return <AntDesign name="left" {...props} />;
    case 'list':
      return <Entypo name="list" {...props} />;
    case 'logout':
      return <AntDesign name="logout" {...props} />;
    case 'add':
      return <Ionicons name="add" {...props} size={props.size + 5} />;
    case 'eye':
      return <Ionicons name="eye" {...props} />;
    case 'eye-off':
      return <Ionicons name="eye-off" {...props} />;
    default:
      break;
  }
}
