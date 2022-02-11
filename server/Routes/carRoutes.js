const express = require("express");
const mongoose = require("mongoose");
const carController = require("../Controllers/carController");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const aws = require("aws-sdk");

dotenv.config();
aws.config.update({ region: "eu-west-1" });

const region = "eu-west-1";
const bucketName = "bumblebee-pro";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { filedName: file.fieldname });
    },
    key: (req, file, cb) => {
      // const ext = path.extname(file.originalname);
      cb(null, Date.now() + file.originalname);
      console.log('here' + file);
    },
  }),
});

router.get("/company/:company", carController.getCarByCompany);

router.get("/show/:id", carController.getCarById);

router.get("/", carController.getAllCars);

router.post("/create", upload.array("images", 7), carController.createCar);

router.put("/edit/:id", carController.updateCar);

router.delete("/delete/:id", carController.deleteCar);

module.exports = router;
