const express = require("express");
const mongoose = require("mongoose");
const userController = require("../Controllers/userController");
const router = express.Router();
const { upload } = require("../s3");

router.post("/register", upload.single("image"), userController.register);

router.post("/login", userController.login);

router.get("/my-user/:id", userController.getUserById);

router.get("/", userController.getAllUsers);

router.put("/edit/:id", userController.editUser);

router.put(
  "/edit-with-image/:id",
  upload.single("image"),
  userController.editUserAndImage
);

router.put("/add-to-favorite/:id", userController.addCarToFavorite);

router.put("/edit-password/:id", userController.editPassword);

router.delete("/delete/:id", userController.deleteUser);

router.get("/dashboard", userController.adminDashboard);

router.get("/dashboard/:year", userController.adminDashboard);


module.exports = router;