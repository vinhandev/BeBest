import React from 'react';
import { ImageProps, ImageSource, Image as RNImage } from 'expo-image';

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
  const displaySource = source !== undefined ? source : defaultImage;
  return <RNImage source={displaySource} {...props} />;
}
