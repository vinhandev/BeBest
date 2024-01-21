import { checkNotSameDate } from '~/utils';
import { Alert } from 'react-native';
import { useUserStore } from '~/stores';

export function useUpdateStreak() {
  const profile = useUserStore((state) => state.profile);
  const updatedStreakDate = useUserStore((state) => state.updatedStreakDate);
  const setStreak = useUserStore((state) => state.setProfile);
  const setUpdatedStreakDate = useUserStore(
    (state) => state.setUpdatedStreakDate
  );
  const incrementStreak = () => {
    if (
      profile &&
      (updatedStreakDate || updatedStreakDate === null) &&
      checkNotSameDate(updatedStreakDate, new Date())
    ) {
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
