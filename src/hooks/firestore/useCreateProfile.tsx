import { usersCollection } from '~/services';
import { ProfilePropsType } from '~/types';

export const useCreateProfile = () => {
  function createProfile(id: string, profile: ProfilePropsType) {
    return usersCollection.doc(id).set(profile);
  }

  return {
    createProfile,
  };
};
