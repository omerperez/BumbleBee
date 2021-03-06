const express = require("express");
const mongoose = require("mongoose");
const carController = require("../Controllers/carController");
const router = express.Router();
const { upload } = require("../utils/s3");

router.post("/create", upload.fields([{name: "image", maxCount: 1000}, {name: "main", maxCount: 1}]), carController.createCar);

router.get("/show/:id", carController.getCarById);

router.get("/script", carController.script);

router.get("/dashboard", carController.carsCategoriesViews);

router.get("/user/:id", carController.getCarsByUser);

// router.get("/my-favorite/:id", carController.getCarsByUser);

router.get("/", carController.getAllCars);

router.put("/edit/:id", carController.updateCar);

router.delete("/delete/:id", carController.deleteCar);

module.exports = router;
