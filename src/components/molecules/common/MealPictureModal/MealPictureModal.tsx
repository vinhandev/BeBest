import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SlideInDown } from 'react-native-reanimated';
import { Modal, Picker, TouchableOpacity } from 'react-native-ui-lib';
import { Icon, Image, Row, Text } from '~/components/atoms';
import { Metrics } from '~/constants';
import { styleBackground, styleColor } from '~/utils';
import { styles } from './MealPictureModal.styles';
import { MealTimeType } from '~/types/meals';

type Props = {
  open: boolean;
  photos: {
    time: number;
    path: string;
    mealTime: MealTimeType;
    calories: number;
  }[];
  selectedIndex: number;
  aspectRatio: number;
  setSelectedIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
};
export default function MealPictureModal(props: Props) {
  const {
    open,
    photos,
    selectedIndex,
    aspectRatio,
    setOpen,
    setSelectedIndex,
  } = props;

  const { colors } = useTheme();

  const [width, setWidth] = useState(Metrics.screenWidth);
  const isComparedMode = width === Metrics.screenWidth / 2;

  const [compareSelectedIndex, setCompareSelectedIndex] = useState(0);

  const ref = useRef<FlatList>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCompare = () => {
    if (!isComparedMode) {
      setWidth(Metrics.screenWidth * 0.5);
    } else {
      setWidth(Metrics.screenWidth);
    }
  };

  const handleBack = () => {
    if (isComparedMode) {
      if (selectedIndex > 1) {
        setSelectedIndex(selectedIndex - 1);
        setCompareSelectedIndex(() => selectedIndex - 2);
        ref.current?.scrollToIndex({ index: selectedIndex - 1 });
      }
    } else {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        ref.current?.scrollToIndex({ index: selectedIndex - 1 });
      }
    }
  };
  const handleNext = () => {
    if (isComparedMode) {
      if (selectedIndex < photos.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        setCompareSelectedIndex(() => selectedIndex);
        ref.current?.scrollToIndex({ index: selectedIndex + 1 });
      }
    } else {
      if (selectedIndex < photos.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        ref.current?.scrollToIndex({ index: selectedIndex + 1 });
      }
    }
  };

  const optionPhotos = photos.map((item, index) => ({
    label: new Date(item.time).toDateString(),
    value: index,
  }));

  useEffect(() => {
    ref.current?.scrollToIndex({ index: selectedIndex });
  }, [selectedIndex]);

  return (
    <Modal visible={open}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          flex: 1,
        }}
      >
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={handleClose}>
            <Icon variant="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={ref}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          horizontal
          data={photos}
          keyExtractor={(item) => item.path}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Image
                source={{ uri: item.path }}
                style={{
                  width: width,
                  height: undefined,
                  aspectRatio,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10,
                }}
              >
                <Text
                  variant="black_s_light"
                  style={[styleColor(colors.white)]}
                >
                  {item.mealTime}
                </Text>
                <Text
                  variant="black_l_light"
                  style={[styleColor(colors.white)]}
                >
                  {item.calories} kcal
                </Text>
                <Text variant="black_s_bold" style={[styleColor(colors.white)]}>
                  {new Date(item.time).toDateString()}
                </Text>
              </View>
            </View>
          )}
          onEndReached={() => console.log('end')}
        />

        <View>
          <Row alignItems="center" justifyContent="center" gap={50}>
            <TouchableOpacity style={{ padding: 20 }} onPress={handleBack}>
              <Icon variant="back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={handleNext}>
              <Icon variant="next" size={30} color="white" />
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    </Modal>
  );
}
