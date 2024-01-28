import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

export function useInitNotifications() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
    // Handle incoming notifications when app is in foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Received foreground notification: ', remoteMessage);
    });
    return unsubscribe;
  }, []);

  // Handle incoming notifications when app is in background
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log('Received background notification: ', remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Received background notification: ', remoteMessage);
  });

  // Handle incoming notifications when app is closed
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      console.log('Received closed app notification: ', remoteMessage);
    });
  messaging()
    .getToken()
    .then((token) => {
      console.log(token);
    });
}
