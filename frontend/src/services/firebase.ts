// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app)