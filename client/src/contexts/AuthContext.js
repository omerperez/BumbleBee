import React, {useContext, useState, useEffect, createContext} from 'react'
import { auth } from '../AuthFirebase/firebase';
import axios from "axios";
import Cookies from 'universal-cookie';

const api = axios.create({ baseURL: "http://localhost:8080" });
const AuthContext = createContext(); 

export function useAuth(){ 
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  function signup(firstName, lastName, email, password, image) {
    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("image", image);
    userData.append("role", "1");

    return api
      .post("/user/register", userData)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }

  function login(email, password) {
    const user = {
      email: email,
      password: password,
    };

    return api
      .post("/user/login", user)
      .then(function (response) {
        cookies.set("auth-token", response.data.token);
        cookies.set("connectUser", response.data.user);
        setCurrentUser(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function logout() {
    setCurrentUser(null);
    cookies.remove("auth-token");
    return cookies.remove("connectUser");
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    if (cookies.get("connectUser")) {
      setCurrentUser(cookies.get("connectUser"));
    }
    return setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


  /*
  Fire Base -  
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  } 
   
  function signup(email, password) {
   return auth.signInWithEmailAndPassword(email, password);
  }
   
  function logout() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
     })
    return unsubscriber;
  } 
  */