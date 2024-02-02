import { usersCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ProfilePropsType } from '~/types';
import { log } from '~/utils';

export const useCreateProfile = () => {
  async function createProfile(id: string, profile: ProfilePropsType) {
    const setProfile = useUserStore((state) => state.setProfile);

    try {
      console.log(profile);
      await usersCollection.doc(id).set(profile);
      setProfile(profile);
    } catch (error) {
      log.error(error);
    }
  }

  return {
    createProfile,
  };
};
