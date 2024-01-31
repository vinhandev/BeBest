import { checkNotSameDate, getDateStringForImageFile } from '~/utils';
import { Alert } from 'react-native';
import { useUserStore } from '~/stores';
import { streaksCollection, usersCollection } from '~/services';
import { today, todayTime } from '~/constants';

export function useUpdateStreak() {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const updatedStreakDate = useUserStore((state) => state.updatedStreakDate);
  const setStreak = useUserStore((state) => state.setProfile);
  const setUpdatedStreakDate = useUserStore(
    (state) => state.setUpdatedStreakDate
  );
  const incrementStreak = async () => {
    if (
      profile &&
      (updatedStreakDate || updatedStreakDate === null) &&
      checkNotSameDate(updatedStreakDate, new Date())
    ) {
      await usersCollection.doc(user?.uid).update({
        streak: profile.streak + 1,
        updatedStreakDate: todayTime,
      });
      await streaksCollection
        .doc(`${user?.uid}_${getDateStringForImageFile(today)}`)
        .set({
          uid: user?.uid,
          timeStamp: todayTime,
          streak: profile.streak + 1,
        });
      setStreak({ ...profile, streak: profile.streak + 1 });
      setUpdatedStreakDate(new Date());
    } else {
      Alert.alert('Is  checked today');
    }
  };
  return {
    incrementStreak,
  };
}
