import { create } from 'zustand';
import { BottomSheetType } from '~/types';

type paramType = {
  loading: boolean;
  openBottomSheet: boolean;
  variant: BottomSheetType | null;
};
type stateProps = paramType & {
  setLoading: (loading: boolean) => void;
  setOpenBottomSheet: (
    openBottomSheet: boolean,
    variant?: BottomSheetType
  ) => void;
  reset: () => void;
};

const initProps: paramType = {
  loading: false,
  openBottomSheet: false,
  variant: null,
};

export const useSystemStore = create<stateProps>((set, get) => ({
  ...initProps,
  setLoading: (loading) => set(() => ({ loading })),
  setOpenBottomSheet: (openBottomSheet, variant) =>
    set((state) => ({
      openBottomSheet,
      variant: variant ? variant : state.variant,
    })),
  reset: () => set(() => initProps),
}));
