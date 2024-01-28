import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const facesCollection = firestore().collection('Faces');
export const bodiesCollection = firestore().collection('Bodies');
export const mealsCollection = firestore().collection('Meals');