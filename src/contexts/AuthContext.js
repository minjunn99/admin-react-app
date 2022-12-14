// Import library
import React, { useContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

// Import components
import { auth, otherAuth } from "../firebase/firebaseConfig";

// Create context
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// Create provider
export const AuthProvider = ({ children }) => {
    // Children are mounted?
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(otherAuth, email, password);
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async (user) => {
            setLoading(false);
        });

        return () => {
            unsubcribe();
        };
    }, []);

    const value = {
        signup,
        signin,
        signout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
