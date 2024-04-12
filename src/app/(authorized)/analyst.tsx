import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import { SafeScreen } from '~/components/HOCs';
import { useForm } from 'react-hook-form';
import { FormInput } from '~/components/molecules';
import { Row, Text } from '~/components/atoms';
import { LineChart } from 'react-native-chart-kit';
import { useGetAllWaterRecords, useGetAllWeightRecord } from '~/hooks';
import { useSystemStore } from '~/stores';
import {
  getTotalDayFromRange,
  getTotalMonthFromRange,
  getTotalWeekFromRange,
  isToday,
  log,
  showToast,
  styleColor,
} from '~/utils';
import { Metrics, today } from '~/constants';
import { useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { logProfileData } from 'react-native-ui-lib/src/helpers/Profiler';
export default function AnalystRouter() {
  const { colors } = useTheme();
  const [type, setType] = React.useState<'weight' | 'water'>('weight');
  const { control, watch } = useForm({
    defaultValues: {
      type,
    },
  });
  const watchType = watch('type');
  const profile = useUserStore((state) => state.profile);
  const weightRecords = useUserStore((state) => state.weightRecords);
  const waterRecords = useUserStore((state) => state.waterRecords);

  const { get: getWeight } = useGetAllWeightRecord();
  const { get: getWater } = useGetAllWaterRecords();
  const setLoading = useSystemStore((state) => state.setLoading);

  const currentIncreaseWeight = useMemo(() => {
    if (profile?.weight && weightRecords && weightRecords?.length > 0) {
      return profile?.weight - weightRecords?.[0]?.value;
    } else {
      return 0;
    }
  }, [weightRecords]);

  const remainingDay = useMemo(() => {
    if (profile?.weight && weightRecords && weightRecords.length > 0) {
      return getTotalDayFromRange(new Date(weightRecords[0].time), today);
    } else {
      return 0;
    }
  }, [weightRecords]);

  const currentAverage = useMemo(() => {
    if (profile?.weight && weightRecords) {
      return Math.round((currentIncreaseWeight / remainingDay) * 100) / 100;
    } else {
      return 0;
    }
  }, [weightRecords]);
  const { high, low } = useMemo(() => {
    if (profile?.weight && weightRecords) {
      let tempWeight = weightRecords.map((item, index) => {
        if (index !== weightRecords.length - 1) {
          return item.value - weightRecords[index + 1].value;
        }
        return 0;
      });
      tempWeight = tempWeight.sort();

      return {
        high: tempWeight[tempWeight.length - 1],
        low: tempWeight[0],
      };
    } else {
      return { high: 0, low: 0 };
    }
  }, [weightRecords]);

  const last7dayIncrease = useMemo(() => {
    if (profile?.weight && weightRecords) {
      if (weightRecords?.length > 7) {
        const weightLast7Day = weightRecords[weightRecords?.length - 7];
        return profile?.weight - weightLast7Day.value;
      } else {
        return currentIncreaseWeight;
      }
    } else {
      return 0;
    }
  }, [weightRecords]);
  const last30dayIncrease = useMemo(() => {
    if (profile?.weight && weightRecords) {
      if (weightRecords?.length > 30) {
        const weightLast7Day = weightRecords[weightRecords?.length - 7];
        return profile?.weight - weightLast7Day.value;
      } else {
        return currentIncreaseWeight;
      }
    } else {
      return 0;
    }
  }, [weightRecords]);
  const averageWeekIncrease = useMemo(() => {
    if (profile?.weight && weightRecords && weightRecords.length > 0) {
      const totalWeek = getTotalWeekFromRange(
        new Date(weightRecords[0].time),
        today
      );
      return Math.round((currentIncreaseWeight / totalWeek) * 100) / 100;
    } else {
      return 0;
    }
  }, [weightRecords]);
  const averageMonthIncrease = useMemo(() => {
    if (profile?.weight && weightRecords && weightRecords.length > 0) {
      const totalMonth = getTotalMonthFromRange(
        new Date(weightRecords[0].time),
        today
      );
      return Math.round((currentIncreaseWeight / totalMonth) * 100) / 100;
    } else {
      return 0;
    }
  }, [weightRecords]);

  const todayWater = useMemo(() => {
    if (waterRecords && waterRecords.length > 0) {
      return waterRecords.find((item) => isToday(item.time))?.value ?? 0;
    } else {
      return 0;
    }
  }, [waterRecords]);

  const averageWaterThisWeek = useMemo(() => {
    if (waterRecords) {
      let weekWater = 0;
      for (
        let index = waterRecords.length > 7 ? waterRecords.length - 7 : 0;
        index < waterRecords.length;
        index++
      ) {
        const element = waterRecords[index];
        log.debug('water', element, waterRecords, index);
        weekWater = element.value + weekWater;
      }
      return Math.round(
        weekWater / (waterRecords.length > 7 ? 7 : waterRecords.length)
      );
    } else {
      return 0;
    }
  }, [waterRecords]);

  const averageWaterThisMonth = useMemo(() => {
    if (waterRecords && waterRecords.length > 0) {
      const totalWeek = getTotalWeekFromRange(
        new Date(waterRecords[0].time),
        today
      );
      let weekWater = 0;
      for (
        let index = waterRecords.length > 30 ? waterRecords.length - 30 : 0;
        index < waterRecords.length;
        index++
      ) {
        const element = waterRecords[index];
        weekWater = element.value + weekWater;
      }
      return Math.round(
        weekWater / (waterRecords.length > 30 ? 30 : waterRecords.length)
      );
    } else {
      return 0;
    }
  }, [waterRecords]);

  useEffect(() => {
    async function handleLoadType() {
      setLoading(true);
      try {
        if (type === 'weight') {
          await getWeight();
        }
        if (type === 'water') {
          await getWater();
        }
      } catch (error) {
        showToast((error as Error).message);
      }
      setLoading(false);
    }
    handleLoadType();
  }, [type]);

  useEffect(() => {
    setType(watchType);
  }, [watchType]);

  return (
    <SafeScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: Metrics.medium,
          }}
        >
          <View>
            <Text variant="black_m_light">{profile?.name}</Text>
            <Text
              style={styleColor(colors.error)}
              variant="black_xl_bold"
            >{`${profile?.streak} Streaks`}</Text>
            <Text variant="black_s_light">
              {`${Math.round(profile?.streak ?? 0 / 7)} weeks`}
            </Text>
          </View>
          <FormInput
            control={control}
            name="type"
            variant="select"
            data={[
              {
                label: 'Weight',
                value: 'weight',
              },
              {
                label: 'Water',
                value: 'water',
              },
            ]}
          />
          <View
            style={{
              paddingTop: Metrics.medium,
            }}
          >
            <Text variant="black_l_bold">Graphs</Text>

            <View>
              {type === 'weight' &&
                weightRecords &&
                weightRecords?.length > 0 && (
                  <View>
                    <Row
                      style={{
                        paddingTop: Metrics.small,
                      }}
                    >
                      <View>
                        <Text center variant="black_s_bold">
                          Started
                        </Text>
                        <Text
                          center
                          variant="black_l_light"
                        >{`${profile?.weight} kg`}</Text>
                      </View>
                      <View>
                        <Text center variant="black_s_bold">
                          Current
                        </Text>
                        <Text
                          center
                          variant="black_l_bold"
                          style={styleColor(colors.purple)}
                        >{`${profile?.weight} kg`}</Text>
                      </View>
                      <View>
                        <Text center variant="black_s_bold">
                          Goal
                        </Text>
                        <Text
                          center
                          variant="black_l_light"
                        >{`${profile?.goalWeight} kg`}</Text>
                      </View>
                    </Row>
                    <LineChart
                      style={{
                        marginLeft: -Metrics.medium,
                        marginBottom: -Metrics.large,
                        paddingTop: Metrics.medium,
                      }}
                      data={{
                        labels:
                          weightRecords?.map(
                            (record) =>
                              `${new Date(record.time).getDate()}/${
                                new Date(record.time).getMonth() + 1
                              }`
                          ) || [],
                        datasets: [
                          {
                            data:
                              weightRecords?.map((record) => record.value) ||
                              [],
                          },
                        ],
                      }}
                      width={Metrics.screenWidth - Metrics.medium}
                      height={Metrics.screenHeight / 2}
                      verticalLabelRotation={30}
                      bezier
                      chartConfig={{
                        color: (opacity = 1) => colors.primary,
                        backgroundColor: colors.background,
                        backgroundGradientFrom: colors.background,
                        backgroundGradientTo: colors.background,
                      }}
                    />
                    <View>
                      <View style={{ paddingTop: Metrics.small }}>
                        <Text variant="black_m_bold">Statistical</Text>
                        <Row>
                          <Text variant="black_s_light">Last 7 days</Text>
                          <Text
                            style={styleColor(
                              last7dayIncrease > 0
                                ? colors.error
                                : colors.purple
                            )}
                            variant="black_s_bold"
                          >
                            {`${last7dayIncrease} kg`}
                          </Text>
                        </Row>
                        <Row>
                          <Text variant="black_s_light">Last 30 days</Text>
                          <Text
                            style={styleColor(
                              last30dayIncrease > 0
                                ? colors.error
                                : colors.purple
                            )}
                            variant="black_s_bold"
                          >
                            {`${last30dayIncrease} kg`}
                          </Text>
                        </Row>
                      </View>
                      <View style={{ paddingTop: Metrics.small }}>
                        <Text variant="black_m_bold">Process</Text>
                        <Row>
                          <Text variant="black_s_light">
                            Average every week
                          </Text>
                          <Text
                            style={styleColor(
                              averageWeekIncrease > 0
                                ? colors.error
                                : colors.purple
                            )}
                            variant="black_s_bold"
                          >
                            {`${averageWeekIncrease} kg`}
                          </Text>
                        </Row>
                        <Row>
                          <Text variant="black_s_light">
                            Average every month
                          </Text>
                          <Text
                            style={styleColor(
                              averageMonthIncrease > 0
                                ? colors.error
                                : colors.purple
                            )}
                            variant="black_s_bold"
                          >
                            {`${averageMonthIncrease} kg`}
                          </Text>
                        </Row>
                        <Row>
                          <Text variant="black_s_light">Total days</Text>
                          <Text variant="black_s_bold">
                            {remainingDay} days
                          </Text>
                        </Row>
                      </View>
                      <View style={{ paddingTop: Metrics.small }}>
                        <Text variant="black_m_bold">All</Text>
                        <Row>
                          <Text variant="black_s_light">Average</Text>
                          <Text variant="black_s_bold">
                            {currentAverage} kg
                          </Text>
                        </Row>
                        <Row>
                          <Text variant="black_s_light">Highest</Text>
                          <Text variant="black_s_bold">
                            {high > 0 ? `+ ${high}` : high} kg
                          </Text>
                        </Row>
                        <Row>
                          <Text variant="black_s_light">Lowest</Text>
                          <Text variant="black_s_bold">{low} kg</Text>
                        </Row>
                      </View>
                    </View>
                  </View>
                )}
              {type === 'water' && waterRecords && waterRecords?.length > 0 && (
                <View>
                  <LineChart
                    style={{
                      marginLeft: -Metrics.medium,
                      marginBottom: -Metrics.large,
                      paddingTop: Metrics.medium,
                    }}
                    data={{
                      labels:
                        waterRecords?.map(
                          (record) =>
                            `${new Date(record.time).getDate()}/${
                              new Date(record.time).getMonth() + 1
                            }`
                        ) || [],
                      datasets: [
                        {
                          data:
                            waterRecords?.map((record) => record.value) || [],
                        },
                      ],
                    }}
                    width={Metrics.screenWidth - Metrics.medium}
                    height={Metrics.screenHeight / 2}
                    verticalLabelRotation={30}
                    bezier
                    chartConfig={{
                      color: (opacity = 1) => colors.primary,
                      backgroundColor: colors.background,
                      backgroundGradientFrom: colors.background,
                      backgroundGradientTo: colors.background,
                    }}
                  />
                  <View>
                    <View style={{ paddingTop: Metrics.small }}>
                      <Text variant="black_m_bold">Statistical</Text>
                      <Row>
                        <Text variant="black_s_light">Today</Text>
                        <Text variant="black_s_bold">{`${todayWater} ml`}</Text>
                      </Row>
                      <Row>
                        <Text variant="black_s_light">Average every week</Text>
                        <Text variant="black_s_bold">
                          {`${averageWaterThisWeek} ml`}
                        </Text>
                      </Row>
                      <Row>
                        <Text variant="black_s_light">Average every month</Text>
                        <Text variant="black_s_bold">
                          {`${averageWaterThisMonth} ml`}
                        </Text>
                      </Row>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
