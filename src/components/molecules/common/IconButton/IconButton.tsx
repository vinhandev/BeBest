import { View } from 'moti';
import React from 'react';
import { StyleSheet, Touchable, TouchableWithoutFeedback } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Icon, Row, Spacer, Text } from '~/components/atoms';
import { IconButtonPropsType } from '~/types';
import { styles } from './IconButton.styles';
import { styleBackground } from '~/utils';
import { TouchableOpacity } from 'react-native-ui-lib';

type Props = IconButtonPropsType & {
  disabled?: boolean;
  color?: string;
  textColor?: string;
  isChecked?: boolean;
};
export default function IconButton({
  icon,
  title,
  onPress,
  color,
  textColor,
  disabled = false,
  isChecked = false,
}: Props) {
  const { colors } = useTheme();

  const innerStyles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.4 : 1,
    },
  });

  const buttonColor = color ? color : colors.quaternary;

  return (
    <View style={[styles.container, innerStyles.container]}>
      <View>
        <TouchableRipple
          disabled={disabled}
          onPress={onPress}
          borderless
          rippleColor={`${colors.black}20`}
          style={[styles.icon, styleBackground(buttonColor)]}
        >
          <Icon
            variant={icon}
            size={20}
            color={textColor ? textColor : colors.black}
          />
        </TouchableRipple>
      </View>

      {title ? (
        <>
          <Spacer size={5} />
          <Row gap={2}>
            {isChecked ? (
              <Icon variant="checked" size={10} color={colors.success} />
            ) : null}
            <Text variant="black_xs_light" center style={[styles.title]}>
              {title}
            </Text>
          </Row>
        </>
      ) : null}
    </View>
  );
}
