import React from 'react';
import { Control, useController } from 'react-hook-form';
import { View, TextInput as RNTextInput } from 'react-native';
import { TextInputProps, useTheme } from 'react-native-paper';
import { Spacer, Text } from '~/components/atoms';
import { styles } from './TextInput.styles';
import { styleBackground, styleBorderColor } from '~/utils';

type Props = Omit<TextInputProps, 'theme'> & {
  control: Control<any>;
  name: string;
  theme?: any;
  label?: string;
};
export default function TextInput({ control, name, label, ...props }: Props) {
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
      <Text isHide={!fieldState.invalid} variant="error">
        {fieldState.error?.message}
      </Text>
    </View>
  );
}
