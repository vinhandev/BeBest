import React from 'react';
import { ImageProps, ImageSource, Image as RNImage } from 'expo-image';
import { getUriImage, log } from '~/utils';

type Props = ImageProps & {
  defaultImage?:
    | string
    | number
    | ImageSource
    | ImageSource[]
    | string[]
    | null;
};
export default function Image({ defaultImage, source, ...props }: Props) {
  let display = source || defaultImage;

  if (typeof source === 'string') {
    display = getUriImage(source) || defaultImage;
  }

  return <RNImage source={display} {...props} />;
}
