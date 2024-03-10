import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { MotiView } from 'moti';
import { router } from 'expo-router';

import { PublicLinks } from '~/constants';

import { SignInSchemaType, useSignIn, useSignInForm } from '~/hooks';

import FormInput from '~/components/molecules/common/FormInput';
import { Button, Logo } from '~/components/molecules';
import { Spacer } from '~/components/atoms';
import PhoneInput from "react-native-phone-number-input";
import { styles } from './styles';

export default function SignInScreen() {
  const { t } = useTranslation('loginScreen');
  const { handleSubmit, control } = useSignInForm();
  const { isLoading, signIn } = useSignIn();

  const onValid = async (data: SignInSchemaType) => {
    try {
      if (data.email && data.password) {
        await signIn(data.email, data.password);
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 1000 }}
      style={styles.container}
    >
      <Logo size={150} />
      <View style={styles.inputGroup}>
        <PhoneInput/>
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
      </View>
    </MotiView>
  );
}
