import React from 'react';
import { View } from 'moti';

import { useAddNewTask } from '~/hooks';

import { styles } from './BottomSheetCamera.styles';
import Button from '../../../Button/Button';
import { useSystemStore, useUserStore } from '~/stores';

import ImagePicker from 'react-native-image-crop-picker';
import { useBottomSheet } from '@gorhom/bottom-sheet';

export const SnapPoints = ['20%'];
export const Component = () => {
  const { close } = useBottomSheet();
  const setTempImage = useSystemStore((state) => state.setTempImage);
  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      setTempImage(image.path);
      close();
      console.log(image);
    });
  };

  const handleOpenLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      setTempImage(image.path);
      close();
      console.log(image);
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleOpenCamera} mode="contained">
        Open camera
      </Button>
      <Button onPress={handleOpenLibrary} mode="contained">
        Open gallery
      </Button>
    </View>
  );
};
