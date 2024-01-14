import React from 'react';

import { Control } from 'react-hook-form';
import TextInput from './TextInput/TextInput';
import { TextInputProps } from 'react-native-paper';

type Props = {
  control: Control<any>;
  name: string;
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
export default function FormInput(props: Props) {
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
