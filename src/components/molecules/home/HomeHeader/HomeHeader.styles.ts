import { StyleSheet } from 'react-native';
import { FixedSizes, FontSizes, FontWeight, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  time: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeight.bold,
  },
  message: {
    fontSize: FontSizes.small,
    fontWeight: FontWeight.light,
  },
  image: {
    width: FixedSizes.avatar,
    height: FixedSizes.avatar,
    borderRadius: Rounds.circle,
  },
});
