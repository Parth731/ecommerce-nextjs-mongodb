// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqydTS8znjUxCiz2EPNPEBJgIsKYpoepE",
  authDomain: "ecommercery-next-app.firebaseapp.com",
  projectId: "ecommercery-next-app",
  storageBucket: "ecommercery-next-app.appspot.com",
  messagingSenderId: "511252771825",
  appId: "1:511252771825:web:f772541332a2ce49350a50",
  measurementId: "G-63DSRHJ543",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseStroageURL = "gs://ecommercery-next-app.appspot.com";
export const storage = getStorage(app, firebaseStroageURL);
const analytics = getAnalytics(app);
