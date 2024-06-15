import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage, ref, listAll, getDownloadURL, get } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "",
  
    authDomain: "",
  
    databaseURL: "",
  
    projectId: "",
  
    storageBucket: "",
  
    messagingSenderId: "",
  
    appId: ""
  
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const storage = getStorage(app);


  export {database,storage};
