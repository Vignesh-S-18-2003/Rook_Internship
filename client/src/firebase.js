import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAUT2U2J48P-YIWeuDvKjXcSLV8WqkZT7U",
  authDomain: "dreamik-6bd9e.firebaseapp.com",
  projectId: "dreamik-6bd9e",
  storageBucket: "dreamik-6bd9e.appspot.com",
  messagingSenderId: "609148524010",
  appId: "1:609148524010:web:f9e4bf18acab5441798e93",
  measurementId: "G-M8THZY7CBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);