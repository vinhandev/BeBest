import React, { useCallback } from 'react';

import { Spacer, Text } from '~/components/atoms';
import { BottomSheetFlatList, useBottomSheet } from '@gorhom/bottom-sheet';

import { styles } from './BottomSheetSelectData.styles';
import { TouchableOpacity } from 'react-native-ui-lib';
import { SelectPropsType } from '~/types';
import { Metrics } from '~/constants';
import { styleBackground, styleBorderColor } from '~/utils';
import { useTheme } from 'react-native-paper';

type Props = {
  selectedOption: SelectPropsType | null;
  data: SelectPropsType[];
  onSelect: (data: SelectPropsType) => void;
};

export const SnapPoints = ['80%'];
export const Component = ({ data, selectedOption, onSelect }: Props) => {
  const { colors } = useTheme();
  const { close } = useBottomSheet();

  const handleSelectOption = (item: SelectPropsType) => {
    onSelect(item);
    close();
  };

  const renderItem = useCallback(
    ({ item }: { item: SelectPropsType }) => (
      <TouchableOpacity
        onPress={() => handleSelectOption(item)}
        style={[
          styles.item,
          styleBackground(
            selectedOption?.value === item.value
              ? colors.disabled
              : colors.background
          ),
          styleBorderColor(colors.disabled),
        ]}
      >
        <Text variant="black_s_light">{item.label}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <>
      <Text style={styles.container} variant="black_m_bold">
        Select an option
      </Text>
      <Spacer size={Metrics.medium} />
      <BottomSheetFlatList
        data={data}
        keyExtractor={(i) => i.value}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Spacer size={Metrics.small} />}
      />
    </>
  );
};
