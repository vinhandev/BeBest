import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import { styleBackground, styleBorderColor } from '~/utils';
import Styles from '~/styles';
import { FormControlWrapper } from '~/components/HOCs';
import { Row, Text } from '~/components/atoms';
import { Metrics } from '~/constants';

type Props<T extends FieldValues> = Omit<TextInputProps, 'theme'> & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
};
export default function BooleanInput<T extends FieldValues>({
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
    <FormControlWrapper invalid={fieldState.invalid} error={fieldState.error}>
      <Row justifyContent="flex-start" gap={Metrics.ex_small}>
        <Switch value={field.value} onValueChange={field.onChange} />
        <Text variant="black_s_bold">{label}</Text>
      </Row>
    </FormControlWrapper>
  );
}
