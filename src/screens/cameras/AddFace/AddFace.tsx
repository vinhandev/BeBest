import React, { useEffect, useRef, useState } from 'react';
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
import { HomeLinks, Metrics, today } from '~/constants';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSystemStore, useUserStore } from '~/stores';
import { styles } from './AddFace.styles';
import { Button } from '~/components/molecules';
import { TouchableOpacity } from 'react-native-ui-lib';
import ImageCropPicker from 'react-native-image-crop-picker';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Styles from '~/styles';

export default function AddFaceScreen() {
  const [url, setUrl] = useState<string | null>(null);
  const { t } = useTranslation('bottomSheet');
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const setConfettiVariant = useSystemStore(
    (state) => state.setConfettiVariant
  );
  const setTempImage = useSystemStore((state) => state.setTempImage);
  const dateString = getDateStringForImageFile(today);
  const filename = `${uid}_${dateString}`;
  const path = `images/faces/${filename}_face.jpeg`;

  const setLoading = useSystemStore((state) => state.setLoading);
  const loading = useSystemStore((state) => state.loading);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { create } = useCreateUserFace();
  const { uploadImage } = useSaveImage();

  const handleViewPictures = async () => {
    setLoading(true);
    try {
      const file = await ImageCropPicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: 'photo',
      });
      setUrl(file.path);
      console.log(file.path);
      // const image = await ImageCropPicker.openCropper({
      //   path: 'file://' + file.path,
      //   width: 500,
      //   height: 500,
      //   cropping: true,
      //   mediaType: 'photo',
      // });
      // await handleSubmitPhoto(image.path);
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false);
  };

  const handleFlipCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleTakePicture = async () => {
    setLoading(true);
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        setUrl(file.path);
        const image = await ImageCropPicker.openCropper({
          path: 'file://' + file.path,
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        });
        await handleSubmitPhoto(image.path);
      }
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false);
  };

  const handleSubmitPhoto = async (asset: string) => {
    if (asset) {
      const savedUrlInFirebase = await uploadImage(asset, path);
      if (savedUrlInFirebase) {
        await create(filename, {
          path: savedUrlInFirebase,
          time: new Date().getTime(),
          uid,
        });
        setTempImage(savedUrlInFirebase);
        setConfettiVariant('face');
        router.push(HomeLinks.CONFETTI);
      }
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  if (!device)
    return (
      <View>
        <Text>No Device</Text>
      </View>
    );

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#000000');
  });

  return (
    <SafeAreaView style={[styles.container, styleBackground(colors.black)]}>
      <StatusBar style="light" />

      <View
        style={{
          width: Metrics.screenWidth - 20 * 2,
          height: undefined,
          aspectRatio: 9 / 16,
          borderRadius: 20,
          overflow: 'hidden',
          margin: 20,
        }}
      >
        <Row
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 100,
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <Icon variant="back" size={30} color={colors.white} />
          </TouchableOpacity>
        </Row>
        <Camera
          style={[{ backgroundColor: 'red' }, styles.camera]}
          ref={camera}
          device={device}
          format={format}
          photo
          isActive={!loading}
          resizeMode="cover"
          photoHdr
        />
        <Row style={styles.actions}>
          <TouchableOpacity onPress={handleFlipCamera}>
            <Icon variant="camera-flip" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                borderRadius: 1000,
                overflow: 'hidden',
              }            ]}
            onPress={handleTakePicture}
          >
            <BlurView
              intensity={40}
              // tint="dark"
              style={{
                padding: 5,
              }}
            >
              <View
                style={[styles.takePhotoIcon, styleBackground(colors.white)]}
              />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleViewPictures}>
            <Icon variant="album" size={30} color={colors.white} />
          </TouchableOpacity>
        </Row>
      </View>
    </SafeAreaView>
  );
}
