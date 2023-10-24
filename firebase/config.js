// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7yb9kWaBlPfA8v5WOhPZ8bIA-5WBGCVE",
  authDomain: "test-8a77f.firebaseapp.com",
  projectId: "test-8a77f",
  storageBucket: "test-8a77f.appspot.com",
  messagingSenderId: "341914024361",
  appId: "1:341914024361:web:4fd5c7f584f07655a9ecb8",
  measurementId: "G-6Q2HN4DNWR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES = "messages";

export {
  MESSAGES,
  addDoc,
  collection,
  firestore,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy
};
