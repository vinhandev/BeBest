import { create } from 'zustand';
import { BottomSheetType, SelectPropsType } from '~/types';

type paramType = {
  loading: boolean;
  openBottomSheet: boolean;
  variant: BottomSheetType | null;
  data: SelectPropsType[] | null;
  selectedOption: SelectPropsType | null;
  tempImage: string;
};
type stateProps = paramType & {
  setLoading: (loading: boolean) => void;
  setOpenBottomSheet: (
    openBottomSheet: boolean,
    variant?: BottomSheetType
  ) => void;
  setData: (data: SelectPropsType[]) => void;
  setOption: (data: SelectPropsType) => void;
  setTempImage: (image: string) => void;
  reset: () => void;
};

const initProps: paramType = {
  loading: false,
  openBottomSheet: false,
  variant: null,
  data: null,
  selectedOption: null,
  tempImage: '',
};

export const useSystemStore = create<stateProps>((set, get) => ({
  ...initProps,
  setLoading: (loading) => set(() => ({ loading })),
  setOpenBottomSheet: (openBottomSheet, variant) =>
    set((state) => ({
      openBottomSheet,
      variant: variant ? variant : state.variant,
    })),
  setData: (data) => set(() => ({ data })),
  setOption: (data) => set(() => ({ selectedOption: data })),
  setTempImage: (image) => set(() => ({ tempImage: image })),
  reset: () => set(() => initProps),
}));
