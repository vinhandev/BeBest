import React from 'react';

import { Alert, Text, View } from 'react-native';

import { styles } from './styles';
import { useForm } from 'react-hook-form';
import { SignInSchemaType, useSignIn, useSignInForm } from '~/hooks';
import FormInput from '~/components/molecules/FormInput';
import { Button, Logo } from '~/components/molecules';
import { Spacer } from '~/components/atoms';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

type Props = {
  onSignUp: () => void;
  onHome: () => void;
};

export default function SignInScreen({ onSignUp, onHome }: Props) {
  const { t, i18n } = useTranslation('loginScreen');
  const { handleSubmit, control } = useSignInForm();

  const { isLoading, signIn } = useSignIn();
  const onValid = async (data: SignInSchemaType) => {
    try {
      if (data.email && data.password) {
        await signIn(data.email, data.password);
        onHome();
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  return (
    <View style={styles.container}>
      <Logo size={150} />
      <View style={styles.inputGroup}>
        <FormInput
          variant="text"
          control={control}
          name="email"
          mode="outlined"
          placeholder="Username"
          label={'Username'}
        />
        <Spacer size={10} />
        <FormInput
          variant="text"
          control={control}
          name="password"
          mode="outlined"
          placeholder="Password"
          label={'Password'}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          onPress={handleSubmit(onValid)}
          loading={isLoading}
          mode="contained"
          style={styles.button}
        >
          {t('login_button')}
        </Button>
        <Button onPress={onSignUp} mode="outlined" style={styles.button}>
          {t('register_button')}
        </Button>
      </View>
    </View>
  );
}
