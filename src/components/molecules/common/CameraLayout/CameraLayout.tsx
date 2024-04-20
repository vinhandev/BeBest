import React, { useEffect, useRef, useState } from 'react';
import { View } from 'moti';

import { useCreateUserFace, useInitData, useSaveImage } from '~/hooks';

import { Icon, Row, Spacer, Text } from '~/components/atoms';
import {
  getDateStringForImageFile,
  rotateAndSaveImage,
  showToast,
  styleBackground,
  styleBorderColor,
  styleColor,
} from '~/utils';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { router } from 'expo-router';
import { HomeLinks, Metrics, meals, today } from '~/constants';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { ConfettiVariantType, useSystemStore, useUserStore } from '~/stores';
import { styles } from './CameraLayout.styles';
import { Background, Button, SwipeSelector } from '~/components/molecules';
import { Picker, TouchableOpacity } from 'react-native-ui-lib';
import ImageCropPicker from 'react-native-image-crop-picker';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Styles from '~/styles';
import { Dimensions } from 'react-native';
import { ImagePropsType } from '~/types/images';
import { MealDefaultProps, MealTimeType } from '~/types/meals';
import { BlurView } from 'expo-blur';

type Props = {
  photoAspectRatio: number;
} & (
  | {
      imageType: 'face' | 'body';
      onCreate: (filename: string, image: ImagePropsType) => Promise<void>;
    }
  | {
      imageType: 'meals';
      onCreate: (filename: string, image: MealDefaultProps) => Promise<void>;
      mealTime: MealTimeType;
      calories: number;
      onChangeMealTime: (mealTime: MealTimeType) => void;
      onChangeCalories: (calories: number) => void;
    }
);
export default function CameraLayout(props: Props) {
  const { imageType, photoAspectRatio, onCreate } = props;
  const [url, setUrl] = useState<string | null>(null);
  const { t } = useTranslation('bottomSheet');
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const setConfettiVariant = useSystemStore(
    (state) => state.setConfettiVariant
  );
  const setTempImage = useSystemStore((state) => state.setTempImage);
  const dateString = getDateStringForImageFile(today);
  const filename = `${uid}_${dateString}_${
    imageType === 'meals' ? props.mealTime.toLowerCase() : ''
  }`;
  const path = `images/${imageType}/${
    imageType === 'meals' ? `${props.mealTime}_` : ''
  }${filename}_${imageType}.jpeg`;

  const setLoading = useSystemStore((state) => state.setLoading);
  const loading = useSystemStore((state) => state.loading);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const init = useInitData();

  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { uploadImage } = useSaveImage();

  const width = Dimensions.get('window').width;
  const height = Math.round(width / photoAspectRatio);

  let confettiVariant: ConfettiVariantType;
  switch (imageType) {
    case 'face':
      confettiVariant = 'face';
      break;
    case 'body':
      confettiVariant = 'body';
      break;
    case 'meals':
      confettiVariant = 'meal';
      break;

    default:
      break;
  }

  const handleCreateImage = async (path: string) => {
    switch (imageType) {
      case 'body':
      case 'face': {
        const param: ImagePropsType = {
          path,
          time: new Date().getTime(),
          uid,
        };
        return onCreate(filename, param);
      }
      case 'meals': {
        const { calories, mealTime } = props;
        const param: MealDefaultProps = {
          calories: calories,
          mealTime: mealTime,
          image: path,
          time: new Date().getTime(),
          uid: uid,
        };
        return onCreate(filename, param);
      }
      default:
        break;
    }
  };

  const handleViewPictures = async () => {
    try {
      const file = await ImageCropPicker.openPicker({
        width,
        height,
        cropping: true,
        mediaType: 'photo',
      });
      setUrl(file.path);
      console.log('path', file.path);
      if (file.path) {
        await handleSubmitPhoto(file.path);
      }
    } catch (error) {
      showToast((error as Error).message);
    }
  };

  const handleFlipCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleTakePicture = async () => {
    try {
      if (camera.current) {
        const file = await camera.current.takePhoto({});
        setUrl(file.path);
        const image = await ImageCropPicker.openCropper({
          path: 'file://' + file.path,
          width,
          height,
          cropping: true,
          mediaType: 'photo',
        });
        await handleSubmitPhoto(image.path);
      }
    } catch (error) {
      showToast((error as Error).message);
    }
  };

  const handleSubmitPhoto = async (asset: string) => {
    setLoading(true);
    try {
      console.log('path', path);
      if (asset) {
        const savedUrlInFirebase = await uploadImage(asset, path);
        if (savedUrlInFirebase) {
          await handleCreateImage(savedUrlInFirebase);
          setTempImage(savedUrlInFirebase);
          setConfettiVariant(confettiVariant);
          router.push(HomeLinks.CONFETTI);
          await init();
        }
      }
    } catch (error) {
      showToast((error as Error).message);
    }
    setLoading(false)
  };

  const handleBack = () => {
    router.replace(HomeLinks.HOME);
  };

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
        {props.imageType === 'meals' ? (
          <View style={styles.meals}>
            <Picker
              style={[styles.picker, styleBackground(colors.black)]}
              items={meals}
              value={props.mealTime}
              placeholder={'Placeholder'}
              onChange={(value) =>
                props.onChangeMealTime(value as MealTimeType)
              }
              renderPicker={(_: undefined, label: string | undefined) => (
                <View
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                >
                  <BlurView
                    intensity={40}
                    style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                  >
                    <Text
                      variant="black_s_regular"
                      style={[styleColor(colors.white)]}
                    >
                      {label}
                    </Text>
                  </BlurView>
                </View>
              )}
            />
          </View>
        ) : null}
        {device ? (
          <Camera
            style={styles.camera}
            ref={camera}
            device={device}
            format={format}
            photo
            isActive={!loading}
            resizeMode="cover"
            photoHdr
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Background />
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              No Device
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: '300',
                textAlign: 'center',
              }}
            >
              Please select image from your album.
            </Text>
          </View>
        )}

        <Row style={styles.actions}>
          <TouchableOpacity
            style={{
              borderRadius: 1000,
              overflow: 'hidden',
            }}
            onPress={handleFlipCamera}
          >
            <BlurView
              intensity={100}
              blurReductionFactor={10}
              // reducedTransparencyFallbackColor="white"
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <Icon variant="camera-flip" size={20} color={colors.white} />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 1000,
              overflow: 'hidden',
            }}
            onPress={handleTakePicture}
          >
            <BlurView
              intensity={100}
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={[styles.takePhotoIcon, styleBackground(colors.white)]}
              />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 1000,
              overflow: 'hidden',
            }}
            onPress={handleViewPictures}
          >
            <BlurView
              intensity={100}
              blurReductionFactor={10}
              // reducedTransparencyFallbackColor="white"
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <Icon variant="album" size={20} color={colors.white} />
            </BlurView>
          </TouchableOpacity>
        </Row>
      </View>
      {props.imageType === 'meals' ? (
        <View
          style={{
            zIndex: 100,
          }}
        >
          <Spacer size={10} />
          <Text
            variant="black_l_bold"
            center
            style={styleColor(colors.white)}
          >{`${props.calories} kcal`}</Text>

          <Spacer size={10} />
          <SwipeSelector
            current={props.calories}
            onChange={props.onChangeCalories}
            max={2000}
            min={0}
            step={50}
            color={colors.white}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
