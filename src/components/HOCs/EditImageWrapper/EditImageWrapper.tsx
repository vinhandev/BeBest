import { Image } from 'moti';
import React from 'react';
import { ImageSourcePropType, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/molecules';
import { rotateAndSaveImage } from '~/utils';

type Props = {
  children: React.ReactNode;
  url: string | null;
  onChangeUrl: (image: string) => void;
  onPress: (formattedImage: string) => void | Promise<void>;
};
export const EditImageWrapper = ({
  children,
  url,
  onPress,
  onChangeUrl,
}: Props) => {
  if (url === null) return children;

  const handleConfirmPhoto = async () => {
    await onPress(url);
  };

  const handleRotatePhoto = async () => {
    const asset = await rotateAndSaveImage(`file://${url}`);
    onChangeUrl(`${asset?.uri}`);
  };

  console.log(url);

  return (
    <SafeAreaView>
      <Text>Edit Image</Text>
      <View
        style={{
          height: '50%',
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Image
          key={url}
          src={'file://' + url}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: 10,
          }}
        />
      </View>
      <Button onPress={handleRotatePhoto}>Rotate</Button>
      <Button onPress={handleConfirmPhoto}>Confirm Photo</Button>
    </SafeAreaView>
  );
};
