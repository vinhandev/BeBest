import { StyleSheet } from 'react-native';
import { FixedSizes, FontSizes, FontWeight, Metrics, Rounds } from '~/constants';

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
    justifyContent: 'center',
    borderRadius: Rounds.small,
    borderWidth: FixedSizes.border_width,
    flexGrow: 1,
    fontSize: FontSizes.s,
    fontWeight:FontWeight.regular,
  },
});

export default Styles;
