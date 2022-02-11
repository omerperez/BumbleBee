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
  const [mode, setMode] = useState(true);
  
  const cookies = new Cookies();

  function changeMode(userMode) {
    setMode(!userMode);
  }
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

  function createNewCar(
    company,
    model,
    year,
    numberOfVehicleOwners,
    engine,
    km,
    price,
    fuel,
    numberOfSeats,
    doorCount,
    gearbox,
    firstRegistrationDate,
    colour,
    condition,
    interiorDesign,
    images
  ) {
    const carData = new FormData();
    carData.append("companyEnglish", company.english);
    carData.append("companyHebrew", company.hebrew);
    carData.append("model", model);
    carData.append("year", year);
    carData.append("numberOfVehicleOwners", numberOfVehicleOwners);
    carData.append("engine", engine);
    carData.append("km", km);
    carData.append("price", price);
    carData.append("netPrice", price*(0.7));
    carData.append("images", images);
    carData.append("fuelConsumption", fuel);
    carData.append("numberOfSeats", numberOfSeats);
    carData.append("doorCount", doorCount);
    carData.append("gearbox", gearbox);
    carData.append("emissionClass", "Euro6");
    carData.append("firstRegistration", firstRegistrationDate);
    carData.append("colour", colour);
    carData.append("condition", condition);
    carData.append("iteriorDesign", interiorDesign);
    carData.append("dealer", currentUser._id);
    
      // const newCar = {
      //   companyEnglish: company.english,
      //   companyHebrew: company.hebrew,
      //   model: model,
      //   year: year,
      //   numberOfVehicleOwners: numberOfVehicleOwners,
      //   engine: engine,
      //   km: km,
      //   price: price,
      //   netPrice: price * 0.7,
      //   // description: ,
      //   images: images,
      //   fuelConsumption: fuel,
      //   numberOfSeats: numberOfSeats,
      //   doorCount: doorCount,
      //   gearbox: gearbox,
      //   emissionClass: "Euro6",
      //   firstRegistration: firstRegistrationDate,
      //   colour: colour,
      //   condition: condition,
      //   iteriorDesign: interiorDesign,
      //   dealer: currentUser._id,
      // };

    console.log(carData);
    console.log(carData.images);

    return api
      .post("/car/create", carData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    mode,
    createNewCar,
    changeMode,
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