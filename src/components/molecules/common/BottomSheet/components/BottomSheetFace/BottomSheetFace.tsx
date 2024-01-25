import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { useAddNewFace, useAddNewTask, useAddTask } from '~/hooks';

import { styles } from './BottomSheetFace.styles';
import { Row, Spacer, Text } from '~/components/atoms';
import { TaskPropsType } from '~/types/task';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { compileDueTime, showToast, styleBackground } from '~/utils';
import { Keyboard, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import Button from '../../../Button/Button';
import { router } from 'expo-router';
import { HomeLinks } from '~/constants';
import { useTheme } from 'react-native-paper';

export const SnapPoints = ['100%'];
export const Component = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const device = useCameraDevice('front');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
      photoResolution: 'max',
      pixelFormat: 'native',
    },
  ]);
  const camera = useRef<Camera>(null);
  const { addTask } = useAddNewTask();
  const { close } = useBottomSheet();
  const { add: addFace } = useAddNewFace();

  const onValid = (data: any) => {
    const param: TaskPropsType = {
      time: new Date().getTime(),
      description: data.description,
      done: false,
      doneTime: compileDueTime(data.due, data.time).getTime(),
      type: data.type,
    };
    addTask(param);
    close();
    Keyboard.dismiss();
  };

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
    router.push(HomeLinks.FACE_LIST);
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
          router.push(HomeLinks.FACE_LIST);
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
    <View style={[styles.container, styleBackground(colors.black)]}>
      <Camera
        style={styles.camera}
        ref={camera}
        device={device}
        format={format}
        zoom={1}
        photo
        isActive
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
