import React from 'react';

import { Control, FieldValues, Path } from 'react-hook-form';
import TextInput from './TextInput/TextInput';
import { TextInputProps } from 'react-native-paper';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
} & (
  | {
      variant: 'number' | 'select' | 'password';
    }
  | (Omit<TextInputProps, 'theme'> & {
      variant: 'text';
    })
);
export default function FormInput<T extends FieldValues>(props: Props<T>) {
  switch (props.variant) {
    case 'text':
      return <TextInput {...props} />;
      break;
    case 'number':
      return <TextInput {...props} />;
    default:
      return <TextInput {...props} />;
      break;
  }
}
