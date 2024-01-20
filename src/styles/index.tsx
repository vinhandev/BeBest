import { StyleSheet } from 'react-native';
import { FixedSizes, Metrics, Rounds } from '~/constants';

const Styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  formInput: {
    height: FixedSizes.form_input,
    paddingHorizontal: Metrics.medium,
    borderRadius: Rounds.small,
    borderWidth: FixedSizes.border_width,
  },
});

export default Styles;
