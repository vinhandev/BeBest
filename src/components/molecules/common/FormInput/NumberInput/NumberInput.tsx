import React, { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Spacer, Text } from '~/components/atoms';
import { styleBackground, styleBorderColor } from '~/utils';
import { styles } from './Number.styles';
import {
  NumberInputProps,
  NumberInput as RNNumberInput,
} from 'react-native-ui-lib';
import Styles from '~/styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props<T extends FieldValues> = Omit<NumberInputProps, 'onChangeNumber'> & {
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

  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text isHide={!label} variant="black_s_light">
        {label}
      </Text>
      <Spacer size={10} />
      <TouchableWithoutFeedback
        onFocus={() => {
          setFocused(!focused);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        style={[
          styles.custom,
          Styles.formInput,
          styleBorderColor(
            fieldState.invalid
              ? colors.error
              : focused
              ? colors.disabled
              : colors.backdrop
          ),
          styleBackground(colors.backdrop),
          props.leadingTextStyle,
        ]}
      >
        <RNNumberInput
          {...props}
          onChangeNumber={(data) => {
            if (data.type === 'valid') {
              field.onChange(data.number);
            }
          }}
        />
      </TouchableWithoutFeedback>

      <Spacer size={5} />
      <Text isHide={!fieldState.invalid} variant="error">
        {fieldState.error?.message}
      </Text>
    </View>
  );
}
