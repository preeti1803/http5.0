// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, m
const firebaseConfig = {
  apiKey: "AIzaSyCXNkKHIcpzmOktP-eYf54zC9I_MSWOr9A",
  authDomain: "http-783a8.firebaseapp.com",
  projectId: "http-783a8",
  storageBucket: "http-783a8.firebasestorage.app",
  messagingSenderId: "371282242383",
  appId: "1:371282242383:web:4f64d61fe7dd2b13fa333a",
  measurementId: "G-3785E6C8NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export{auth,RecaptchaVerifier,signInWithPhoneNumber};