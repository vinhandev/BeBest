import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { styleBackground, styleBorderColor, styleColor } from '~/utils';
import { styles } from './Today.styles';
import { useUserStore } from '~/stores';
import { useGetHomeInformation } from '~/hooks';
import { Image, Row, Spacer, Text } from '~/components/atoms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FixedSizes, HomeLinks, Metrics, Rounds, today } from '~/constants';
import MealListRouter from '~/app/(authorized)/home/meal-list';
import { Header } from '~/components/molecules';
import { router } from 'expo-router';

export default function TodayScreen() {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const profile = useUserStore((state) => state.profile);
  const { body, face, meals } = useGetHomeInformation();

  const innerStyle = StyleSheet.create({
    container: {
      height: Metrics.screenHeight - top - bottom - FixedSizes.bottom_bar,
    },
  });

  return (
    <View style={styleBackground(colors.primary)}>
      <View style={innerStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header
            title=""
            left={{
              icon: 'back',
              onPress: () => {
                router.push(HomeLinks.HOME);
              },
            }}
          />
          <View style={styles.container}>
            <View>
              <Text style={styleColor(colors.white)} variant="black_s_light">
                {profile?.name}
              </Text>
              <Text style={styleColor(colors.white)} variant="black_l_bold">
                {today.toDateString()}
              </Text>
            </View>
            <Spacer size={20} />
            <Row gap={10} alignItems="stretch">
              <View style={{ flex: 1, gap: 10 }}>
                <View>
                  <Image
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      backgroundColor: colors.white,
                      borderRadius: Rounds.small,
                    }}
                    source={face?.path}
                  />
                  <Text
                    style={[
                      {
                        position: 'absolute',
                        left: Metrics.small,
                        bottom: Metrics.small,
                      },
                      styleColor(colors.white),
                    ]}
                    variant="black_s_bold"
                  >
                    face
                  </Text>
                </View>
                <View
                  style={[
                    {
                      borderWidth: 1,
                      borderRadius: Rounds.small,
                      padding: Metrics.small,
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
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
                <View>
                  <Image
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 0.485,
                      borderRadius: Rounds.small,
                      backgroundColor: colors.white,
                    }}
                    source={body?.path}
                  />
                  <Text
                    style={[
                      {
                        position: 'absolute',
                        left: Metrics.small,
                        bottom: Metrics.small,
                      },
                      styleColor(colors.white),
                    ]}
                    variant="black_s_bold"
                  >
                    body
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, gap: 10 }}>
                {meals?.map((item) => (
                  <View
                    key={item.mealTime}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderRadius: Rounds.small,
                      backgroundColor: colors.white,
                    }}
                  >
                    <Image
                      style={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1,
                        borderRadius: Rounds.small,
                        backgroundColor: colors.white,
                      }}
                      source={item.image}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        left: Metrics.small,
                        bottom: Metrics.small,
                      }}
                    >
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_s_bold"
                      >
                        {item.mealTime}
                      </Text>
                      <Text
                        style={styleColor(colors.white)}
                        variant="black_s_light"
                      >{`${item.calories} kcal`}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Row>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
