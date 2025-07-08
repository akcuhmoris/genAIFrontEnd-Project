// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJTi5RrkfJSus_rg4E4QUw_6UfNrghOm8",
  authDomain: "genaifrontend.firebaseapp.com",
  projectId: "genaifrontend",
  storageBucket: "genaifrontend.firebasestorage.app",
  messagingSenderId: "737633926454",
  appId: "1:737633926454:web:ad8e08b2500fd396bec797",
  measurementId: "G-PGFJM29B03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);