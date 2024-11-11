// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDGOzYOUhD5g5QT7kwOTdfXmSTYeE1aghg",
  authDomain: "athena-439002.firebaseapp.com",
  databaseURL: "https://athena-439002-default-rtdb.firebaseio.com",
  projectId: "athena-439002",
  storageBucket: "athena-439002.appspot.com",
  messagingSenderId: "389834718899",
  appId: "1:389834718899:web:f785f4f7cf78504cc93ac6",
  measurementId: "G-SSBTLQRHYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;