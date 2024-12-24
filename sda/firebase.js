// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuj--RrgwO6H3YcOfB105lZbtn6OfQrLY",
  authDomain: "sda-webapp.firebaseapp.com",
  projectId: "sda-webapp",
  storageBucket: "sda-webapp.firebasestorage.app",
  messagingSenderId: "850460668421",
  appId: "1:850460668421:web:2258c9458cbe516a47226c",
  measurementId: "G-6B3LJF1MQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
