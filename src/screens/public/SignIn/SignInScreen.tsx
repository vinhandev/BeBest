import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TextInput, View } from 'react-native';
import { MotiView } from 'moti';

import { SignInSchemaType, useSignIn, useSignInForm } from '~/hooks';

import { Button, FormInput, Logo } from '~/components/molecules';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './styles';
import { router } from 'expo-router';
import { PublicLinks } from '~/constants';
import { log } from '~/utils';

export default function SignInScreen() {
  const { t } = useTranslation('loginScreen');
  const [country, setCountry] = useState<string>('84');
  const [phone, setPhone] = useState<string | undefined>();
  const [code, setCode] = useState<string>('');
  const { isLoading, signIn, verifyCode, isSended } = useSignIn();

  const handleLoginByPhone = async () => {
    if (phone) {
      const requestPhone = `+${country}${phone}`;
      console.log('phone', requestPhone);
      await signIn(`+${country}${phone}`);
    }
  };

  if (isSended) {
    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.container}
      >
        <Logo size={150} />
        <View style={styles.inputGroup}>
          <TextInput value={code} onChangeText={setCode} />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={() => verifyCode(code)}
            loading={isLoading}
            mode="contained"
            style={styles.button}
          >
            Verify OTP
          </Button>
        </View>
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 1000 }}
      style={styles.container}
    >
      <Logo size={150} />
      <View style={styles.inputGroup}>
        <PhoneInput
          defaultCode={"VN"}
          value={phone}
          onChangeCountry={(value) => setCountry(value.callingCode[0])}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          onPress={handleLoginByPhone}
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
