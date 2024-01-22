import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNBottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetType } from '~/types';
import { useSystemStore } from '~/stores';

import * as AddTask from './components/BottomSheetAddTask/BottomSheetAddTask';

const BottomSheet = () => {
  // ref
  const bottomSheetRef = useRef<RNBottomSheet>(null);

  const open = useSystemStore((state) => state.openBottomSheet);
  const variant = useSystemStore((state) => state.variant);
  const setOpenBottomSheet = useSystemStore(
    (state) => state.setOpenBottomSheet
  );

  const onOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
  };

  let body;
  let snapPoints = ['100%'];

  switch (variant) {
    case 'add_task':
      body = <AddTask.Component />;
      snapPoints = AddTask.SnapPoints;
      break;

    default:
      break;
  }

  useEffect(() => {
    if (open) {
      onOpen();
      setOpenBottomSheet(false);
    }
  }, [open]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onClose={onClose}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      {body}
    </RNBottomSheet>
  );
};

export default BottomSheet;
