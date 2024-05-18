// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDugJ3D9Zi_xGWVw9HkE2_So1CV7ORDRcI",
  authDomain: "chat-screen-2a970.firebaseapp.com",
  projectId: "chat-screen-2a970",
  storageBucket: "chat-screen-2a970.appspot.com",
  messagingSenderId: "49019064559",
  appId: "1:49019064559:web:b4653000a788381d338b1a",
  measurementId: "G-BH2C3HFX4M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  export {app,auth,db};