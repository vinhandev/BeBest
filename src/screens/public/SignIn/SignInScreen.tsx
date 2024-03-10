import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TextInput, View } from 'react-native';
import { MotiView } from 'moti';

import { SignInSchemaType, useSignIn, useSignInForm } from '~/hooks';

import { Button, Logo } from '~/components/molecules';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './styles';

export default function SignInScreen() {
  const { t } = useTranslation('loginScreen');
  const [country, setCountry] = useState<string>();
  const [phone, setPhone] = useState<string | undefined>();
  const { isLoading, signIn, confirmCode, code, onChangeCode, isSended } =
    useSignIn();

  const handleLoginByPhone = async () => {
    if (phone) {
      await signIn(`+${country}${phone}`);
    }
  };

  console.log(phone, country);
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
          <TextInput
            value={code}
            onChangeText={onChangeCode}
            placeholder="Enter OTP"
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={confirmCode}
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
          value={phone}
          onChangeText={setPhone}
          onChangeCountry={(country) => setCountry(country.callingCode[0])}
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
