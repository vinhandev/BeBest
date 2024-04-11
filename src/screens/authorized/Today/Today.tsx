import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { styleBackground, styleBorderColor, styleColor } from '~/utils';
import { styles } from './Today.styles';
import { useUserStore } from '~/stores';
import { useGetHomeInformation } from '~/hooks';
import { Icon, Image, Row, Spacer, Text } from '~/components/atoms';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { FixedSizes, HomeLinks, Metrics, Rounds, today } from '~/constants';
import MealListRouter from '~/app/(authorized)/home/meal-list';
import { Header } from '~/components/molecules';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TodayImage from './TodayImage/TodayImage';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

export default function TodayScreen() {
  const { colors } = useTheme();
  const ref = useRef<ViewShot>();
  const { top, bottom } = useSafeAreaInsets();
  const profile = useUserStore((state) => state.profile);
  const { body, face, meals } = useGetHomeInformation();
  const waterToday = useUserStore((state) => state.waterToday);
  const innerStyle = StyleSheet.create({
    body: {
      flex: 1,
      // height: Metrics.screenHeight - top - bottom - FixedSizes.bottom_bar * 2,
    },
  });

  const handleShareImage = async () => {
    if (ref?.current?.capture !== undefined) {
      const uri = await ref.current.capture();
      await Share.open({
        url: uri,
        title: `Today: ${today}`,
        type: 'image/jpg',
      });
      console.log(uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleShareImage}
        style={{
          position: 'absolute',
          top: top + 20,
          right: 20,
          zIndex: 100,
          backgroundColor: colors.white,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1000,
        }}
      >
        <Icon variant="share" color={colors.black} size={15} />
      </TouchableOpacity>
      <View style={innerStyle.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <ViewShot
            ref={ref}
            options={{
              fileName: 'Your-File-Name',
              format: 'jpg',
              quality: 0.9,
            }}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                width: Metrics.screenWidth,
                height: undefined,
                aspectRatio: 9 / 16,
                padding: Metrics.medium,
                gap: 10,
              }}
            >
              <View>
                <Text style={styleColor(colors.white)} variant="black_s_light">
                  {profile?.name}
                </Text>
                <Text style={styleColor(colors.white)} variant="black_l_bold">
                  {today.toDateString()}
                </Text>
              </View>
              <Row
                style={{
                  flexGrow: 1,
                }}
                gap={10}
                alignItems="stretch"
              >
                <View style={{ flex: 1, gap: 10, flexDirection: 'column' }}>
                  <View style={{ flex: 1 }}>
                    <TodayImage
                      image={face?.path ?? ''}
                      text="face"
                      subText=""
                    />
                  </View>
                  <View
                    style={[
                      {
                        borderWidth: 1,
                        borderRadius: Rounds.small,
                        padding: Metrics.small,
                      },
                      styleBorderColor(colors.white),
                    ]}
                  >
                    <Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_bold"
                      >
                        {profile?.weight}
                      </Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_light"
                      >
                        {' '}
                        KG
                      </Text>
                    </Text>

                    <Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_bold"
                      >
                        {profile?.height}
                      </Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_light"
                      >
                        {' '}
                        CM
                      </Text>
                    </Text>
                    <Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_bold"
                      >
                        {waterToday}
                      </Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_light"
                      >
                        {' '}
                        ML
                      </Text>
                    </Text>
                    <Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_bold"
                      >
                        {meals?.reduce((a, b) => a + b.calories, 0)}
                      </Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_l_light"
                      >
                        {' '}
                        KCAL
                      </Text>
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <TodayImage
                      image={body?.path ?? ''}
                      text="body"
                      subText=""
                    />
                  </View>
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                  {meals?.map((item) => (
                    <View
                      key={item.mealTime}
                      style={{
                        flex: 1,
                      }}
                    >
                      <TodayImage
                        image={item.image}
                        text={item.mealTime}
                        subText={`${item.calories} kcal`}
                      />
                    </View>
                  ))}
                </View>
              </Row>
            </View>
          </ViewShot>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
