import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    borderRadius: Rounds.small,
    padding: Metrics.medium,
  },
  actions: {
    flexWrap: 'wrap',
  },
});
