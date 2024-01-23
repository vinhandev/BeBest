import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  list: {
    paddingTop: Metrics.medium,
    paddingHorizontal: Metrics.medium,
  },
  item: {
    width:FixedSizes.day,
    padding: Metrics.medium,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: Rounds.small,
    borderWidth: FixedSizes.border_width,
  },
  day: {
    textTransform: 'uppercase',
  },
});
