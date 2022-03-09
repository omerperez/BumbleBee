import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../AuthFirebase/firebase";
import axios from "axios";
import Cookies from "universal-cookie";
import { storage } from "../AuthFirebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

  function changeMode(userMode) {
    setMode(!userMode);
  }

  function signup(firstName, lastName, email, mobile, password, image) {
    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("mobile", mobile.toString());
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

    // .post("/user/register", userData)
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

  //Listen for file selection
  function uploadFiles(files, date) {
    //Get files
    for (var i = 0; i < files.length; i++) {
      var imageFile = files[i];

      uploadImageAsPromise(imageFile, date);
    }
  }

  //Handle waiting to upload each file using promise
  function uploadImageAsPromise(imageFile, date) {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/files/${date}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("here2");
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (url) => console.log.url
          );
        }
      );
    });
  }

  function createNewCar(carObj) {
    const car = {
      companyEnglish: carObj.company.english,
      companyHebrew: carObj.company.hebrew,
      model: carObj.model,
      year: carObj.year,
      numberOfVehicleOwners: carObj.numberOfVehicleOwners,
      engine: carObj.engine,
      km: carObj.km,
      price: carObj.price,
      netPrice: carObj.price * 0.7,
      images: JSON.stringify(carObj.images),
      fuelConsumption: carObj.fuel,
      numberOfSeats: carObj.numberOfSeats,
      doorCount: carObj.doorCount,
      gearbox: carObj.gearbox,
      emissionClass: "Euro6",
      firstRegistration: carObj.firstRegistrationDate,
      colour: carObj.colour,
      condition: carObj.condition,
      dealer: currentUser._id,
    };

    /*
     const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("phoneNumber", phoneNumber);
    userData.append("image", image);
    userData.append("role", "1");
    */

    // let carData = new FormData();

    // const files = carObj.images;
    // for (var i = 0; i < files.length; i++) {
    //   carData.append("images", files[i]);
    //   console.log(files[i]);
    // }
    // console.log(files);

    // carData.append("images", JSON.stringify(carObj.images[0]));
    /* 
    carData.append("companyEnglish", carObj.company.english);
    carData.append("companyHebrew", carObj.company.hebrew);
    carData.append("model", carObj.model);
    carData.append("year", carObj.year);
    carData.append("numberOfVehicleOwners", carObj.numberOfVehicleOwners);
    carData.append("engine", carObj.engine);
    carData.append("km", carObj.km);
    carData.append("price", carObj.price);
    carData.append("netPrice", carObj.price * 0.7);
    carData.append("dateForImages", carObj.date);
    carData.append("fuelConsumption", carObj.fuel);
    carData.append("numberOfSeats", carObj.numberOfSeats);
    carData.append("doorCount", carObj.doorCount);
    carData.append("gearbox", carObj.gearbox);
    carData.append("emissionClass", "Euro6");
    carData.append("firstRegistration", carObj.firstRegistrationDate);
    carData.append("colour", carObj.colour);
    carData.append("condition", carObj.condition);
    carData.append("iteriorDesign", carObj.interiorDesign);
    carData.append("dealer", currentUser._id);
    console.log(carData);
*/
    return api
      .post("/car/create", car)
      .then(function (response) {})
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
    progress,
    uploadFiles,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
