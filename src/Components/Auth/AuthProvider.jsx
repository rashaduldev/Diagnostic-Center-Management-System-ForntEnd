/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";


export const AuthContext=createContext(null)

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider= new GoogleAuthProvider();
    
    //Log in with Google
    const googleSignin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

     // user created
    const createUser=(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password)
    }
    //    user Signing in
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    // user update profile
    const updateUserProfile=(name,photo)=>{
      return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        });
    }

    // User Signing out
    const logOut=()=>{
        setLoading(false);
        return signOut(auth);
    }
    const authinfo={
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
        googleSignin
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;