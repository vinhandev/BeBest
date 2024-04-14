import { StyleSheet } from 'react-native';
import { FixedSizes, FontSizes, FontWeight, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  time: {
    fontSize: FontSizes.m,
    fontWeight: FontWeight.bold,
  },
  message: {
    fontSize: FontSizes.s,
    fontWeight: FontWeight.light,
  },
  image: {
    width: FixedSizes.avatar,
    height: FixedSizes.avatar,
    borderRadius: Rounds.circle,
  },
});
