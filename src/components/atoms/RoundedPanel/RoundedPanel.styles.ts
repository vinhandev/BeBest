import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: Rounds.large,
    borderBottomRightRadius: Rounds.large,
  },
});
