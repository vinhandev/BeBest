import React from 'react';
import { ScrollView, View } from 'react-native';
import { Row, Text } from '~/components/atoms';
import {
  getAllDaysOfWeek,
  styleBackground,
  styleBorderColor,
  styleColor,
} from '~/utils';
import { styles } from './Calendar.styles';
import { Metrics } from '~/constants';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-ui-lib';

type Props = {
  selectedDate: Date;
  onPress: (selectedDate: Date) => void;
};
export default function Calendar({ selectedDate, onPress }: Props) {
  const { colors } = useTheme();
  const dayOfWeeks = getAllDaysOfWeek();

  const isSelected = (date: number) => {
    return selectedDate.getDate() === date;
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <Row style={styles.list} gap={Metrics.small}>
        {dayOfWeeks.map((day) => {
          const isSelectedDate = isSelected(day.date.getDate());

          return (
            <TouchableOpacity
              key={day.dayOfWeek}
              onPress={() => onPress(day.date)}
              style={[
                styles.item,
                styleBackground(isSelectedDate ? colors.primary : colors.white),
                styleBorderColor(
                  isSelectedDate ? colors.primary : colors.disabled
                ),
              ]}
            >
              <Text
                style={[
                  styles.day,
                  styleColor(isSelectedDate ? colors.white : colors.black),
                ]}
                variant="black_xs_bold"
              >
                {day.dayOfWeek}
              </Text>
              <Text
                style={styleColor(isSelectedDate ? colors.white : colors.black)}
                variant="black_l_light"
              >
                {day.date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Row>
    </ScrollView>
  );
}
