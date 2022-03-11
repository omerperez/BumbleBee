const express = require("express");
const mongoose = require("mongoose");
const carController = require("../Controllers/carController");
const multer = require("multer");
const router = express.Router();
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
      cb(
        null,
        "Car_Images/" + file.originalname
      );
    },
  }),
});

router.post("/create", upload.array("image"), carController.createCar);

router.get("/show/:id", carController.getCarById);

router.get("/", carController.getAllCars);

router.put("/edit/:id", carController.updateCar);

router.delete("/delete/:id", carController.deleteCar);

module.exports = router;































/*


aws.config.update({ region: "eu-west-1" });
router.get("/company/:company", carController.getCarByCompany);

const region = "eu-west-1";
const bucketName = "bumblebee-pro";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// var multipleUpload = multer({
//   storage: multerS3({
//     s3,
//     bucket: bucketName,
//     metadata: (req, file, cb) => {
//         console.log(file);
//         console.log('yes');
//       cb(null, { filedName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       // const ext = path.extname(file.originalname);
//       cb(null, Date.now() + file.originalname);
//       console.log("here" + file);
//     },
//   }),
// });


const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });





*/