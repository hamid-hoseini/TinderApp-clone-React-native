import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { FIREBASE_CONFIG } from "@env";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

console.log(FIREBASE_CONFIG.apiKey);
const firebaseConfig = {
  apiKey: FIREBASE_CONFIG.apiKey,
  authDomain: FIREBASE_CONFIG.authDomain,
  databaseURL: FIREBASE_CONFIG.databaseURL,
  projectId: FIREBASE_CONFIG.projectId,
  storageBucket: FIREBASE_CONFIG.storageBucket,
  messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
  appId: FIREBASE_CONFIG.appId
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export default app;

// let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore()
const auth = app.auth();

export { db, auth };