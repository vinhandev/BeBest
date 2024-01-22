import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.medium,
  },
  list: {
    paddingHorizontal: Metrics.medium,
  },
  item: {
    padding: Metrics.small,
    borderRadius: Rounds.small,
    borderWidth: FixedSizes.border_width,
  },
});
