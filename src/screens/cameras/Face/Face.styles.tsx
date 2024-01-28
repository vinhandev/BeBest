import { StyleSheet } from 'react-native';
import { Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    flex: 1,
  },
  camera: {
    borderRadius: Rounds.normal,
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
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
