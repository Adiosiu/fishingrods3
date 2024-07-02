// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGAH-OtAfONcgFTfqfGyax7N7l5cYr_SA",
    authDomain: "aplikasi-database-a244c.firebaseapp.com",
    projectId: "aplikasi-database-a244c",
    storageBucket: "aplikasi-database-a244c.appspot.com",
    messagingSenderId: "967004831547",
    appId: "1:967004831547:web:de0dbccc9d43dfed89011e",
    measurementId: "G-VSSB4332X1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);