const userSchema = require("../Models/user");
const { loginValidation, registerValidation } = require("../Validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { request } = require("express");
const router = require("express").Router();

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

const register = async (request, response) => {
  const { error } = registerValidation(request.body);
  if (error) {
    return response.status(400).json({
      message: error.details[0].message,
    });
  }
  const emailExist = await userSchema.findOne({ email: request.body.email });
  if (emailExist) {
    return response.status(400).json({
      message: "Email already exists.",
    });
  }
  const mobileExist = await userSchema.findOne({ phoneNumber: request.body.mobile });
  if (mobileExist) {
    return response.status(400).json({
      message: "Mobile number already exists.",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt);
  const newUser = {
    _id: new mongoose.Types.ObjectId(),
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.mobile,
    password: hashedPassword,
    image: request.file.originalname,
    role: request.body.role,
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
  console.log(request.body.email);
  console.log(request.body.oldPassword);
  const userId = { _id: request.params.id };

  const user = await userSchema.findOne({ email: request.body.email });
  const validPass = await bcrypt.compare(request.body.oldPassword, user.password);
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
  let updateUser = new userSchema({
    _id: request.body._id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
  });

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
    console.log(editUser);
    response.send({ token, editUser });
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const editUserAndImage = async (request, response) => {
  console.log(request.params.id);
  const userId = { _id: request.params.id };
  const userFromJason = JSON.parse(request.body.user);
  console.log(userFromJason);
  let updateUser = new userSchema({
    _id: userId,
    firstName: userFromJason.firstName,
    lastName: userFromJason.lastName,
    email: userFromJason.email,
    phoneNumber: userFromJason.phoneNumber,
    image: request.file.originalname,
  });
  
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
    console.log(editUser);
    response.send({ token, editUser });
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

const deleteUser = (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  const user = userSchema.deleteOne({ _id: userId }).then((results) => {
    return res.json(results);
  });
};

module.exports = {
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
  register,
  login,
  editPassword,
  editUserAndImage,
};
