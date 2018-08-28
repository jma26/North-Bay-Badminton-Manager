import * as firebase from 'firebase';
import FirebaseConfig from './keys.js';

const firebaseApp =  firebase.initializeApp(FirebaseConfig);

export default firebaseApp;