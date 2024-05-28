// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVHdMAXDAfI_BvfFVG02wA6YPmkRvDzfg",
  authDomain: "social-media-app-20a6f.firebaseapp.com",
  projectId: "social-media-app-20a6f",
  storageBucket: "social-media-app-20a6f.appspot.com",
  messagingSenderId: "323312806306",
  appId: "1:323312806306:web:41bedbd6e0b1e86c47aafb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();