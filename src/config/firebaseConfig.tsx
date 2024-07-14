// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBScd-by6ehvu8Eo6Vro_TEbtAPugpSnCE",
  authDomain: "mensajeria-firebase-d6dd6.firebaseapp.com",
  projectId: "mensajeria-firebase-d6dd6",
  storageBucket: "mensajeria-firebase-d6dd6.appspot.com",
  messagingSenderId: "940761871598",
  appId: "1:940761871598:web:8029cf7c06538b0a6e6fff"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(firebase);


 export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });