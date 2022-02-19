import React, {useContext, useState, useEffect, createContext} from 'react'
import { auth } from '../AuthFirebase/firebase';
import axios from "axios";
import Cookies from 'universal-cookie';
import { storage } from '../AuthFirebase/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const api = axios.create({ baseURL: "http://localhost:8080" });
const AuthContext = createContext(); 

export function useAuth(){ 
    return useContext(AuthContext)
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

  function signup(firstName, lastName, email, password, phoneNumber, image) {
    
    console.log(image);

    const newUser = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      phoneNumber : phoneNumber,
      password : password,
      image: image,
      role: '1'
    };
    const formData = new FormData();
    formData.append("image", image);

    // userData.append("firstName", firstName);
    // userData.append("lastName", lastName);
    // userData.append("email", email);
    // userData.append("password", password);
    // userData.append("image", image);
    // userData.append("role", "1");
    return api
      .post("/user/register", newUser)
      .then((res) => {
        console.log(res);
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

  //Listen for file selection
  function uploadFiles(files, date){ //Get files
    for (var i = 0; i < files.length; i++) {
      var imageFile = files[i];

      uploadImageAsPromise(imageFile, date);
    }
  };

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
  ){
    
    const car = {
      companyEnglish: company.english,
      companyHebrew: company.hebrew,
      model: model,
      year: year,
      numberOfVehicleOwners: numberOfVehicleOwners,
      engine: engine,
      km: km,
      price: price,
      netPrice: price * 0.7,
      images: images,
      fuelConsumption: fuel,
      numberOfSeats: numberOfSeats,
      doorCount: doorCount,
      gearbox: gearbox,
      emissionClass: "Euro6",
      firstRegistration: firstRegistrationDate,
      colour: colour,
      condition: condition,
      dealer: currentUser._id,
    };
    // const carData = new FormData();
    // carData.append("companyEnglish", company.english);
    // carData.append("companyHebrew", company.hebrew);
    // carData.append("model", model);
    // carData.append("year", year);
    // carData.append("numberOfVehicleOwners", numberOfVehicleOwners);
    // carData.append("engine", engine);
    // carData.append("km", km);
    // carData.append("price", price);
    // carData.append("netPrice", price * 0.7);
    // carData.append("dateForImages", date);
    // carData.append("images", [...imagesNames]);
    // carData.append("fuelConsumption", fuel);
    // carData.append("numberOfSeats", numberOfSeats);
    // carData.append("doorCount", doorCount);
    // carData.append("gearbox", gearbox);
    // carData.append("emissionClass", "Euro6");
    // carData.append("firstRegistration", firstRegistrationDate);
    // carData.append("colour", colour);
    // carData.append("condition", condition);
    // carData.append("iteriorDesign", interiorDesign);
    // carData.append("dealer", Object(currentUser._id));

    return api
      .post("/car/create", car)
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
    progress,
    uploadFiles,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}