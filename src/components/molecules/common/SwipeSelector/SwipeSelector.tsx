import React, { useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Row } from '~/components/atoms';
import { Metrics } from '~/constants';
import { log } from '~/utils';

type Props = {
  current: number;
  onChange: (value: number) => void;
  step: number;
  min: number;
  max: number;
  color: string;
};
export default function SwipeSelector({
  current,
  max,
  min,
  onChange,
  step,
  color,
}: Props) {
  const { colors } = useTheme();
  const ref = useRef<ScrollView>(null);

  const itemWidth = 20;
  const listLength = Math.round((max - min) / step);

  log.debug(listLength);

  const metricsList: number[] = [];
  for (let index = 0; index <= listLength; index++) {
    metricsList.push(index * step + min);
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        x: Math.round((current - min) / step) * itemWidth,
        animated: true,
      });
    }
  }, []);

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: 20,
      }}
    >
      <View
        style={{
          width: 0.5,
          height: 30,
          backgroundColor: colors.error,
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 1,
        }}
      />
      <View
        style={{
          width: Metrics.screenWidth,
        }}
      >
        <ScrollView
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) =>
            onChange(
              metricsList[Math.round(e.nativeEvent.contentOffset.x / itemWidth)]
            )
          }
          horizontal
        >
          <Row
            style={{
              paddingLeft: Metrics.screenWidth * 0.5,
              paddingRight: Metrics.screenWidth * 0.5 - 1,
              alignItems: 'flex-end',
            }}
          >
            {metricsList.map((item, index) => (
              <View
                key={index}
                style={{
                  width: index === metricsList.length - 1 ? 1 : itemWidth,
                }}
              >
                <View
                  style={{
                    zIndex: -1,
                    width: 0.5,
                    height: index % 5 === 0 ? 25 : 15,
                    backgroundColor: index % 5 === 0 ? color : `${color}55`,
                  }}
                />
              </View>
            ))}
          </Row>
        </ScrollView>
      </View>
    </View>
  );
}
