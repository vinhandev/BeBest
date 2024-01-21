import { View } from 'moti';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon, Spacer, Text } from '~/components/atoms';
import { IconButtonPropsType } from '~/types';
import { styles } from './IconButton.styles';
import { styleBackground } from '~/utils';
import { TouchableOpacity } from 'react-native-ui-lib';

type Props = IconButtonPropsType & {
  disabled?: boolean;
  color?: string;
  textColor?: string;
};
export default function IconButton({
  icon,
  title,
  onPress,
  color,
  textColor,
  disabled = false,
}: Props) {
  const { colors } = useTheme();

  const innerStyles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.4 : 1,
    },
  });

  return (
    <View style={[styles.container, innerStyles.container]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.icon,
          styleBackground(color ? color : colors.quaternary),
        ]}
      >
        <Icon
          variant={icon}
          size={20}
          color={textColor ? textColor : colors.black}
        />
      </TouchableOpacity>

      {title ? (
        <>
          <Spacer size={5} />
          <Text variant="black_xs_light" center style={styles.title}>
            {title}
          </Text>
        </>
      ) : null}
    </View>
  );
}
