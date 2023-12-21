import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUDSUjOU_pLCmFfzh1SQFDlbC5WI5yRK4",
  authDomain: "next-js-auth-75108.firebaseapp.com",
  projectId: "next-js-auth-75108",
  storageBucket: "next-js-auth-75108.appspot.com",
  messagingSenderId: "1028779233384",
  appId: "1:1028779233384:web:7b0f794f11355e2506abdd",
  measurementId: "G-JD1GY57PK7"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
