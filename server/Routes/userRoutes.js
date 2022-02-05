const express = require("express");
const mongoose = require("mongoose");
const userController = require("../Controllers/userController");
const multer = require("multer");
const router = express.Router();
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const user = require("../Models/user");

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
        cb(null, {filedName: file.fieldname})
    },
    key: (req, file, cb) => {
        // const ext = path.extname(file.originalname);
        cb(null, Date.now() + file.originalname)
    }
  }),
});

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "--" + file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

router.post("/single", upload.single('image'), userController.uploadImage);

router.post('/register', upload.single('image'), userController.register);

router.post("/login", userController.login);

router.get("/my-user/:id", userController.getUserById);

router.get("/", userController.getAllUsers);

router.put("/edit/:id", userController.editUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
