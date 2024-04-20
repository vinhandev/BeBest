import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    borderRadius: Rounds.small,
    padding: Metrics.medium,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 4,
  },
  actions: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
