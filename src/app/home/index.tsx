import React from 'react';
import { Text, View } from 'react-native';
import { useUserStore } from '~/stores/useUserStore';
import { getAuth, signOut } from 'firebase/auth';
export default function Index() {
  const auth = getAuth();
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={handleSignOut}>Sign Out</Text>
    </View>
  );
}
