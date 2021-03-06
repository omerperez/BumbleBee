const userSchema = require("../Models/user");
const ratingSchema = require("../Models/rating");
const carSchema = require("../Models/car");
const notificationSchema = require("../Models/notification");
const {sendRegistrationEmail} = require("../utils/EmailFunctions");
const { loginValidation, registerValidation } = require("../utils/Validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = require("express").Router();
const _ = require("lodash");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const getUserRating = async (req, res) => {  
  const allDealer = await userSchema.find();  
  var unique = [];
  for (const dealer of allDealer.filter(d => d.role == 2)) {
    dealer.usersRate = [];
    dealer.rating = 0;
    await dealer.save();
  }
  console.log("DONE");
}
/* GET */
const getAllUsers = async (req, res) => {
  userSchema.find().then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const script = async () => {
  const user = await userSchema.findById("6269baffce8ed2c913d26232");
  const users = await userSchema.find({role: 1});
  for(const u of users){
    // user._id = new mongoose.Types.ObjectId();
    u.isSendReq = false;
    // user.activityDaysTime;
    await u.save();
  }
  return null;
}
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
    activityDaysTime: dealerPropertiesJson?.activityDaysTime ?? null,
    activityDays: dealerPropertiesJson?.activityDays ?? null,
    rating: 0,
    website: dealerPropertiesJson?.website ?? null,
    dateOfCreate: Date.now(),
    role: userFromJson.role,
    dateOfBuyCar: null,
    isSendReq: false,
    usersRate: [],
    cars: [],
  };
  try {
    const savedUser = await userSchema.create(newUser);
    console.log("Success");
    sendRegistrationEmail(newUser.email, newUser.firstName + " " + newUser.lastName);
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
  try {
  const token = getToken(user);
  response.header("auth-token", token).send({ token, user });
  } catch(err){
    console.log(err);
  }
};

const editPassword = async (request, response) => {
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
  if (request.body.newPassword.length < 6) {
    return response.status(400).json({
      message: "Password need 6 charcters minimum",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.newPassword, salt);
  try {
    user.password = hashedPassword;
    await user.save();
    console.log("Success");
    response.send(user);
  } catch (err) {
    console.log("filed");
    response.status(400).json("Something happened, please try again");
  }
};

async function checkValidEmailAndPassword(user) {
  const users = await userSchema.find();
  const usersWithoutEditUser = users.filter((u) => u._id != user._id);
  if (usersWithoutEditUser.filter(u => u.email == user.email).length != 0) {
      return "Email already exists.";
  } else if (
    usersWithoutEditUser.filter((u) => u.phoneNumber == user.phoneNumber)
      .length != 0
  ) {
    return "Mobile already exists.";
  }
  return null
}
const editUser = async (request, response) => {
  const userId = { _id: request.body._id };
  let updateUser = request.body;
  const msg = await checkValidEmailAndPassword(updateUser);
  if (msg != null) {
    response.status(400).json({
      message: msg,
    });
  } else {
    try {
      const editUser = await userSchema.findOneAndUpdate(userId, updateUser, {
        new: true,
      });
      response.send(editUser);
    } catch (err) {
      console.log("filed");
      response.status(400).json("Something happened, please try again");
    }
  }
}
const editUserAndImage = async (request, response) => {
  const userId = { _id: request.params.id };
  let updateUser = JSON.parse(request.body.user);
  updateUser.image = request.file.originalname;
   const msg = await checkValidEmailAndPassword(updateUser);
  if (msg != null) {
    response.status(400).json({
      message: msg,
    });
  } else {
    try {
      const editUser = await userSchema.findOneAndUpdate(userId, updateUser, {
        new: true,
      });
      response.send(editUser);
    } catch (err) {
      console.log("filed");
      response.status(400).json("Something happened, please try again");
    }
  }
};

const findCurrentRating = (req, res) => {
  const clientId = req.params.client;
  const dealerId = req.params.dealer;
  ratingSchema
    .findOne({
      client: clientId,
      dealer: dealerId,
    })
    .then((results) => {
      try {
        res.json(results);
        console.log("OK");
      } catch {
        console.log("Error");
      }
    });  
}

const rateDealer = async (req, res) => {
  const clientId = req.body.client;
  const dealerId = req.body.dealer;
  const dealer = await userSchema.findById(dealerId);
  let countOfRating = req.body.count;
  let oldRating = await ratingSchema.findOne({
    client: clientId,
    dealer: dealerId,
  });
  let usersRatingDealer = dealer.usersRate;
  try {
    if (oldRating !== null) {
      countOfRating = countOfRating - oldRating.count;
      oldRating.count = oldRating.count + countOfRating;
      dealer.rating =
        dealer.rating != 0 ? dealer.rating + countOfRating : countOfRating;
      await dealer.save() && oldRating.save();
      res.send({ dealer });
    } else {
      const newRating = req.body;
      newRating._id = new mongoose.Types.ObjectId();
      usersRatingDealer.push(clientId);
      dealer.usersRate = usersRatingDealer;
      dealer.rating =
        dealer.rating != 0 ? dealer.rating + countOfRating : countOfRating;
      await ratingSchema.create(newRating) && dealer.save();
      res.send({ dealer });    
    }
    console.log("OK");
  } catch (err) {
    console.log("filed");
    res.status(400).json("Something happened, please try again");
  }
};

const addCarToFavorite = async (req, res) => {
  const carId = req.body.carId;
  const userId = req.body._id;
  try {
    const currentUser = await userSchema.findById(userId);
    const carList = await currentUser.cars;
    if (carList.includes(carId)) {
      carList.pull(carId);
    } else {
      carList.push(carId);
    }
    currentUser.cars = carList;
    await currentUser.save();
    res.send({ currentUser });
  } catch (err) {
    console.log("filed");
    res.status(400).json("Something happened, please try again");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await notificationSchema.deleteMany({ dealer: { $in: userId } });
  await notificationSchema.deleteMany({ client: { $in: userId } });
  await carSchema.deleteMany({ dealer: { $in: userId } });
  userSchema.deleteOne({ _id: userId }).then((results) => {
    return res.json(results);
  });
};

const adminDashboard = async (req, res) => {
  const govResponse = await axios.get(process.env.GOVIL_CARS_API);
  const data = govResponse.data.result.records;
  const year = req.params.year;
  const model = req.params.model;

  const modelsByYear = _.countBy(
    data.filter((car) => car.shnat_yitzur == year),
    "tozeret_nm"
  );
  const countByYears = _.countBy(
    data.filter((car) => car.shnat_yitzur >= 2020),
    "shnat_yitzur"
  );

  const specificModelGraph = _.countBy(
    data.filter(
      (car) => car.shnat_yitzur == year && car.tozeret_nm.includes(model)
    ),
    "degem_nm"
  );
  
  const dataResults = { modelsByYear, countByYears, specificModelGraph };
  await res.send(dataResults);
};

const categoriesPerUser = async (req,res) => {

  const currentUser = await userSchema.findById(req.params.id);
  const carList = currentUser.cars;
  const carCategoriesList=[];
    try{
      for (const carId of carList) {
        const car = await carSchema.findById(carId);      
        carCategoriesList.push(car.category);  
      }
      res.send(_.countBy(carCategoriesList));  
    }
    catch (err) {
      console.log("fail");
      res.status(400).json(err.message);
    }
  };


const usersCategories = async (req,res) => {
  const users = await userSchema.find({ role: 1 });
  const carCategoryList=[];
  try{
    for (const user of users) {      
      const favoriteCars = user.cars;
      for (const carId of favoriteCars) {
        const car = await carSchema.findById(carId);
        carCategoryList.push(car.category);
      }
    }
    res.send(_.countBy(carCategoryList));  
  }catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  };
}

function getToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
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
  addCarToFavorite,
  adminDashboard,
  categoriesPerUser,
  usersCategories,
  rateDealer,
  findCurrentRating,
  script,
  getUserRating,
};
