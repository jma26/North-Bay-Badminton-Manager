import * as firebase from 'firebase';
import FirebaseConfig from './keys.js';

const firebaseApp =  firebase.initializeApp(FirebaseConfig);
const fireStore = firebaseApp.firestore();
const firebaseMain = firebase;

export {
  firebaseApp,
  fireStore,
  firebaseMain
}