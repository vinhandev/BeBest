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
import { LinearGradient } from 'expo-linear-gradient';
import TodayImage from './TodayImage/TodayImage';

export default function TodayScreen() {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const profile = useUserStore((state) => state.profile);
  const { body, face, meals } = useGetHomeInformation();

  const innerStyle = StyleSheet.create({
    body: {
      height: Metrics.screenHeight - top - bottom - FixedSizes.bottom_bar + 20,
      backgroundColor: colors.primary,
      paddingHorizontal: Metrics.medium,
      paddingVertical: Metrics.large,
    },
  });

  return (
    <View style={innerStyle.body}>
      <View
        style={{
          height: '8%',
        }}
      >
        <Text style={styleColor(colors.white)} variant="black_s_light">
          {profile?.name}
        </Text>
        <Text style={styleColor(colors.white)} variant="black_l_bold">
          {today.toDateString()}
        </Text>
      </View>
      <Row
        style={{
          height: '92%',
        }}
        gap={10}
        alignItems="stretch"
      >
        <View style={{ flex: 1, gap: 10, flexDirection: 'column' }}>
          <View style={{ flex: 1 }}>
            <TodayImage image={face?.path ?? ''} text="face" subText="" />
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
              <Text style={styleColor(colors.white)} variant="black_l_bold">
                {profile?.weight}
              </Text>
              <Text style={styleColor(colors.white)} variant="black_l_light">
                {' '}
                KG
              </Text>
            </Text>

            <Text>
              <Text style={styleColor(colors.white)} variant="black_l_bold">
                {profile?.height}
              </Text>
              <Text style={styleColor(colors.white)} variant="black_l_light">
                {' '}
                CM
              </Text>
            </Text>
            <Text>
              <Text style={styleColor(colors.white)} variant="black_l_bold">
                {profile?.waterPerDay}
              </Text>
              <Text style={styleColor(colors.white)} variant="black_l_light">
                {' '}
                ML
              </Text>
            </Text>
            <Text>
              <Text style={styleColor(colors.white)} variant="black_l_bold">
                {meals?.reduce((a, b) => a + b.calories, 0)}
              </Text>
              <Text style={styleColor(colors.white)} variant="black_l_light">
                {' '}
                KCAL
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <TodayImage image={body?.path ?? ''} text="body" subText="" />
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
  );
}
