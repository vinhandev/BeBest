import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCz-6SCR4mm79ZJ5FJ21UnULfYMbjiOjIM',
  authDomain: 'bebest-58b9d.firebaseapp.com',
  projectId: 'bebest-58b9d',
  storageBucket: 'bebest-58b9d.appspot.com',
  messagingSenderId: '71780941691',
  appId: '1:71780941691:web:72ed877bf564e7c72547de',
  measurementId: 'G-GBSMEQPTME',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
