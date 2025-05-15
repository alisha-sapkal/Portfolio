import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuJTf3Zqa2MYr9JGq96EiLG5wZzc0IT_w",
  authDomain: "portfolio-e4d50.firebaseapp.com",
  projectId: "portfolio-e4d50",
  storageBucket: "portfolio-e4d50.firebasestorage.app",
  messagingSenderId: "736304781926",
  appId: "1:736304781926:web:f026e1e84aee290c426ba7",
  measurementId: "G-3T4EJ55PMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
