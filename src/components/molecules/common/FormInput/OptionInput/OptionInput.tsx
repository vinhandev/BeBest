import React, { useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { useTheme } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native-ui-lib';

import { FormControlWrapper } from '~/components/HOCs';
import * as SelectData from '~/components/molecules/common/BottomSheet/components/BottomSheetSelectData/BottomSheetSelectData';

import Styles from '~/styles';
import { styleBackground, styleBorderColor } from '~/utils';
import { Text } from '~/components/atoms';
import { SelectPropsType } from '~/types';
type Props<T extends FieldValues> = TouchableOpacityProps & {
  control: Control<T>;
  name: Path<T>;
  theme?: any;
  label?: string;
  data: SelectPropsType[];
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
    formState: { defaultValues },
    field: { onChange, value },
    fieldState,
  } = useController({
    control,
    name,
  });

  const selectedOption = !value
    ? null
    : data.find((item) => item.value === value) ?? null;

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onOpen = () => {
    bottomSheetRef.current?.present();
  };
  const onSelectedChange = (param: SelectPropsType) => {
    onChange(param.value);
  };

  return (
    <>
      <FormControlWrapper
        label={label}
        invalid={fieldState.invalid}
        error={fieldState.error}
      >
        <TouchableOpacity
          onPress={onOpen}
          {...props}
          style={[
            Styles.formInput,
            styleBackground(colors.backdrop),
            styleBorderColor(
              fieldState.invalid ? colors.error : colors.backdrop
            ),
          ]}
        >
          <Text variant="black_s_regular">{selectedOption?.label}</Text>
        </TouchableOpacity>
      </FormControlWrapper>
      <BottomSheetModal
        style={{
          zIndex: 1,
        }}
        snapPoints={SelectData.SnapPoints}
        index={0}
        ref={bottomSheetRef}
      >
        <SelectData.Component
          onSelect={onSelectedChange}
          data={data}
          selectedOption={selectedOption}
        />
      </BottomSheetModal>
    </>
  );
}
