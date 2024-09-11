// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJsboq8ch0IrE4xUyz9JBSx0dyyGa_I2M",
  authDomain: "shabuj-global-reg.firebaseapp.com",
  projectId: "shabuj-global-reg",
  storageBucket: "shabuj-global-reg.appspot.com",
  messagingSenderId: "300548347701",
  appId: "1:300548347701:web:ccaadb76c8c5e8f92a9e7c"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth