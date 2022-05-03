import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });
const AuthContext = createContext();
const cookies = new Cookies();
export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  /**** User Functions ****/

  /* USER - POST */
  async function login(email, password) {
    const user = {
      email: email,
      password: password,
    };
    return api
      .post("/user/login", user)
      .then(function (response) {
        // cookies.remove("auth-token");
        cookies.set("auth-token", response.data.token);
        if (cookies.get("connectUser")) {
          cookies.remove("connectUser");
        }
        cookies.set("connectUser", response.data.user);
        setCurrentUser(response.data.user);
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err);
        return err.response.data.message;
      });
  }

  async function signup(user, dealer) {
    var main = user.image;
    const now = Date.now();
    const userData = new FormData();
    userData.append("user", JSON.stringify(user));
    userData.append("dealer", JSON.stringify(dealer));
    userData.append("image", main[0], now + main[0].name);

    return api
      .post("/user/register", userData)
      .then((response) => {
        console.log(response); 
        return "Success";
      })
      .catch((err) => {
        console.log(err);
        return err.response.data.message;
      });
  }

  /* USER - EDIT */
  async function editPassword(oldPassword, newPassword) {
    const user = {
      email: currentUser.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    return api
      .put(`/user/edit-password/${currentUser._id}`, user)
      .then(function (response) {
        console.log(response);
        return "Success";
      })
      .catch((err) => {
        console.log(err);
        return err.response.data.message;
      });
  }

  async function editUserPropertiesWithoutImage(user) {
    return api
      .put(`/user/edit/${currentUser._id}`, user)
      .then(function (response) {
        cookies.set("auth-token", response.data.token);
        cookies.remove("connectUser", response.data.editUser);
        setCurrentUser(response.data.editUser);
        cookies.set("connectUser", response.data.editUser);
        return currentUser;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data.message;
      });
  }

  async function editUserProperties(user, userObj) {
    setLoading(true);
    const now = Date.now();
    const userData = new FormData();
    var newProfileImage = userObj.image;
    userData.append("image", newProfileImage[0], now + newProfileImage[0].name);
    userData.append("user", JSON.stringify(user));
    console.log(user);
    return api
      .put(`/user/edit-with-image/${user._id}`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        cookies.set("auth-token", response.data.token);
        cookies.remove("connectUser", response.data.editUser);
        setCurrentUser(response.data.editUser);
        cookies.set("connectUser", response.data.editUser);
        setLoading(false);
        return currentUser;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data.message;
      });
  }

  /* USER - OTHERS */
  function logout() {
    setCurrentUser(null);
    cookies.remove("auth-token");
    cookies.remove("connectUser");
  }

  /**** Car Functions ****/
  /* CAR - POST */
  async function createNewCar(carObj) {
    const formData = new FormData();
    var files = carObj.image;
    const now = Date.now();
    for (let i = 0; i < files.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      formData.append(`image`, files[i], now + rnd + files[i].name);
      formData.append(`imagesName`, now + rnd + files[i].name);
    }
    var main = carObj.main;
    formData.append("main", main[0], now + main[0].name);
    formData.append(`mainName`, now + main[0].name);
    formData.append("netPrice", carObj.price * 0.7);
    formData.append("dealer", currentUser._id.toString());
    formData.append("car", JSON.stringify(carObj));
    return api
      .post("/car/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/car-profile/${res.data}`);
        return "Success";
      })
      .catch(function (error) {
        console.log(error);
        return error.response.data.message;
      });
  }

  async function editCar(id, km, price, colour) {
    const updateCar = {
      _id: id,
      km: km,
      price: price,
      colour: colour,
      dealer: currentUser._id,
    };
    return api
      .put(`/car/edit/${id}`, updateCar)
      .then(function (response) {
        console.log(response);
        navigate(`car-profile/${id}`);
      })
      .catch(function (error) {
        console.log(error);
        return error.response.data.message;
      });
  }

  async function addCarToFavorite(userId, carId) {
    const addToFav = {
      _id: userId,
      carId: carId,
    };
    return api
      .put(`/user/add-to-favorite/${userId}`, addToFav)
      .then(function (response) {
        console.log(response);
        return "OK";
      })
      .catch(function (error) {
        console.log(error);
        return error.response.data.message;
      });
  }

  /* CAR - DELET */
  async function deleteCar(id) {
    api
      .delete(`/car/delete/${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (
      JSON.stringify(cookies.get("connectUser")) !==
        JSON.stringify(currentUser) &&
      currentUser != null
    ) {
      fetch(
        `${process.env.REACT_APP_SERVER_API}/user/my-user/` + currentUser._id
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
          cookies.set("connectUser", currentUser);
        });
    } else {
      setCurrentUser(cookies.get("connectUser"));
    }
    setSocket(io("http://localhost:5001"));
    return setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    createNewCar,
    signup,
    logout,
    deleteCar,
    editCar,
    editUserProperties,
    editUserPropertiesWithoutImage,
    editPassword,
    loading,
    addCarToFavorite,
    socket,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}