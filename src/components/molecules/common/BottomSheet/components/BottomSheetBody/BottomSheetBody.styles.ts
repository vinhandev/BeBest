import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.medium,
  },
  camera: {
    height: undefined,
    aspectRatio: 2/3,
  },
});
