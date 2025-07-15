// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCquZbrEGg9CHUhbzrFhFwDejhc0Mw-aQ",
  authDomain: "pruebas-c80da.firebaseapp.com",
  projectId: "pruebas-c80da",
  storageBucket: "pruebas-c80da.firebasestorage.app",
  messagingSenderId: "168916926366",
  appId: "1:168916926366:web:a3b7e882356f6d0cb8a08f",
  measurementId: "G-XMVGNQ24XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)