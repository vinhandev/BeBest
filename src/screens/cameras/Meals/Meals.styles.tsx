import { StyleSheet } from 'react-native';
import { FontSizes, FontWeight, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    zIndex: -1,
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
  goBack: {
    position: 'absolute',
    top: Metrics.ex_large,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
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
  calories: {},
});
