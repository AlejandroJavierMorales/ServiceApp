
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

//configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOiB-fLMTOWmzExMY1GgEA3lvBPJJE_6c",
  authDomain: "appservice-636a4.firebaseapp.com",
  databaseURL: "https://appservice-636a4-default-rtdb.firebaseio.com",
  projectId: "appservice-636a4",
  storageBucket: "appservice-636a4.appspot.com",
  messagingSenderId: "731838326960",
  appId: "1:731838326960:web:376604a087314a3271f375"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Storage y Database
export const storage = getStorage(app);
export const database = getDatabase(app);
