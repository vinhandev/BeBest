import React from 'react';

import { Control, FieldValues, Path } from 'react-hook-form';
import TextInput from './TextInput/TextInput';
import { TextInputProps } from 'react-native';
import PasswordInput from './PasswordInput/PasswordInput';
import NumberInput from './NumberInput/NumberInput';
import OptionInput from './OptionInput/OptionInput';
import { NumberInputProps, PickerProps } from 'react-native-ui-lib';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
} & (
  | {
      variant: 'password' | 'age';
    }
  | (
      | (Omit<TextInputProps, 'theme'> & {
          variant: 'text';
        })
      | (PickerProps & {
          variant: 'select';
          data: {
            label: string;
            value: string;
          }[];
        })
      | (Omit<NumberInputProps, 'onChangeNumber'> & {
          variant: 'number';
        })
    )
);
export default function FormInput<T extends FieldValues>(props: Props<T>) {
  switch (props.variant) {
    case 'text':
      return <TextInput {...props} />;
    case 'select':
      return <OptionInput {...props} />;
    case 'password':
      return <PasswordInput {...props} />;
      break;
    case 'number':
      return <NumberInput {...props} />;
    default:
      return <TextInput {...props} />;
      break;
  }
}
