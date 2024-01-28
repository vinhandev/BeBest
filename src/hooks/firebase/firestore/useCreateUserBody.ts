import { bodiesCollection, facesCollection, usersCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ProfilePropsType } from '~/types';
import { ImagePropsType } from '~/types/images';
import { log } from '~/utils';

export const useCreateUserBody = () => {
  async function create(filename: string, image: ImagePropsType) {
    await bodiesCollection.doc(filename).set(image);
  }

  return {
    create,
  };
};
