// src/Components/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjUs2Cd00ETOovjMp7Fj5HbL6by3x8wD0",
  authDomain: "blog-app-e0215.firebaseapp.com",
  projectId: "blog-app-e0215",
  storageBucket: "blog-app-e0215.appspot.com",
  messagingSenderId: "153443274061",
  appId: "1:153443274061:web:79508423449a4e14257b04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
