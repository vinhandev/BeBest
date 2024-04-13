import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, View } from 'react-native';
import { MotiView } from 'moti';

import { SignInSchemaType, useSignIn, useSignInForm } from '~/hooks';

import { Button, FormInput, Logo } from '~/components/molecules';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './styles';
import { router } from 'expo-router';
import { PublicLinks } from '~/constants';
import { log } from '~/utils';
import OTPTextInput from 'react-native-otp-textinput';
import TextInput from '~/components/molecules/common/FormInput/TextInput/TextInput';
import { useTheme } from 'react-native-paper';

export default function SignInScreen() {
  const { t } = useTranslation('loginScreen');
  const { colors } = useTheme();
  const [country, setCountry] = useState<string>('84');
  const [phone, setPhone] = useState<string | undefined>();
  const [code, setCode] = useState<string>('');
  const { isLoading, signIn, verifyCode, isSended } = useSignIn();
  let otpInput = useRef<OTPTextInput>(null);

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
          <OTPTextInput
            tintColor={colors.primary}
            offTintColor={colors.disabled}
            containerStyle={{
              width: Dimensions.get('window').width - 40,
              overflow: 'hidden',
            }}
            textInputStyle={{
              width: '13%',
              height: undefined,
              aspectRatio: 1,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 3,
              backgroundColor: colors.white,
            }}
            autoFocus
            handleTextChange={setCode}
            inputCount={6}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={() => {
              verifyCode(code);
              router.replace(PublicLinks.START_UP);
            }}
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
          defaultCode={'VN'}
          value={phone}
          onChangeCountry={(value) => setCountry(value.callingCode[0])}
          onChangeText={setPhone}
          containerStyle={{
            width: Dimensions.get('window').width - 40,
            borderRadius: 10,
            borderColor: colors.disabled,
            backgroundColor: colors.white,
            borderWidth: 0.5,
          }}
          textContainerStyle={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: colors.white,
          }}
          textInputStyle={{
            fontSize: 15,
            fontWeight: '400',
          }}
          codeTextStyle={{
            fontSize: 15,
            fontWeight: '700',
          }}
          autoFocus
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
