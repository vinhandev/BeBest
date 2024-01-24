import { BusinessRules, FixedSizes } from '~/constants';
import { useUserStore } from '~/stores';
import { ImagePropsType } from '~/types/images';
import { TaskPropsType } from '~/types/task';

export function useAddNewFace() {
  const faces = useUserStore((state) => state.faces);
  const setTasks = useUserStore((state) => state.setFaces);
  const add = (face: ImagePropsType) => {
    setTasks([...(faces ?? []), face]);
  };
  return {
    add,
  };
}
