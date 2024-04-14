import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  actions: {
    padding: Metrics.large,
  },
  outlineTakePhotoIcon: {
    borderWidth: 2,
    padding: Metrics.ex_small,
    borderRadius: Rounds.circle,
  },
  takePhotoIcon: {
    width: 40,
    height: 40,
    borderRadius: Rounds.circle,
  },
});
