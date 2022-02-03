const express = require("express");
const mongoose = require("mongoose");
const carController = require("../Controllers/carController");
const router = express.Router();

router.get("/company/:company", carController.getCarByCompany);

router.get("/show/:id", carController.getCarById);

router.get("/", carController.getAllCars);

router.post("/create", carController.createCar);

router.put("/edit/:id", carController.updateCar);

router.delete("/delete/:id", carController.deleteCar);

module.exports = router;
