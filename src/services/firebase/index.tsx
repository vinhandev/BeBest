import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const facesCollection = firestore().collection('Faces');
export const bodiesCollection = firestore().collection('Bodies');
export const mealsCollection = firestore().collection('Meals');
export const weightCollection = firestore().collection('Weights');
export const heightCollection = firestore().collection('Heights');
export const tasksCollection = firestore().collection('Tasks');
export const streaksCollection = firestore().collection('Streaks');