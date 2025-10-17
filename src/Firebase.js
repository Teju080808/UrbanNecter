// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeceLO0gfmN5qG16mrzcfzz8WLBuayDLw",
  authDomain: "myapp-67b5e.firebaseapp.com",
  databaseURL: "https://myapp-67b5e-default-rtdb.firebaseio.com",
  projectId: "myapp-67b5e",
  storageBucket: "myapp-67b5e.firebasestorage.app",
  messagingSenderId: "602559394341",
  appId: "1:602559394341:web:a9ccaa625c8f67bb4a45cc",
  measurementId: "G-WW6Q9REXCR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);