const express = require("express");
const mongoose = require("mongoose");
const userController = require("../Controllers/userController");
const router = express.Router();
const { upload } = require("../utils/s3");

router.post("/register", upload.single("image"), userController.register);

router.post("/login", userController.login);

router.get("/my-user/:id", userController.getUserById);
router.get("/script", userController.script);

router.get("/find-rating/:client/:dealer", userController.findCurrentRating);

router.get("/", userController.getAllUsers);

router.put("/edit/:id", userController.editUser);

router.post("/rating", userController.rateDealer);

router.put(
  "/edit-with-image/:id",
  upload.single("image"),
  userController.editUserAndImage
);

router.put("/add-to-favorite/:id", userController.addCarToFavorite);

router.put("/edit-password/:id", userController.editPassword);

router.delete("/delete/:id", userController.deleteUser);

//router.get("/dashboard", userController.adminDashboard);

router.get("/dashboard/:year/:model", userController.adminDashboard);

router.get("/dashboard/:id", userController.categoriesPerUser);

router.get("/dashboard", userController.usersCategories);


module.exports = router;