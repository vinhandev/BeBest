import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '18%',
  },
  icon: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,


    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: Rounds.small,
  },
  title: {},
});
