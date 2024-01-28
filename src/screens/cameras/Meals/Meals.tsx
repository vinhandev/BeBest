import React, { useRef, useState } from 'react';
import { View } from 'moti';

import {
  useCreateUserBody,
  useCreateUserFace,
  useCreateUserMeal,
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
import { Button } from '~/components/molecules';
import { Picker, TouchableOpacity } from 'react-native-ui-lib';
import * as MediaLibrary from 'expo-media-library';
import { MealTimeType } from '~/types/meals';
import { FlatList, ScrollView } from 'react-native';

export default function MealsScreen() {
  const { colors } = useTheme();
  const uid = useUserStore((state) => state.user?.uid) ?? '';
  const dateString = getDateStringForImageFile(today);

  const setLoading = useSystemStore((state) => state.setLoading);
  const loading = useSystemStore((state) => state.loading);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [mealTime, setMealTime] = useState<MealTimeType>('Breakfast');
  const [calories, setCalories] = useState<number>(200);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const camera = useRef<Camera>(null);
  const { create } = useCreateUserMeal();
  const { uploadImage } = useSaveImage();

  const caloriesList = [];
  for (let index = 0; index < 21; index++) {
    caloriesList.push(index * 5);
  }

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
            items={meals}
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
        <View
          style={{
            justifyContent: 'flex-end',
            height: 20,
          }}
        >
          <View
            style={{
              width: 0.5,
              height: 30,
              backgroundColor: colors.error,
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              width: Metrics.screenWidth,
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              onScroll={(e) =>
                setCalories(Math.round(e.nativeEvent.contentOffset.x) * 5)
              }
              horizontal
            >
              <Row
                style={{
                  paddingLeft: Metrics.screenWidth * 0.5,
                  paddingRight: Metrics.screenWidth * 0.5 - 1,
                  alignItems: 'flex-end',
                }}
              >
                {caloriesList.map((item, index) => (
                  <View
                    style={{
                      width: index === caloriesList.length - 1 ? 1 : 20,
                    }}
                  >
                    <View
                      style={{
                        width: 1,
                        height: index % 5 === 0 ? 15 : 10,
                        backgroundColor:
                          index % 5 === 0 ? colors.white : `${colors.white}55`,
                      }}
                    />
                  </View>
                ))}
              </Row>
            </ScrollView>
          </View>
        </View>
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
