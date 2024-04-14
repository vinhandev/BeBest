import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { Image, Text } from '~/components/atoms';
import { Background, Button } from '~/components/molecules';
import { HomeLinks } from '~/constants';
import { useSystemStore, useUserStore } from '~/stores';
import LottieView from 'lottie-react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

export default function Confetti() {
  const { colors } = useTheme();
  const animation = useRef<LottieView>(null);
  const tempImage = useSystemStore((state) => state.tempImage);
  const profile = useUserStore((state) => state.profile);
  const confettiVariant = useSystemStore((state) => state.confettiVariant);

  useEffect(() => {
    async function handleCongrats() {
      if (animation.current) {
        const { sound } = await Audio.Sound.createAsync(
          require('../../../../assets/sound/congrat.mp3')
        );
        await sound.playAsync();
        animation.current?.play();
      }
    }
    handleCongrats();
  });

  let description = '',
    redirectUrl = '';
  switch (confettiVariant) {
    case 'face':
      description = 'Success added face ! 1% better everday !';
      redirectUrl = HomeLinks.FACE_LIST;
      break;
    case 'body':
      description = 'Success added body ! One step become better !';
      redirectUrl = HomeLinks.BODY_LIST;
      break;
    case 'meal':
      description = 'Success added meal ! Believe in yourself, you can do it !';
      redirectUrl = HomeLinks.MEAL_LIST;
      break;
    case 'weight':
      description = 'Success added weight ! Nice try man, trust the process !';
      redirectUrl = HomeLinks.WEIGHT_LIST;
      break;
    case 'height':
      description = 'Success added height ! Hey, keep it up !';
      redirectUrl = HomeLinks.HEIGHT_LIST;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <Background />
      <LottieView
        loop={false}
        ref={animation}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
        source={require('../../../../assets/animation/confetti.json')}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text
          center
          style={{
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: colors.white,
          }}
        >
          Congrats
        </Text>
        <Text
          center
          style={{
            fontSize: 20,
            fontWeight: '300',
            color: colors.white,
          }}
        >
          {description}
        </Text>
      </View>
      {tempImage && confettiVariant === 'body' ? (
        <View
          style={{
            borderRadius: 10,
            height: '60%',
            overflow: 'hidden',
          }}
        >
          <Image
            key={tempImage}
            style={{
              borderRadius: 10,
              width: undefined,
              height: '100%',
              aspectRatio: 2 / 3,
            }}
            source={tempImage}
          />
        </View>
      ) : null}
      {tempImage &&
      (confettiVariant === 'face' || confettiVariant === 'meal') ? (
        <View
          style={{
            borderRadius: 10,
            height: '50%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            key={tempImage}
            style={{
              borderRadius: 10,
              width: undefined,
              height: '100%',
              aspectRatio: 1,
              resizeMode: 'contain',
              overflow: 'hidden',
            }}
            source={tempImage}
          />
        </View>
      ) : null}
      {confettiVariant === 'weight' ? (
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: colors.success,
          }}
        >{`${profile?.weight} kg`}</Text>
      ) : null}
      {confettiVariant === 'height' ? (
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: colors.success,
          }}
        >{`${profile?.height} cm`}</Text>
      ) : null}
      <View
        style={{
          gap: 10,
          width: Dimensions.get('window').width - 40,
        }}
      >
        <Button
          style={{
            backgroundColor: colors.secondary,
            zIndex: 4,
          }}
          mode="contained"
          onPress={() => router.replace(HomeLinks.HOME)}
        >
          Return to home
        </Button>
        <Button
          color={colors.black}
          style={{
            backgroundColor: colors.quaternary,
            zIndex: 4,
          }}
          mode="outlined"
          onPress={() => router.replace(redirectUrl)}
        >
          Go to albums
        </Button>
      </View>
    </SafeAreaView>
  );
}
