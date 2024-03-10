import { usersCollection } from '~/services';
import { useUserStore } from '~/stores';
import { ProfilePropsType } from '~/types';
import { log } from '~/utils';

export const useCreateProfile = () => {
  const setProfile = useUserStore((state) => state.setProfile);

  async function createProfile(id: string, profile: ProfilePropsType) {
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
