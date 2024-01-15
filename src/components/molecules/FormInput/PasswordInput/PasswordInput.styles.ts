import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  custom: {
    height: FixedSizes.form_input,
    paddingHorizontal: Metrics.medium,
    borderRadius: Rounds.small,
    borderWidth: 1,
  },
});
