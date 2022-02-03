const res = require("express/lib/response");
const userSchema = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../Validation");
const uuid = require("uuid").v4;
const path = require("path");

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

const getUserById= (request, respons) => {
  const userId = request.params.id;
  userSchema.findById(userId).then((results) => {
    try {
      respons.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
}

const uploadImage = (req, res) => {
    res.send("Single File upload success");
}

const register = async (request, respons) => {
    const { error } = registerValidation(request.body);
    if (error){
      console.log("error");
      return respons.status(400).send(error.details[0].message);
    }
    const emailExist = await userSchema.findOne({ email: request.body.email });
    if (emailExist) {
     return respons.status(400).send("Email already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    
    
    // const ext = path.extname(request.file.originalname);
    
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPassword,
      image: Date.now() + request.file.originalname,
      role: request.body.role,
    };
    
    try {
        const savedUser = await userSchema.create(newUser);
        console.log('Success');
        respons.send(savedUser);
    } catch (err) {
        console.log('filed')
        respons.status(400).send(err);
    }
}

const login = async (request, response) => {

  const { error } = loginValidation(request.body);
  if (error) {
      return response.status(400).send(error.details[0].message);
  }
  const user = await userSchema.findOne({ email: request.body.email });
  if (!user) {
      console.log("Email or password is wrong");
      console.log(request.body.email);
      return response.status(400).send("Email or password is wrong");
  }

  const validPass = await bcrypt.compare(request.body.password, user.password);
  if (!validPass) {
      return response.status(400).send("Invalid Password");
  }

  const token = jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
  response.header("auth-token", token).send( {token, user});
}

module.exports = {
  getAllUsers,
  getUserById,
  register,
  uploadImage,
  login,
};
