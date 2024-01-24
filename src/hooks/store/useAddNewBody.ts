import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';

export function useAddNewBody() {
  const bodies = useUserStore((state) => state.body);
  const setBody = useUserStore((state) => state.setBody);
  const add = (body: ImagePropsType) => {
    setBody([...(bodies ?? []), body]);
  };
  return {
    add,
  };
}
