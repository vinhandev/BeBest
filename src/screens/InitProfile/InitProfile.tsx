import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from '~/components/atoms';
import { FormInput } from '~/components/molecules';
import { HomeLinks } from '~/constants';
import { useUserStore } from '~/stores/useUserStore';

export default function InitProfile() {
  const { control, handleSubmit } = useForm();
  const setProfile = useUserStore((state) => state.setProfile);
  const onValid = (data: any) => {
    console.log(data);

    setProfile({
      age: data.age,
      gender: data.gender,
      goalWeight: data.goal,
      height: data.height,
      name: data.name,
      waterPerDay: data.water,
      weight: data.weight,
    });

    router.push(HomeLinks.HOME);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        padding: 20,
      }}
    >
      <FormInput variant="text" control={control} name="name" label={'Name'} />
      <FormInput variant="number" control={control} name="age" label={'Age'} />
      <FormInput
        variant="number"
        control={control}
        name="weight"
        label={'Weight'}
      />
      <FormInput
        variant="number"
        control={control}
        name="height"
        label={'Height'}
      />
      <FormInput
        variant="number"
        control={control}
        name="water"
        label={'WaterPerDay'}
      />
      <FormInput
        variant="number"
        control={control}
        name="goal"
        label={'GoalWeight'}
      />
      <FormInput
        variant="text"
        control={control}
        name="gender"
        label={'Gender'}
      />
      <Button onPress={handleSubmit(onValid)}>Submit</Button>
    </KeyboardAvoidingView>
  );
}
