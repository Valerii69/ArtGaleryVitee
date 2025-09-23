// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const apiKeyFirebase = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {

  apiKey: apiKeyFirebase,
  authDomain: "artgallery-3621a.firebaseapp.com",
  projectId: "artgallery-3621a",
  storageBucket: "artgallery-3621a.firebasestorage.app",
  messagingSenderId: "1042245134229",
  appId: "1:1042245134229:web:12e0f4784367c24f95389c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export const db = getFirestore(app)