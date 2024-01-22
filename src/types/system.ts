import { IconType } from './icons';

export type IconButtonPropsType = {
  icon: IconType;
  onPress: () => void;
  title?: string;
};

export type BottomSheetType = 'add_task' | 'select_data';

export type SelectPropsType = {
  label: string;
  value: string;
};
