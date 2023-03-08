// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfigDeveloper = {
  apiKey: "AIzaSyC7nrIyKS4VQLew6pM1O2jP37zjhtuH6EY",
  authDomain: "gesto-e26ab.firebaseapp.com",
  databaseURL: "https://gesto-e26ab-default-rtdb.firebaseio.com",
  projectId: "gesto-e26ab",
  storageBucket: "gesto-e26ab.appspot.com",
  messagingSenderId: "340558224805",
  appId: "1:340558224805:web:f8bb36140eed40b2c71c4c",
};

const firebaseConfigProduction = {
  apiKey: "AIzaSyCM6q26hiY5DHxrKVSqbJbG9evYe6MTWK4",
  authDomain: "demofv-a9565.firebaseapp.com",
  projectId: "demofv-a9565",
  storageBucket: "demofv-a9565.appspot.com",
  messagingSenderId: "405831152707",
  appId: "1:405831152707:web:a01efc602f037c4671d0f6",
  measurementId: "G-T4Y36P45HR",
};

// Initialize Firebase

const fs = initializeApp(firebaseConfigProduction);

// Initilize FireStore Database
export const db = getFirestore(fs);
export const auth = getAuth(fs);
