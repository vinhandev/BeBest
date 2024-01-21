import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { useTheme } from 'react-native-paper';

import { FormControlWrapper } from '~/components/HOCs';
import { DateTimePicker, DateTimePickerProps } from 'react-native-ui-lib';
import Styles from '~/styles';
import { styleBackground, styleBorderColor } from '~/utils';
type Props<T extends FieldValues> = DateTimePickerProps & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
};
export default function DateInput<T extends FieldValues>({
  control,
  name,
  label,
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
      <DateTimePicker
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
      />
    </FormControlWrapper>
  );
}
