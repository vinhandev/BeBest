import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeKeyboard, SafeScreen } from '~/components/HOCs';
import { Text } from '~/components/atoms';
import { FormInput } from '~/components/molecules';
import { Metrics, ages, genders } from '~/constants';
import { useUserStore } from '~/stores/useUserStore';
import { styles } from './InitProfile.styles';
import { useCreateProfile, useInitProfileForm, useSignOut } from '~/hooks';
import { ProfilePropsType } from '~/types';

export default function InitProfile() {
  const user = useUserStore((state) => state.user);
  const { signOut } = useSignOut();
  const { createProfile } = useCreateProfile();
  const { control, handleSubmit } = useInitProfileForm();
  const onValid = async (data: any) => {
    console.log(data);

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
    };

    await createProfile(user?.uid, param);
  };

  return (
    <SafeScreen>
      <SafeKeyboard scrollEnabled>
        <View style={styles.container}>
          <Text
            style={{
              textAlign: 'center',
            }}
            variant="black_xl_light"
          >
            Init Profile
          </Text>
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
            style={{ marginTop: Metrics.medium }}
            mode="contained"
            onPress={handleSubmit(onValid)}
          >
            Submit
          </Button>
          <Button
            style={{ marginTop: Metrics.medium }}
            mode="outlined"
            onPress={signOut}
          >
            SignOut
          </Button>
        </View>
      </SafeKeyboard>
    </SafeScreen>
  );
}
