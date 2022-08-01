import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const AuthContext = createContext({})
const config = {
  androidClientId: '',
  iosClientId: '',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
  // const signInWithGoogle = async () => {
  //   await Google.logInAsync(config).then(async (logInResult) => {
  //     if (logInResult.type === "success") {
  //       // login...
  //     }
  //   })

  const [user, setUser] = useState

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    return unsubscribe;
    }, []);
  })
  

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}