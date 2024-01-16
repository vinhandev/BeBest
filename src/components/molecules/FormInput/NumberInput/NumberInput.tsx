import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Spacer, Text } from '~/components/atoms';
import { styleBackground, styleBorderColor } from '~/utils';
import { styles } from './Number.styles';

type Props<T extends FieldValues> = Omit<TextInputProps, 'theme'> & {
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
    <View>
      <Text isHide={!label} variant="label">
        {label}
      </Text>
      <Spacer size={10} />
      <RNTextInput
        inputMode="numeric"
        style={[
          styles.custom,
          styleBorderColor(colors.disabled),
          styleBackground(colors.backdrop),
          props.style,
        ]}
        value={field.value}
        onChangeText={field.onChange}
        {...props}
      />
      <Spacer size={5} />
      <Text isHide={!fieldState.invalid} variant="error">
        {fieldState.error?.message}
      </Text>
    </View>
  );
}
