import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.small,
    paddingVertical: 10,

    borderRadius: Rounds.small,
    borderWidth: FixedSizes.border_width,
  },
  description: {
    flexGrow: 1,
    flex: 1,
  },
});
