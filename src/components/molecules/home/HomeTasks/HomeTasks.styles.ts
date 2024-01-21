import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    padding: Metrics.small,

    borderRadius: Rounds.small,

    borderWidth: FixedSizes.border_width,
  },
  status: {
    flex: 1,
  },
});
