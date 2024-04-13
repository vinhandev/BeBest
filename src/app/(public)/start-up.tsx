import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image } from 'moti';
import React, { useEffect, useMemo, useState } from 'react';
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
        'https://i.pinimg.com/originals/a7/ff/7e/a7ff7ed4aed0538cec5596c395980df1.jpg',
      quote:
        'Your future is the result of your daily actions. You’re defined by what you do today. Lazy now, loser later. Get to work.',
      actor: 'Andrew Tate',
    },
    {
      image:
        'https://i.pinimg.com/564x/78/05/03/780503aca32b2f61b8d487f7ed961517.jpg',
      quote:
        'You have to fight to reach your dream. You have to sacrifice and work hard for it.',
      actor: 'Lionel Messi',
    },
    {
      image:
        'https://i.pinimg.com/originals/d8/0d/64/d80d643a2c69138465a77441f90d75f0.jpg',
      quote: 'The hero is you.',
      actor: 'David Goggins',
    },
    {
      image:
        'https://i.pinimg.com/564x/37/03/4c/37034ccfecd0dd39aeea7aa31cf66983.jpg',
      quote: 'Rest at the end. Not in the middle',
      actor: 'Kobe Bryant',
    },
    {
      image:
        'https://i.pinimg.com/originals/38/57/13/385713e991eab9f4b97c9e51b26ed1de.png',
      quote: 'If you want to become successful, you have to deal with pressure. If you can’t deal with pressure, that’s your fault. Put yourself through more hard sh*t.',
      actor: 'Tristan Tate',
    },
  ];

  const shuffleImages = useMemo(() => {
    const shuffledImages = waitImages;
    for (let i = waitImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [
        shuffledImages[j],
        shuffledImages[i],
      ];
    }
    return shuffledImages;
  }, [waitImages]);

  useInterval(() => {
    if (selectedImage < waitImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
  }, 5000);

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
        source={{ uri: shuffleImages[selectedImage].image }}
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
            {shuffleImages[selectedImage].quote}
          </Text>
          <Text
            center
            variant="black_s_regular"
            style={{
              color: colors.white,
            }}
          >
            {shuffleImages[selectedImage].actor}
          </Text>
        </View>

        <ActivityIndicator color={colors.white} size={'small'} />
      </View>
    </View>
  );
}
