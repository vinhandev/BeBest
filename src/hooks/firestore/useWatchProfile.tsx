import { useEffect } from 'react';
import { usersCollection } from '~/services';
import { useUserStore } from '~/stores/useUserStore';
import { ProfilePropsType } from '~/types';

export const useWatchProfile = () => {
  const user = useUserStore((state) => state.user);
  const setProfile = useUserStore((state) => state.setProfile);
  const userId = user?.uid;
  useEffect(() => {
    const subscriber = usersCollection
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot?.data();
        console.log('User data: ', data);

        if (data) {
          setProfile(data as ProfilePropsType);
        }
      });

    return () => subscriber();
  }, [userId]);
};
