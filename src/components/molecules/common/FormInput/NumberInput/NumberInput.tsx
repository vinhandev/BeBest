import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FormControlWrapper } from '~/components/HOCs';
import Styles from '~/styles';
import { styleBackground, styleBorderColor } from '~/utils';

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
};
export default function NumberInput<T extends FieldValues>({
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
      <TextInput
        style={[
          Styles.formInput,
          styleBackground(colors.backdrop),
          styleBorderColor(fieldState.invalid ? colors.error : colors.backdrop),
        ]}
        inputMode="numeric"
        onChangeText={(text) => {
          if (text) {
            field.onChange(parseInt(text));
          }
        }}
        value={`${field.value}`}
        {...props}
      />
    </FormControlWrapper>
  );
}
