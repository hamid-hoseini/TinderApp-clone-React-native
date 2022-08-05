import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    //console.log(auth);

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      logOut,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  )


}

export default function useAuth() {
  return useContext(AuthContext);
}
