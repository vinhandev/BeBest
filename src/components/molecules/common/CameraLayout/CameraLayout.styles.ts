import { StyleSheet } from 'react-native';
import { FontSizes, FontWeight, Metrics, Rounds } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    // transform: [{ scaleX: -1 }],
  },
  actions: {
    padding: Metrics.large,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  outlineTakePhotoIcon: {
    borderWidth: 2,
    padding: Metrics.ex_small,
    borderRadius: Rounds.circle,
  },
  takePhotoIcon: {
    width: '85%',
    height: '85%',
    borderRadius: Rounds.circle,
  },
  meals: {
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
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
