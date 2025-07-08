// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJTi5RrkfJSus_rg4E4QUw_6UfNrghOm8",
    authDomain: "genaifrontend.firebaseapp.com",
    projectId: "genaifrontend",
    storageBucket: "genaifrontend.firebasestorage.app",
    messagingSenderId: "737633926454",
    appId: "1:737633926454:web:ad8e08b2500fd396bec797",
    measurementId: "G-PGFJM29B03"
  };

  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
