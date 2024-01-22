import React, { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { useTheme } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native-ui-lib';

import { FormControlWrapper } from '~/components/HOCs';
import * as SelectData from '~/components/molecules/common/BottomSheet/components/BottomSheetSelectData/BottomSheetSelectData';

import Styles from '~/styles';
import { styleBackground, styleBorderColor } from '~/utils';
import { useSystemStore } from '~/stores';
import { Text } from '~/components/atoms';
import { SelectPropsType } from '~/types';
type Props<T extends FieldValues> = TouchableOpacityProps & {
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
    field: { onChange },
    fieldState,
  } = useController({
    control,
    name,
  });

  const [selectedOption, setSelectedOption] = useState<SelectPropsType | null>(
    null
  );

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onOpen = () => {
    bottomSheetRef.current?.present();
  };
  const onSelectedChange = (param: SelectPropsType) => {
    setSelectedOption(param);
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
          <Text variant="black_s_light">{selectedOption?.label}</Text>
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
