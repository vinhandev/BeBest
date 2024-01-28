import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { useCreateUserFace, useSaveImage } from '~/hooks';

import { styles } from './BottomSheetFace.styles';
import { Spacer, Text } from '~/components/atoms';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import {
  getDateStringForImageFile,
  log,
  rotateAndSaveImage,
  showToast,
  styleBackground,
} from '~/utils';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import Button from '../../../Button/Button';
import { router } from 'expo-router';
import { HomeLinks, today } from '~/constants';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/stores';

export const SnapPoints = ['100%'];
export const Component = () => {
  const { t } = useTranslation('bottomSheet');
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const dateString = getDateStringForImageFile(today);
  const filename = `${uid}_${dateString}`;
  const path = `images/faces/${filename}_face.jpeg`;

  const [loading, setLoading] = useState(false);
  const device = useCameraDevice('front');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { close } = useBottomSheet();
  const { create } = useCreateUserFace();
  const { uploadImage } = useSaveImage();

  const handleViewPictures = () => {
    close();
    router.push(HomeLinks.FACE_LIST);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        const asset = await rotateAndSaveImage(`file://${file.path}`);

        if (asset) {
          const savedUrlInFirebase = await uploadImage(asset?.uri, path);
          if (savedUrlInFirebase) {
            await create(filename, {
              path: savedUrlInFirebase,
              time: new Date().getTime(),
              uid,
            });
            router.push(HomeLinks.FACE_LIST);
          }
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
        photo
        isActive={!loading}
      />
      <Spacer size={10} />
      <Button loading={loading} onPress={handleTakePicture} mode="contained">
        {t('take_picture')}
      </Button>
      <Spacer size={10} />
      <Button onPress={handleViewPictures}>{t('view_all_pictures')}</Button>
    </View>
  );
};
