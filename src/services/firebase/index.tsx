import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');