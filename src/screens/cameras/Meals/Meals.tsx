import React, { useEffect, useRef, useState } from 'react';
import { View } from 'moti';

import {
  useCreateUserBody,
  useCreateUserFace,
  useCreateUserMeal,
  useGetHomeInformation,
  useSaveImage,
} from '~/hooks';

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
import { useSystemStore, useUserStore } from '~/stores';
import { styles } from './Meals.styles';
import { Button, SwipeSelector } from '~/components/molecules';
import { Picker, TouchableOpacity } from 'react-native-ui-lib';
import * as MediaLibrary from 'expo-media-library';
import { MealTimeType } from '~/types/meals';

export default function MealsScreen() {
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const dateString = getDateStringForImageFile(today);

  const { meals: selectedMeals } = useGetHomeInformation();
  let filterMeals = meals?.filter((item) => {
    const isExistedMealTime = selectedMeals?.find(
      (subItem) => subItem.mealTime === item.value
    );
    return !isExistedMealTime;
  });
  const setLoading = useSystemStore((state) => state.setLoading);
  const loading = useSystemStore((state) => state.loading);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [mealTime, setMealTime] = useState<MealTimeType>(
    filterMeals[0].value as MealTimeType
  );
  const [calories, setCalories] = useState<number>(500);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { create } = useCreateUserMeal();
  const { uploadImage } = useSaveImage();

  const filename = `${uid}_${dateString}_${mealTime.toLowerCase()}`;
  const path = `images/bodies/${filename}_meals_${mealTime.toLowerCase()}.jpeg`;

  const handleViewPictures = () => {
    router.push(HomeLinks.MEAL_LIST);
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
        await MediaLibrary.saveToLibraryAsync(uri);

        if (uri) {
          const savedUrlInFirebase = await uploadImage(uri, path);
          if (savedUrlInFirebase) {
            await create(filename, {
              calories: calories,
              mealTime: mealTime,
              image: savedUrlInFirebase,
              time: new Date().getTime(),
              uid: uid,
            });
            router.push(HomeLinks.MEAL_LIST);
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
      <View style={{ flex: 1 }}>
        <View style={styles.meals}>
          <Picker
            style={[
              styles.picker,
              styleBackground(colors.black),
              styleColor(colors.white),
            ]}
            items={filterMeals}
            value={mealTime}
            placeholder={'Placeholder'}
            onChange={(value) => setMealTime(value as MealTimeType)}
          />
        </View>
        <Camera
          style={styles.camera}
          ref={camera}
          device={device}
          format={format}
          photo
          isActive={!loading}
        />
      </View>
      <View style={styles.calories}>
        <Spacer size={10} />
        <Text
          variant="black_l_bold"
          center
          style={styleColor(colors.white)}
        >{`${calories} kcal`}</Text>

        <Spacer size={10} />
        <SwipeSelector
          current={calories}
          onChange={setCalories}
          max={2000}
          min={0}
          step={50}
          color={colors.white}
        />
      </View>
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
