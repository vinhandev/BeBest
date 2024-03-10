import { IconType } from './icons';

export type IconButtonPropsType = {
  icon: IconType;
  onPress: () => void;
  title?: string;
  isChecked?: boolean;
};

export type BottomSheetType =
  | 'add_task'
  | 'select_data'
  | 'weight'
  | 'height'
  | 'camera';

export type SelectPropsType = {
  label: string;
  value: string;
};

export type RecordPropsType = {
  time: number;
  uid: string;
  value: number;
};
