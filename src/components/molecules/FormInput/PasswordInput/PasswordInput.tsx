import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon, Row, Spacer, Text } from '~/components/atoms';
import { styles } from './PasswordInput.styles';
import { styleBackground, styleBorderColor } from '~/utils';

type Props<T extends FieldValues> = Omit<TextInputProps, 'theme'> & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
};
export default function PasswordInput<T extends FieldValues>({
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

  const [show, setShow] = React.useState(false);

  return (
    <View>
      <Text isHide={!label} variant="label">
        {label}
      </Text>
      <Spacer size={10} />
      <Row
        style={[
          styles.custom,
          styleBorderColor(colors.disabled),
          styleBackground(colors.backdrop),
        ]}
      >
        <RNTextInput
          secureTextEntry={!show}
          style={[
            props.style,
            {
              flexGrow: 1,
              flex: 1,
              paddingRight: 10,
            },
          ]}
          value={field.value}
          onChangeText={field.onChange}
          {...props}
        />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Icon
            variant={show ? 'eye' : 'eye-off'}
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      </Row>
      <Spacer size={5} />
      <Text isHide={!fieldState.invalid} variant="error">
        {fieldState.error?.message}
      </Text>
    </View>
  );
}
