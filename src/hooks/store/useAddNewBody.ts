import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';

export function useAddNewBody() {
  const bodies = useUserStore((state) => state.bodies);
  const setBody = useUserStore((state) => state.setBodies);
  const add = (body: ImagePropsType) => {
    setBody([...(bodies ?? []), body]);
  };
  return {
    add,
  };
}
