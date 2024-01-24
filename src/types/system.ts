import { IconType } from './icons';

export type IconButtonPropsType = {
  icon: IconType;
  onPress: () => void;
  title?: string;
};

export type BottomSheetType =
  | 'add_task'
  | 'select_data'
  | 'face'
  | 'body'
  | 'meal'
  | 'weight'
  | 'height';

export type SelectPropsType = {
  label: string;
  value: string;
};
