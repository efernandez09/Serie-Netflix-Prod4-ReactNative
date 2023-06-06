// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo9Flk_rWy686Dpmj0BUqpWRxt4ILsDK0",
  authDomain: "prod2-serienetflix.firebaseapp.com",
  projectId: "prod2-serienetflix",
  storageBucket: "prod2-serienetflix.appspot.com",
  messagingSenderId: "8734869459",
  appId: "1:8734869459:web:e1fedde5a59d4a01d15126"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
