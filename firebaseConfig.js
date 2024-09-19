// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJsboq8ch0IrE4xUyz9JBSx0dyyGa_I2M",
  authDomain: "shabuj-global-reg.firebaseapp.com",
  projectId: "shabuj-global-reg",
  storageBucket: "shabuj-global-reg.appspot.com",
  messagingSenderId: "300548347701",
  appId: "1:300548347701:web:ccaadb76c8c5e8f92a9e7c"
};

// Check if Firebase app is already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);  // Initialize the Firebase app
} else {
  app = getApps()[0];  // Use the already initialized app
}

// Initialize Firebase auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
