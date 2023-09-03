import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "proyectofinalreactcoder.firebaseapp.com",
  projectId: "proyectofinalreactcoder",
  storageBucket: "proyectofinalreactcoder.appspot.com",
  messagingSenderId: "319595267633",
  appId: "1:319595267633:web:e4fbb09576951d71523710"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);