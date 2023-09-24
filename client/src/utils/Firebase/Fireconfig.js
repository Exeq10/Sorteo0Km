// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore,getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGZBGJdCehYGdDAH7h-Cm_GBWj4Vzp-nY",
  authDomain: "sorteosuzuki.firebaseapp.com",
  projectId: "sorteosuzuki",
  storageBucket: "sorteosuzuki.appspot.com",
  messagingSenderId: "1077458477084",
  appId: "1:1077458477084:web:e53323da1af04d9cf37fd9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export {db}