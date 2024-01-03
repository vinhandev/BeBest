import React from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInputProps, TextInput as RNPTextInput } from 'react-native-paper';

type Props = Omit<TextInputProps, 'theme'> & {
  control: Control<any>;
  name: string;
  theme?: any;
};
export default function TextInput({ control, name, ...props }: Props) {
  const { field } = useController({
    control,
    name,
  });
  return (
    <RNPTextInput
      value={field.value}
      onChangeText={field.onChange}
      {...props}
    />
  );
}
