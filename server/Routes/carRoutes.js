const express = require("express");
const mongoose = require("mongoose");
const carController = require("../Controllers/carController");
const router = express.Router();
const { upload } = require("../s3");

router.post("/create", upload.array("image"), carController.createCar);

router.get("/show/:id", carController.getCarById);

router.get("/", carController.getAllCars);

router.put("/edit/:id", carController.updateCar);

router.delete("/delete/:id", carController.deleteCar);

module.exports = router;
