// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuiEdpdD13QSTrdYXqSAgce9ZxdTr-KH4",
    authDomain: "the-basin.firebaseapp.com",
    projectId: "the-basin",
    storageBucket: "the-basin.appspot.com",
    messagingSenderId: "4526831738",
    appId: "1:4526831738:web:b4690ce23fa36c8b3823c3",
    measurementId: "G-2S5GJW73XB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;