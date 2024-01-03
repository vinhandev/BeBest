import { Alert, Text, View } from 'react-native';

import React from 'react';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import { useForm } from 'react-hook-form';
import { useSignIn } from '~/hooks';
import { TextInput } from '~/components/molecules/FormInputs';

type Props = {
  onSignUp: () => void;
  onHome: () => void;
};

type FormData = {
  username: string;
  password: string;
};

export default function SignIn({ onSignUp, onHome }: Props) {
  const { control, handleSubmit } = useForm<FormData>();

  const { isLoading, signIn } = useSignIn();
  const onValid = async (data: FormData) => {
    try {
      await signIn(data.username, data.password);
      onHome();
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputGroup}>
        <TextInput
          control={control}
          name="username"
          style={styles.textInput}
          mode="outlined"
          placeholder="Username"
        />
        <TextInput
          control={control}
          name="password"
          style={styles.textInput}
          mode="outlined"
          placeholder="Password"
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          onPress={handleSubmit(onValid)}
          loading={isLoading}
          mode="contained"
          style={styles.button}
        >
          Sign In
        </Button>
        <Button onPress={onSignUp} mode="outlined" style={styles.button}>
          Register
        </Button>
      </View>
    </View>
  );
}
