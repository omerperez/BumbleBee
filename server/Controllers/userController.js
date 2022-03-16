const userSchema = require("../Models/user");
const { loginValidation, registerValidation } = require("../Validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
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

const editUser = (req, res) => {
  let editUser = new userSchema({
    _id: request.params.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: hashedPassword,
    phoneNumber: request.body.phoneNumber,
    image: Date.now() + request.file.originalname,
    role: "1",
  });
  userSchema
    .findOneAndUpdate({ _id: editUser._id }, editUser, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(400).json("Error: " + err));
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
};
