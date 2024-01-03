import { StyleSheet } from 'react-native';
import { Sizes } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Sizes.small,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputGroup: {
    paddingVertical: Sizes.large,
  },
  textInput: {},
  buttonGroup: {
    gap: Sizes.small,
  },
  button: {},
});
