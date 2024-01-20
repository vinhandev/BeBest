import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { View, TextInputProps } from 'react-native';

import { useTheme } from 'react-native-paper';

import { FormControlWrapper } from '~/components/HOCs';
import { NumberInput, Picker, PickerProps } from 'react-native-ui-lib';
import { ages } from '~/constants';
import Styles from '~/styles';
import { styleBackground, styleBorderColor } from '~/utils';
type Props<T extends FieldValues> = PickerProps & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
  data: {
    label: string;
    value: string;
  }[];
};
export default function OptionInput<T extends FieldValues>({
  control,
  name,
  label,
  data,
  ...props
}: Props<T>) {
  const { colors } = useTheme();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({
    control,
    name,
  });

  return (
    <FormControlWrapper
      label={label}
      invalid={fieldState.invalid}
      error={fieldState.error}
    >
      <Picker
        {...props}
        style={[
          Styles.formInput,
          styleBackground(colors.backdrop),
          styleBorderColor(fieldState.invalid ? colors.error : colors.backdrop),
        ]}
        value={value}
        onChange={(pickData) => {
          onChange(pickData);
        }}
        items={data}
      />
    </FormControlWrapper>
  );
}
