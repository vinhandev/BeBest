import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeKeyboard, SafeScreen } from '~/components/HOCs';
import { Text } from '~/components/atoms';
import { FormInput, Header } from '~/components/molecules';
import { Metrics, ages, genders, todayTime } from '~/constants';
import { useUserStore } from '~/stores/useUserStore';
import { useCreateProfile, useInitProfileForm, useSignOut } from '~/hooks';
import { ProfilePropsType } from '~/types';
import { styles } from './Edit.styles';
import { router } from 'expo-router';
import { showToast } from '~/utils';
import { usersCollection } from '~/services';

export default function Edit() {
  const user = useUserStore((state) => state.user);
  const setProfile = useUserStore((state) => state.setProfile);
  const { createProfile } = useCreateProfile();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useInitProfileForm();
  const onValid = async (data: any) => {
    if (
      !data.age ||
      !data.gender ||
      !data.height ||
      !data.name ||
      !data.weight ||
      !user?.uid
    ) {
      return;
    }

    const param: ProfilePropsType = {
      age: parseInt(data.age),
      gender: data.gender,
      goalHeight: data.goalHeight,
      goalWeight: data.goalWeight,
      height: data.height,
      name: data.name,
      waterPerDay: data.water,
      weight: data.weight,
      streak: 0,
      mealPerDay: data.mealPerDay,
      updateHeightTime: todayTime,
      updateWeightTime: todayTime,
      updateStreakTime: todayTime,
    };

    try {
      await usersCollection.doc(user?.uid).update(param);
      setProfile(param);
      console.log(data);
    } catch (error) {
      showToast((error as Error).message);
    }
  };

  return (
    <View>
      <Header
        title="Edit Profile"
        left={{
          icon: 'back',
          onPress: () => {
            router.back();
          },
        }}
      />
      <SafeKeyboard scrollEnabled>
        <View style={styles.container}>
          <FormInput
            variant="text"
            control={control}
            name="name"
            label={'Name'}
          />
          <FormInput
            variant="select"
            control={control}
            name="age"
            label={'Age'}
            data={ages}
          />
          <FormInput
            variant="number"
            control={control}
            name="weight"
            label={'Weight (kg)'}
          />
          <FormInput
            variant="number"
            control={control}
            name="height"
            label={'Height (cm)'}
          />
          <FormInput
            variant="number"
            control={control}
            name="water"
            label={'WaterPerDay (ml)'}
          />
          <FormInput
            variant="number"
            control={control}
            name="goalWeight"
            label={'GoalWeight (kg)'}
          />
          <FormInput
            variant="number"
            control={control}
            name="goalHeight"
            label={'GoalHeight (cm)'}
          />
          <FormInput
            variant="number"
            control={control}
            name="mealPerDay"
            label={'Meals per day'}
            inputMode="numeric"
          />
          <FormInput
            variant="select"
            control={control}
            name="gender"
            label={'Gender'}
            data={genders}
          />
          <Button
            loading={isSubmitting}
            disabled={!isDirty}
            style={{ marginTop: Metrics.medium }}
            mode="contained"
            onPress={handleSubmit(onValid)}
          >
            Submit
          </Button>
        </View>
      </SafeKeyboard>
    </View>
  );
}
