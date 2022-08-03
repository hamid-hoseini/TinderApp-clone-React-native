import React, { createContext, useContext, useEffect, useState } from 'react'
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

const AuthContext = createContext({})
const config = {
  androidClientId: '',
  iosClientId: '',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  // function signUp(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  // function signIn(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  // function logOut() {
  //   return signOut(auth);
  // }

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
    // return unsubscribe;
    // console.log(auth);
  }, [])
  

  return (
    <AuthContext.Provider value={{
      user,
      //signIn,
     //signUp,
      // logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}