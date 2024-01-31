import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SlideInDown } from 'react-native-reanimated';
import { Modal, TouchableOpacity } from 'react-native-ui-lib';
import { Icon, Image, Row, Text } from '~/components/atoms';
import { Metrics } from '~/constants';
import { styleColor } from '~/utils';

type Props = {
  open: boolean;
  photos: {
    time: number;
    path: string;
  }[];
  selectedIndex: number;
  aspectRatio: number;
  setSelectedIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
};
export default function PictureModal(props: Props) {
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

  const ref = useRef<FlatList>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCompare = () => {
    if (width === Metrics.screenWidth) {
      setWidth(Metrics.screenWidth * 0.5);
    } else {
      setWidth(Metrics.screenWidth);
    }
  };

  const handleBack = () => {
    if (selectedIndex !== 0) {
      setSelectedIndex(selectedIndex - 1);
      ref.current?.scrollToIndex({ index: selectedIndex - 1 });
    }
  };
  const handleNext = () => {
    if (selectedIndex !== photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      ref.current?.scrollToIndex({ index: selectedIndex + 1 });
    }
  };

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
          <Row>
            <TouchableOpacity style={{ padding: 20 }} onPress={handleCompare}>
              <Icon
                variant={width === Metrics.screenWidth ? 'compare' : 'image'}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={handleClose}>
              <Icon variant="close" size={30} color="white" />
            </TouchableOpacity>
          </Row>
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
              <Text
                variant="black_s_bold"
                style={[
                  styleColor(colors.white),
                  {
                    position: 'absolute',
                    left: 10,
                    bottom: 10,
                  },
                ]}
              >
                {new Date(item.time).toDateString()}
              </Text>
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
