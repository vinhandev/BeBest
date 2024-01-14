import { StyleSheet } from 'react-native';
import { Metrics } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Metrics.small,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputGroup: {
    paddingVertical: Metrics.large,
  },
  textInput: {},
  buttonGroup: {
    gap: Metrics.small,
  },
  button: {},
});
