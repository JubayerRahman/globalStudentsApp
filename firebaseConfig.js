// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHHVotZUexziDZLYyj4nwnjk3rRXGXDcc",
  authDomain: "branchloginapp.firebaseapp.com",
  projectId: "branchloginapp",
  storageBucket: "branchloginapp.appspot.com",
  messagingSenderId: "158718819283",
  appId: "1:158718819283:web:5c0763fdee935727f88d26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth