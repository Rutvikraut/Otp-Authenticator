// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZUb9dXgY7xmKcguH6GIEYh4oLV9Z-8Mc",
  authDomain: "otp-authenticator-48c9e.firebaseapp.com",
  projectId: "otp-authenticator-48c9e",
  storageBucket: "otp-authenticator-48c9e.appspot.com",
  messagingSenderId: "345098881718",
  appId: "1:345098881718:web:59b98f71d5ea54606e3417",
  measurementId: "G-SZ7G5R5Z6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)