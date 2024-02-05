import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import auth from '@react-native-firebase/auth';
import { SafeScreen } from '~/components/HOCs';
import { useForm } from 'react-hook-form';
import { FormInput } from '~/components/molecules';
import { Row, Text } from '~/components/atoms';
import { LineChart } from 'react-native-chart-kit';
import { useGetAllWeightRecord } from '~/hooks';
import { useSystemStore } from '~/stores';
import { showToast, styleColor } from '~/utils';
import { Colors, Metrics } from '~/constants';
import { useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
export default function AnalystRouter() {
  const { colors } = useTheme();
  const [type, setType] = React.useState<'weight' | 'water' | 'images'>(
    'weight'
  );
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type,
    },
  });
  const profile = useUserStore((state) => state.profile);
  const weightRecords = useUserStore((state) => state.weightRecords);

  const { get: getWeight } = useGetAllWeightRecord();
  const setLoading = useSystemStore((state) => state.setLoading);

  const last7days = weightRecords
    ?.filter((record) => record.time >= Date.now() - 1000 * 60 * 60 * 24 * 7)
    .map((record) => record.value)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    async function handleLoadType() {
      setLoading(true);
      try {
        if (type === 'weight') {
          await getWeight();
        }
        if (type === 'water') {
        }
      } catch (error) {
        showToast((error as Error).message);
      }
      setLoading(false);
    }
    handleLoadType();
  }, [type]);

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
              {
                label: 'Images',
                value: 'images',
              },
            ]}
          />
          <View
            style={{
              paddingTop: Metrics.medium,
            }}
          >
            <Text variant="black_l_bold">Graphs</Text>
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
            <View>
              {type === 'weight' && (
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
                          weightRecords?.map((record) => record.value) || [],
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
              )}
            </View>
            <View>
              <View style={{ paddingTop: Metrics.small }}>
                <Text variant="black_m_bold">Statistical</Text>
                <Row>
                  <Text variant="black_s_light">Last 7 days</Text>
                  <Text variant="black_s_bold">{last7days}</Text>
                </Row>
                <Row>
                  <Text variant="black_s_light">Last 30 days</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
              </View>
              <View style={{ paddingTop: Metrics.small }}>
                <Text variant="black_m_bold">Process</Text>
                <Row>
                  <Text variant="black_s_light">Average every week</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
                <Row>
                  <Text variant="black_s_light">Average every month</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
                <Row>
                  <Text variant="black_s_light">Time remaining</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
              </View>
              <View style={{ paddingTop: Metrics.small }}>
                <Text variant="black_m_bold">All</Text>
                <Row>
                  <Text variant="black_s_light">Average</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
                <Row>
                  <Text variant="black_s_light">Highest</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
                <Row>
                  <Text variant="black_s_light">Lowest</Text>
                  <Text variant="black_s_bold">Statistical</Text>
                </Row>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
