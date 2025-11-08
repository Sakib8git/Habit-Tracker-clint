import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

const AuthProvider = ({ children }) => {
  const [user, setUSer] = useState();
  const [loading, setLoading] = useState(true);
  // ----------------------------------------
  // registration-----------
  const createWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signIn-----------------------
  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Google SignIn-----------
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Forgot Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout function
  const logOut = () => {
    return signOut(auth);
  };

  // update pro
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  // Add this function
  const refreshNavUser = (updatedUser) => {
    setUSer(updatedUser);
  };

  const authData = {
    user,
    setUSer,
    createWithEmail,
    signInWithEmail,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    loading,
    setLoading,
    refreshNavUser,
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUSer(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;