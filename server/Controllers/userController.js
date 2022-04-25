const userSchema = require("../Models/user");
const carSchema = require("../Models/car");
const { loginValidation, registerValidation } = require("../Validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = require("express").Router();
const _ = require('lodash');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

/* GET */
const getAllUsers = (req, res) => {
  userSchema.find().then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getUserById = (request, respons) => {
  const userId = request.params.id;
  userSchema.findById(userId).then((results) => {
    try {
      respons.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

/* POST */
const register = async (request, response) => {
  console.log(request.body.user)
  const userFromJson = JSON.parse(request.body.user);
  const dealerPropertiesJson = JSON.parse(request.body.dealer);

  const { error } = registerValidation(userFromJson);
  if (error) {
    return response.status(400).json({
      message: error.details[0].message,
    });
  }
  const emailExist = await userSchema.findOne({ email: userFromJson.email });
  if (emailExist) {
    return response.status(400).json({
      message: "Email already exists.",
    });
  }
  const mobileExist = await userSchema.findOne({
    phoneNumber: userFromJson.mobile,
  });
  if (mobileExist) {
    return response.status(400).json({
      message: "Mobile number already exists.",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userFromJson.password, salt);
  let start = null;
  let end = null;
  if (dealerPropertiesJson != null) {
    start = new Date(dealerPropertiesJson.openingTime);
    end = new Date(dealerPropertiesJson.closingTime);
  }
  const activityDaysTime = [
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
    {
      start: start ? start.toLocaleString("en-US") : null,
      end: end ? end.toLocaleString("en-US") : null,
    },
  ];
  
  const newUser = {
    _id: new mongoose.Types.ObjectId(),
    firstName: userFromJson.firstName,
    lastName: userFromJson.lastName,
    email: userFromJson.email,
    phoneNumber: userFromJson.mobile,
    password: hashedPassword,
    image: request.file.originalname,
    country: dealerPropertiesJson?.country ?? null,
    city: dealerPropertiesJson?.city ?? null,
    street: dealerPropertiesJson?.street ?? null,
    activityDaysTime: activityDaysTime,
    activityDays: dealerPropertiesJson?.activityDays ?? null,
    rating: 0,
    ratingCount: 0,
    dateOfCreate: Date.now(),
    role: userFromJson.role,
    dateOfBuyCar: null,
    isSendReq: false,
    cars: [],
  };
  try {
    const savedUser = await userSchema.create(newUser);
    console.log("Success");
    response.send(savedUser);
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const login = async (request, response) => {
  const { error } = loginValidation(request.body);
  if (error) {
    return response.status(400).json({
      message: error.details[0].message,
    });
  }
  const user = await userSchema.findOne({ email: request.body.email });
  if (!user) {
    return response.status(400).json({
      message: "Email or password is wrong",
    });
  }
  const validPass = await bcrypt.compare(request.body.password, user.password);
  if (!validPass) {
    return response.status(400).json({
      message: "Email or password is wrong",
    });
  }
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  response.header("auth-token", token).send({ token, user });
};

const editPassword = async (request, response) => {
  const userId = { _id: request.params.id };

  const user = await userSchema.findOne({ email: request.body.email });
  const validPass = await bcrypt.compare(
    request.body.oldPassword,
    user.password
  );
  if (!validPass) {
    return response.status(400).json({
      message: "Password is wrong, please try again",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.newPassword, salt);

  let editPassword = new userSchema({
    _id: userId,
    password: hashedPassword,
  });

  try {
    const editUser = await userSchema.findOneAndUpdate(userId, editPassword, {
      new: true,
    });
    console.log("Success");
    response.send(editUser);
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const editUser = async (request, response) => {
  const userId = { _id: request.body._id };
  let updateUser = request.body;
  try {
    const editUser = await userSchema.findOneAndUpdate(userId, updateUser, {
      new: true,
    });
    const token = jwt.sign(
      {
        _id: editUser._id,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        role: editUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    response.send({ token, editUser });
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const editUserAndImage = async (request, response) => {

  const userId = { _id: request.params.id };
  let updateUser = JSON.parse(request.body.user);
  updateUser.image = request.file.originalname;
  try {
    const editUser = await userSchema.findOneAndUpdate(userId, updateUser, {
      new: true,
    });
    const token = jwt.sign(
      {
        _id: editUser._id,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        role: editUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    response.send({ token, editUser });
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const addCarToFavorite = async (req, res) => {
  const carId = req.body.carId;
  const userId = req.body._id;
  try {
    const currentUser = await userSchema.findById(userId);
    const filter = { _id: currentUser._id };
    const carList = await currentUser.cars;
    if(carList.includes(carId)){
      carList.pull(carId);
    } else{
      carList.push(carId);
    }
    
    const update = new userSchema({
      _id: currentUser._id,
      cars: carList,
    });
    const updatedUser = await userSchema.findOneAndUpdate(filter, update, { new: true });
    res.send({ updatedUser });
  } catch (err) {
    console.log("filed");
    res.status(400).json("Something happened, please try again");
  }
};

const deleteUser = (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  const user = userSchema.deleteOne({ _id: userId }).then((results) => {
    return res.json(results);
  });
};

const adminDashboard = async  (req,res) => {
  const year = req.params.year;
  const model = req.params.model;

  const govResponse = await axios.get(process.env.GOVIL_CARS_API)
  const data = govResponse.data.result.records;

  const modelsByYear =  _.countBy(data.filter((car) => car.shnat_yitzur == year),'tozeret_nm');
  const countByYears = _.countBy(data.filter((car) => car.shnat_yitzur >= 2020),'shnat_yitzur');
  const specificModelGraph = _.countBy(data.filter((car) => car.shnat_yitzur == year&&car.tozeret_nm.includes(model)),'degem_nm');

  const dataResults = {modelsByYear,countByYears,specificModelGraph};
  await res.send(dataResults);
}

module.exports = {
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
  register,
  login,
  editPassword,
  editUserAndImage,
  addCarToFavorite,
  adminDashboard,
};
