import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    borderRadius: Rounds.normal,
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
  },
});
