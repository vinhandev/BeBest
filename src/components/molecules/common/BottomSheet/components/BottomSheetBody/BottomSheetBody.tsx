import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { styles } from './BottomSheetBody.styles';
import { Spacer, Text } from '~/components/atoms';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { showToast } from '~/utils';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import Button from '../../../Button/Button';
import { router } from 'expo-router';
import { HomeLinks } from '~/constants';

export const SnapPoints = ['90%'];
export const Component = () => {
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
      photoResolution: 'max',
    },
  ]);
  const camera = useRef<Camera>(null);
  const { close } = useBottomSheet();

  const handleOpenLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  };

  const handleViewPictures = () => {
    close();
    router.push(HomeLinks.BODY_LIST);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        if (permissionResponse?.granted) {
          await MediaLibrary.saveToLibraryAsync(`file://${file.path}`);
          add({
            path: `file://${file.path}`,
            time: new Date().getTime(),
          });
          router.push(HomeLinks.BODY_LIST);
        } else {
          await requestPermission();
        }
        close();
      }
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false);
  };

  if (!device)
    return (
      <View>
        <Text>No Device</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={camera}
        device={device}
        format={format}
        photo
        isActive
        orientation="portrait"
      />
      <Spacer size={10} />
      <Button loading={loading} onPress={handleTakePicture} mode="contained">
        Take Picture
      </Button>
      <Spacer size={10} />
      <Button onPress={handleViewPictures}>View All Picture</Button>
    </View>
  );
};
