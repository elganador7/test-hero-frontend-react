// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaxrwlZlOtNWXLbxmo6B6-DWANYkCkX6A",
  authDomain: "testscorehero-6849a.firebaseapp.com",
  projectId: "testscorehero-6849a",
  storageBucket: "testscorehero-6849a.firebasestorage.app",
  messagingSenderId: "714475742868",
  appId: "1:714475742868:web:aabc2ad0e3ae48ca757681",
  measurementId: "G-VQFKQ5JXFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };