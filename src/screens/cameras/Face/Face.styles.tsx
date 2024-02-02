import { StyleSheet } from 'react-native';
import { FontSizes, FontWeight, Metrics, Rounds } from '~/constants';

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
  meals: {
    position: 'absolute',
    top: Metrics.ex_large,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    padding: Metrics.small,
    borderWidth: 1,
    borderRadius: Rounds.small,
    textAlign: 'center',

    fontSize: FontSizes.s,
    fontWeight: FontWeight.regular,
  },
});
