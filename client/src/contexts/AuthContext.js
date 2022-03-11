import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../AuthFirebase/firebase";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const api = axios.create({ baseURL: "http://localhost:8080" });
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  function changeMode(userMode) {
    setMode(!userMode);
  }

  function signup(firstName, lastName, email, mobile, password, image) {
    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("mobile", "+972" + mobile.toString());
    userData.append("password", password);
    userData.append("image", image);
    userData.append("role", "1");

    return api
      .post("/user/register", userData)
      .then(function (response) {
        console.log(response);
      })
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

  function createNewCar(carObj) {

    const formData = new FormData();
  
    var files = carObj.image;
    const now = Date.now();
    for (let i = 0; i < files.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      formData.append(`image`, files[i], now + rnd + files[i].name);
      formData.append(`imagesName`, now + rnd + files[i].name);
    }

    formData.append("companyEnglish", carObj.company.english);
    formData.append("companyHebrew", carObj.company.hebrew);
    formData.append("model", carObj.model);
    formData.append("year", carObj.year);
    formData.append("engine", carObj.engine);
    formData.append("km", carObj.km);
    formData.append("price", carObj.price);
    formData.append("netPrice", carObj.price * 0.7);
    formData.append("fuelConsumption", carObj.fuel);
    formData.append("numberOfSeats", carObj.numberOfSeats);
    formData.append("doorCount", carObj.doorCount);
    formData.append("gearbox", carObj.gearbox);
    formData.append("emissionClass", "Euro6");
    formData.append("firstRegistration", carObj.firstRegistrationDate);
    formData.append("colour", carObj.colour);
    formData.append("condition", carObj.condition);
    formData.append("dealer", currentUser._id);

    return api
      .post("/car/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/car-profile/${res.data}`)
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editCar(id, km, price, colour ){
    const updateCar = {
      _id: id,
      km: km,
      price: price,
      colour: colour
    };
    return api
      .put(`/car/edit/${id}`, updateCar)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("error");
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
    progress,
    editCar,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
