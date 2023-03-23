// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCM6q26hiY5DHxrKVSqbJbG9evYe6MTWK4",
  authDomain: "demofv-a9565.firebaseapp.com",
  projectId: "demofv-a9565",
  storageBucket: "demofv-a9565.appspot.com",
  messagingSenderId: "405831152707",
  appId: "1:405831152707:web:a01efc602f037c4671d0f6",
  measurementId: "G-T4Y36P45HR",
};

const fs = initializeApp(firebaseConfig);

// Initilize FireStore Services
export const db = getFirestore(fs);
export const auth = getAuth(fs);
export const storage = getStorage(fs);
