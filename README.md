# chatAPP
react native----chat screen  

download Stack Navigator
Download FireBase

Make FireBase file 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

Add Auth funtion
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  export {app,auth};

  downloaded library npm install react-native-gifted-chat
  copy its functions

  expo started some upgrade problems
 -> npm install expo@latest
 -> npm install expo@51 
 ->  npm install @expo/metro-runtime@~3.2.1
 -> npm install @react-native-async-storage/async-storage@1.23.1
 -> npm install expo-status-bar@~1.12.1
-> npm install react-native@0.74.1
-> npm install react-native-gesture-handler@~2.16.1

-> add values in firestore 
-> fetch values forom firebase 



