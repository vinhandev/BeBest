import React, { useRef, useState } from 'react';
import { View } from 'moti';

import { useCreateUserBody, useCreateUserFace, useSaveImage } from '~/hooks';

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
import { styles } from './AddBody.styles';
import { Button } from '~/components/molecules';
import { TouchableOpacity } from 'react-native-ui-lib';
import * as MediaLibrary from 'expo-media-library';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function AddBodyScreen() {
  const { t } = useTranslation('bottomSheet');
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const dateString = getDateStringForImageFile(today);
  const filename = `${uid}_${dateString}`;
  const path = `images/bodies/${filename}_body.jpeg`;

  const setTempImage = useSystemStore((state) => state.setTempImage);
  const setConfettiVariant = useSystemStore(
    (state) => state.setConfettiVariant
  );
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
  const { create } = useCreateUserBody();
  const { uploadImage } = useSaveImage();

  const handleViewPictures = () => {
    router.push(HomeLinks.BODY_LIST);
  };

  const handleFlipCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        const uri = `file://${file.path}`;
        const image = await ImageCropPicker.openCropper({
          path: uri,
          width: 600,
          height: 900,
          mediaType: 'photo',
        });
        if (uri) {
          const savedUrlInFirebase = await uploadImage(image.path, path);
          if (savedUrlInFirebase) {
            await create(filename, {
              path: savedUrlInFirebase,
              time: new Date().getTime(),
              uid,
            });
            setTempImage(savedUrlInFirebase);
            setConfettiVariant('body');
            router.push(HomeLinks.CONFETTI);
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
