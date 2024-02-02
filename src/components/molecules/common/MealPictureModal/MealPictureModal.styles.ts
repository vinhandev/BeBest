import { StyleSheet } from 'react-native';
import { FontSizes, FontWeight, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  picker: {
    padding: Metrics.small,
    borderWidth: 1,
    borderRadius: Rounds.small,
    textAlign: 'center',

    fontSize: FontSizes.s,
    fontWeight: FontWeight.regular,
  },
});
