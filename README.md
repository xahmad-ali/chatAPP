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

