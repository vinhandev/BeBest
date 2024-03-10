import { StyleSheet } from 'react-native';
import { Metrics } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Metrics.medium,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputGroup: {
    paddingVertical: Metrics.large,
  },
  buttonGroup: {
    gap: Metrics.small,
  },
  button: {
  },
});
