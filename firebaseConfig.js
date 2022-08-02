import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { FIREBASE_CONFIG } from "@env";

console.log(FIREBASE_CONFIG.apiKey);
const firebaseConfig = {
  // apiKey: FIREBASE_CONFIG.apiKey,
  // authDomain: FIREBASE_CONFIG.authDomain,
  // databaseURL: FIREBASE_CONFIG.databaseURL,
  // projectId: FIREBASE_CONFIG.projectId,
  // storageBucket: FIREBASE_CONFIG.storageBucket,
  // messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
  // appId: FIREBASE_CONFIG.appId
  apiKey: "AIzaSyDi5iA5VvRjH4cLKJIGgnA3JWVbXi96n-o",
  authDomain: "tinder2-clone-357702.firebaseapp.com",
  projectId: "tinder2-clone-357702",
  storageBucket: "tinder2-clone-357702.appspot.com",
  messagingSenderId: "727254712861",
  appId: "1:727254712861:web:d53030fd1fa6608c2d3cf4"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore()
const auth = app.auth();

export { db, auth };