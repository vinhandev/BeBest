import { StyleSheet } from 'react-native';
import { Metrics } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Metrics.medium,
    gap: 90,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputGroup: {},
  buttonGroup: {
    gap: Metrics.small,
  },
  button: {},
});
