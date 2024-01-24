import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { useAddNewFace, useAddNewTask } from '~/hooks';

import { styles } from './BottomSheetMeal.styles';
import { Spacer, Text } from '~/components/atoms';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { showToast } from '~/utils';
import * as MediaLibrary from 'expo-media-library';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import Button from '../../../Button/Button';
import { router } from 'expo-router';
import { HomeLinks } from '~/constants';
import { useForm } from 'react-hook-form';
import FormInput from '../../../FormInput';
import { useUserStore } from '~/stores';

export const SnapPoints = ['75%'];
export const Component = () => {
  const { control } = useForm();
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
  const { addTask } = useAddNewTask();
  const { close } = useBottomSheet();
  const { add: addFace } = useAddNewFace();
  const defaultMeals = useUserStore((state) => state.defaultMeals);

  const handleViewPictures = () => {
    close();
    router.push(HomeLinks.MEAL_LIST);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        if (permissionResponse?.granted) {
          await MediaLibrary.saveToLibraryAsync(`file://${file.path}`);
          addFace({
            path: `file://${file.path}`,
            time: new Date().getTime(),
          });
          router.push(HomeLinks.MEAL_LIST);
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
      <View>
        <FormInput
          control={control}
          variant="select"
          label="Default meal"
          name="default"
          data={
            defaultMeals?.map((item) => ({
              label: item.name,
              value: item.name,
            })) ?? []
          }
        />
      </View>
      <Spacer size={10} />
      <Button loading={loading} onPress={handleTakePicture} mode="contained">
        Add Meals
      </Button>
      <Spacer size={10} />
      <Button onPress={handleViewPictures}>View All Meals</Button>
    </View>
  );
};
