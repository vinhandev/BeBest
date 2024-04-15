import React, { LegacyRef, useRef } from 'react';
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
import { Background, Header, Logo } from '~/components/molecules';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TodayImage from './TodayImage/TodayImage';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { BlurView } from 'expo-blur';
import Styles from '~/styles';

export default function TodayScreen() {
  const { colors } = useTheme();
  const ref = useRef<ViewShot>();
  const { top, bottom } = useSafeAreaInsets();
  const profile = useUserStore((state) => state.profile);
  const { face, body, meals } = useGetHomeInformation();
  // const meals = [];
  // const body = undefined;
  // const face = undefined;
  const isAddedFace = face !== undefined;
  const isAddedBody = body !== undefined;
  const isAddedMeals = meals !== undefined && meals?.length > 0;
  const waterToday = useUserStore((state) => state.waterToday);
  const innerStyle = StyleSheet.create({
    body: {
      flex: 1,
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

  const totalMealKcal = meals?.reduce((a, b) => a + b.calories, 0) ?? 0;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            ref={ref as LegacyRef<ViewShot>}
            options={{
              fileName: 'Your-File-Name',
              format: 'jpg',
              quality: 0.9,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                paddingTop: top,
                paddingBottom: bottom,
              }}
            >
              <Background />
              <View
                style={{
                  width: Metrics.screenWidth - 2 * Metrics.medium,
                  height: undefined,
                  aspectRatio: isAddedMeals ? 9 / 16 : 4 / 5,
                  gap: 10,
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text
                    style={styleColor(colors.white)}
                    variant="black_s_light"
                  >
                    {profile?.name}
                  </Text>
                  <Text style={styleColor(colors.white)} variant="black_l_bold">
                    {today.toDateString()}
                  </Text>
                </View>
                <Row
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                  }}
                  gap={10}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: isAddedMeals
                        ? 'column'
                        : isAddedFace
                        ? 'column'
                        : 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: isAddedFace ? 3 : 0,

                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          display: isAddedFace ? 'flex' : 'none',
                          flex: 1,
                        }}
                      >
                        <TodayImage
                          image={face?.path ?? ''}
                          text="face"
                          subText=""
                        />
                      </View>
                      <View
                        style={[
                          {
                            borderRadius: 10,
                            overflow: 'hidden',
                          },
                          Styles.shadow,
                        ]}
                      >
                        <BlurView
                          intensity={80}
                          tint="light"
                          style={{
                            padding: Metrics.small,
                          }}
                        >
                          <Text
                            style={{
                              height: 30,
                            }}
                          >
                            <Text variant="black_l_bold">
                              {profile?.weight}
                            </Text>
                            <Text variant="black_l_light"> KG</Text>
                          </Text>

                          <Text
                            style={{
                              height: 30,
                            }}
                          >
                            <Text variant="black_l_bold">
                              {profile?.height}
                            </Text>
                            <Text variant="black_l_light"> CM</Text>
                          </Text>
                          {waterToday > 0 ? (
                            <Text
                              style={{
                                height: 30,
                              }}
                            >
                              <Text variant="black_l_bold">{waterToday}</Text>
                              <Text variant="black_l_light"> ML</Text>
                            </Text>
                          ) : null}
                          {totalMealKcal > 0 && (
                            <Text
                              style={{
                                height: 30,
                              }}
                            >
                              <Text variant="black_l_bold">
                                {totalMealKcal}
                              </Text>
                              <Text variant="black_l_light"> KCAL</Text>
                            </Text>
                          )}
                        </BlurView>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          flex: isAddedFace ? 2 : 6,
                        },
                        {
                          display: isAddedBody ? 'flex' : 'none',
                        },
                      ]}
                    >
                      <TodayImage
                        image={body?.path ?? ''}
                        text="body"
                        subText=""
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      gap: 10,
                      display: isAddedMeals ? 'flex' : 'none',
                    }}
                  >
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
                <Row
                  style={{
                    alignSelf: 'flex-end',
                    gap: 10,
                  }}
                >
                  <Logo size={20} />
                  <Text style={styleColor(colors.white)} variant="black_s_bold">
                    BeBest
                  </Text>
                </Row>
              </View>
            </View>
          </ViewShot>
        </ScrollView>
      </View>
    </View>
  );
}
