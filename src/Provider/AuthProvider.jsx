
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import { 
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut,
  updateProfile, 
} from "firebase/auth";
import { app } from "../Component/Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user)

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // const signIn = (email, password) => {
  //   setLoading(true)
  //   return signInWithEmailAndPassword(auth, email, password)
  // }
  const signIn = async (email, password) => {  
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

//   const signInWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

    // Get token from server
    const getToken = async email => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      )
      return data
    }

  const logOut = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    })
    return signOut(auth)
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) { 
        getToken(currentUser.email) 
      }
      setLoading(false);
    });
    return () => {
       unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.array,
  }
export default AuthProvider;


// import { createContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { app } from "../Component/Firebase/Firebase.config";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const db = getFirestore();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   console.log(user);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = async (username, password) => {
//     setLoading(true);
//     try {
//       // Fetch user email by username
//       const userQuery = query(collection(db, "users"), where("username", "==", username));
//       const querySnapshot = await getDocs(userQuery);
  
//       if (querySnapshot.empty) {
//         setLoading(false);
//         console.log("No matching documents.");
//         throw new Error("Username not found");
//       }
  
//       const userDoc = querySnapshot.docs[0];
//       const userEmail = userDoc.data().email;
//       console.log("Found user email:", userEmail);
  
//       // Sign in with email and password
//       await signInWithEmailAndPassword(auth, userEmail, password);
//     } catch (error) {
//       console.error("Error signing in:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logOut = async () => {
//     setLoading(true);
//     await signOut(auth);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     user,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default AuthProvider;
