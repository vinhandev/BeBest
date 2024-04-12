import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image } from 'moti';
import React, { useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Text } from '~/components/atoms';
import { PublicLinks, AuthorizedLinks } from '~/constants';
import {
  useWatchAuth,
  useGetAllWaterRecords,
  useGetAllWeightRecord,
  useGetAllHeightRecords,
  useGetUserFace,
  useGetUserBody,
  useGetUserMeals,
  useInterval,
} from '~/hooks';
import { useUserStore, useSystemStore } from '~/stores';
import { showError } from '~/utils';

export default function StartUp() {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { colors } = useTheme();
  const waitImages: { image: string; quote: string; actor: string }[] = [
    {
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b0c3be5-7122-4a05-8001-eceb9dfeddd3/da0qomb-2715d90a-67bc-4613-b35a-8ffd3b6dfebe.jpg/v1/fit/w_828,h_1472,q_70,strp/cristiano_ronaldo_mobile_wallpaper_by_f_edits_da0qomb-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI3NSIsInBhdGgiOiJcL2ZcLzZiMGMzYmU1LTcxMjItNGEwNS04MDAxLWVjZWI5ZGZlZGRkM1wvZGEwcW9tYi0yNzE1ZDkwYS02N2JjLTQ2MTMtYjM1YS04ZmZkM2I2ZGZlYmUuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.UL8QvvIgYf4kL2FrV3KY3lAXwrKzJm4ebAMbK0-UtMA',
      quote: 'I will not stop until I have achieved everything.',
      actor: 'Cristiano Ronaldo',
    },
    {
      image:
        'https://is.zobj.net/image-server/v1/images?r=mrBlH5KRgk9rWxR-UHowopUHyLr5elJ68HMqAJmtccUC18aSIjhBrOIA9EIdXSF2sgmtwE2BAtG7o8ehxgQtF5_a9jTAdPTnsZQqnoK4BqATm9YtEWhy9vKkSlHPn4MJ_mLauApevIxK23CAy4IpYl-Lj7cgC-2qIS9Q7Efh8Z5OEl4ShsQwB_HFte6ioafLbBrwO4ZbQ8JptNqLaTqVseI2y8YZRxuJ9KiMlA',
      quote:
        'The biggest factor in success is self-belief. Without it, no matter how talented you are, you will never achieve anything significant.',
      actor: 'Andrew Tate',
    },
    {
      image:
        'https://r1.ilikewallpaper.net/iphone-x-wallpapers/download-152092/Lionel-Messi-FIFA-Word-CUP-2022.jpg',
      quote:
        'You have to fight to reach your dream. You have to sacrifice and work hard for it.',
      actor: 'Lionel Messi',
    },
    {
      image:
        'https://i.pinimg.com/564x/e4/ff/55/e4ff55076255ff9fbf731003833a45ec.jpg',
      quote: 'The hero is you.',
      actor: 'David Goggins',
    },
    {
      image:
        'https://i.pinimg.com/564x/66/8b/bd/668bbd38aa30d59952387a57c5a26eb4.jpg',
      quote: 'Rest at the end. Not in the middle',
      actor: 'Kobe Bryant',
    },
  ];

  useInterval(() => {
    if (selectedImage < waitImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
  }, 3000);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        source={{ uri: waitImages[selectedImage].image }}
      />
      <LinearGradient
        colors={['#00000000', colors.primary]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <View
        style={{
          padding: 50,
          gap: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',

            gap: 20,
          }}
        >
          <Text
            center
            variant="black_l_bold"
            style={{
              color: colors.white,
            }}
          >
            {waitImages[selectedImage].quote}
          </Text>
          <Text
            center
            variant="black_s_regular"
            style={{
              color: colors.white,
            }}
          >
            {waitImages[selectedImage].actor}
          </Text>
        </View>
        <ActivityIndicator color={colors.white} size={'small'} />
      </View>
    </View>
  );
}
