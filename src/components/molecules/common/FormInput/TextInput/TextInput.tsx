import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Spacer, Text } from '~/components/atoms';
import { styles } from './TextInput.styles';
import { styleBackground, styleBorderColor, styleColor } from '~/utils';
import Styles from '~/styles';
import { FormControlWrapper } from '~/components/HOCs';

type Props<T extends FieldValues> = Omit<TextInputProps, 'theme'> & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
};
export default function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: Props<T>) {
  const { colors } = useTheme();
  const { field, fieldState } = useController({
    control,
    name,
  });
  return (
    <FormControlWrapper
      label={label}
      invalid={fieldState.invalid}
      error={fieldState.error}
    >
      <RNTextInput
        style={[
          Styles.formInput,
          styleBorderColor(fieldState.invalid ? colors.error : colors.backdrop),
          styleBackground(colors.backdrop),
          styleColor(colors.black),
          props.style,
        ]}
        value={field.value}
        onChangeText={field.onChange}
        {...props}
      />
    </FormControlWrapper>
  );
}
