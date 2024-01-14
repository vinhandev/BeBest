import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useSignUp } from '~/hooks/firebase/useSignUp';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/molecules/FormInput';

type Props = {
  onSignIn: () => void;
  onHome: () => void;
};

type FormData = {
  username: string;
  password: string;
  confirm: string;
};

export default function SignUpScreen({ onSignIn, onHome }: Props) {
  const { handleSubmit, register, control } = useForm<FormData>();
  const { signUp, isLoading } = useSignUp();

  async function onValid(data: FormData) {
    console.log(data);
    try {
      await signUp(data.username, data.password);
      onHome();
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <View style={styles.inputGroup}>
        <FormInput
          variant="text"
          control={control}
          name={'username'}
          style={styles.textInput}
          mode="outlined"
          label="Username"
        />
        <FormInput
          variant="text"
          control={control}
          name={'password'}
          style={styles.textInput}
          mode="outlined"
          label="Password"
        />
        <FormInput
          variant="text"
          control={control}
          name={'confirm'}
          style={styles.textInput}
          mode="outlined"
          label="Confirm Password"
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          loading={isLoading}
          onPress={handleSubmit(onValid)}
          mode="contained"
          style={styles.button}
        >
          Register
        </Button>
        <Button onPress={onSignIn} mode="outlined" style={styles.button}>
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}
