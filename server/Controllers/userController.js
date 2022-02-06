const res = require("express/lib/response");
const userSchema = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../Validation");
const { request } = require("express");

/* Get */
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

// const removeFromFavorite = (req, res) => {
//   const userId = req.body.userId;
//   userSchema.findById(userId).then((results) => {
//     try {
//       results.favorite.filter((car) => car._id !== req.body.carId)
//       .then((currentCars) => {
        
//       });
//     } catch {
//       console.log("Error");
//     }
//   });
// };


// const addToFavorite = (req, res) => {
//   const userId = req.body.userId;
//   userSchema.findById(userId).then((results) => {
//     try {
//       results.favorite.add(req.body.carId);
//     } catch {
//       console.log("Error");
//     }
//   })
// };

const uploadImage = (req, res) => {
    res.send("Single File upload success");
}
/* POST */

const register = async (request, response) => {
    const { error } = registerValidation(request.body);
    if (error){
      console.log("error");
      return response.status(400).send(error.details[0].message);
    }
    const emailExist = await userSchema.findOne({ email: request.body.email });
    if (emailExist) {
     return response.status(400).send("Email already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    // const ext = path.extname(request.file.originalname);  
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPassword,
      phoneNumber: request.body.phoneNumber,
      image: Date.now() + request.file.originalname,
      role: request.body.role,
    };
    
    try {
        const savedUser = await userSchema.create(newUser);
        console.log('Success');
        response.send(savedUser);
    } catch (err) {
        console.log('filed')
        response.status(400).send(err);
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

/* PUT */

const editUser = (req, res) => {
  console.log(req.body);
  let editUser = new userSchema({
    _id : request.params.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: hashedPassword,
    phoneNumber: request.body.phoneNumber,
    image: Date.now() + request.file.originalname,
    role: request.body.role,
  });

  userSchema
    .findOneAndUpdate({ _id: editUser._id }, editUser, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(400).json("Error: " + err));
};

/* DELETE */

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
  uploadImage,
  login,
};
