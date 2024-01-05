import { StyleSheet } from 'react-native';
import { FontSizes, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.medium,
  },
  time: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
  message: {
    fontSize: FontSizes.small,
    fontWeight: '300',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: Rounds.circle,
    borderWidth: 1,
  },
});
