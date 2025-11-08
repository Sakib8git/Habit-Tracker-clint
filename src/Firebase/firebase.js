// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH63njWbyCJxt49CERFXxZiJWIKCyrbao",
  authDomain: "health-tracker-d7907.firebaseapp.com",
  projectId: "health-tracker-d7907",
  storageBucket: "health-tracker-d7907.firebasestorage.app",
  messagingSenderId: "890812351359",
  appId: "1:890812351359:web:011cadf3c36fe59742d04a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
