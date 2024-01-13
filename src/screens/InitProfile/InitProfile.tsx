import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from '~/components/atoms';
import { TextInput } from '~/components/molecules/FormInputs';
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
    <View
      style={{
        padding: 20,
      }}
    >
      <TextInput control={control} name="name" label={'Name'} />
      <TextInput control={control} name="age" label={'Age'} />
      <TextInput control={control} name="weight" label={'Weight'} />
      <TextInput control={control} name="height" label={'Height'} />
      <TextInput control={control} name="water" label={'WaterPerDay'} />
      <TextInput control={control} name="goal" label={'GoalWeight'} />
      <TextInput control={control} name="gender" label={'Gender'} />
      <Button onPress={handleSubmit(onValid)}>Submit</Button>
    </View>
  );
}
