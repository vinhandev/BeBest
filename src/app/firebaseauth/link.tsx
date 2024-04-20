import { MotiView, View } from 'moti';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Logo } from '~/components/molecules';
import { Metrics, PublicLinks } from '~/constants';
import { useSignIn } from '~/hooks';
import OTPTextInput from 'react-native-otp-textinput';
import { useTheme } from 'react-native-paper';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Metrics.medium,
    gap: 90,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputGroup: {},
  buttonGroup: {
    gap: Metrics.small,
  },
  button: {},
});
export default function OTPScreen() {
  const [code, setCode] = useState<string>('');

  const { isLoading, verifyCode } = useSignIn();
  const { colors } = useTheme();
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
