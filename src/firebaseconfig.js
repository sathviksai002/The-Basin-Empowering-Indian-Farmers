import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage, ref, listAll, getDownloadURL, get } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyDUErxpBPYhZvX_jVx1s08rt2a8aQmy-cI",
  
    authDomain: "schemes-20bbb.firebaseapp.com",
  
    databaseURL: "https://schemes-20bbb-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "schemes-20bbb",
  
    storageBucket: "schemes-20bbb.appspot.com",
  
    messagingSenderId: "876494989644",
  
    appId: "1:876494989644:web:8dbcb6806b4923888c47e9"
  
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const storage = getStorage(app);


  export {database,storage};