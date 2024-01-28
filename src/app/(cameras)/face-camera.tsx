import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { useCreateUserFace, useSaveImage } from '~/hooks';

import { Icon, Row, Spacer, Text } from '~/components/atoms';
import {
  getDateStringForImageFile,
  rotateAndSaveImage,
  showToast,
  styleBackground,
  styleBorderColor,
} from '~/utils';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { router } from 'expo-router';
import { HomeLinks, today } from '~/constants';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSystemStore, useUserStore } from '~/stores';
import { styles } from './styles';
import { Button } from '~/components/molecules';
import { TouchableOpacity } from 'react-native-ui-lib';

export default function FaceCameraRoute() {
  const { t } = useTranslation('bottomSheet');
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const dateString = getDateStringForImageFile(today);
  const filename = `${uid}_${dateString}`;
  const path = `images/faces/${filename}_face.jpeg`;

  const setLoading = useSystemStore((state) => state.setLoading);
  const loading = useSystemStore((state) => state.loading);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { create } = useCreateUserFace();
  const { uploadImage } = useSaveImage();

  const handleViewPictures = () => {
    close();
    router.push(HomeLinks.FACE_LIST);
  };

  const handleFlipCamera = () => {
    setIsFrontCamera(!isFrontCamera);
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
      <Row style={styles.actions}>
        <TouchableOpacity onPress={handleFlipCamera}>
          <Icon variant="camera-flip" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTakePicture}>
          <View
            style={[
              styles.outlineTakePhotoIcon,
              styleBorderColor(colors.white),
            ]}
          >
            <View
              style={[styles.takePhotoIcon, styleBackground(colors.white)]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewPictures}>
          <Icon variant="album" size={30} color={colors.white} />
        </TouchableOpacity>
      </Row>
    </View>
  );
}
