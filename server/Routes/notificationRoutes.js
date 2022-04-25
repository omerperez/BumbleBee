const express = require("express");
const mongoose = require("mongoose");
const notificationController = require("../Controllers/notificationController");
const router = express.Router();
const { upload } = require("../s3");

router.get("/", notificationController.getAllNotification);

router.get("/client/:id", notificationController.getNotificationsByClientId);

router.get("/user/:id", notificationController.getNotificationsByUserId);

router.post(
  "/create",
  upload.fields([
    { name: "payment", maxCount: 1000 },
  ]),
  notificationController.createAlert
);

router.put(
  "/update/:id",
  upload.fields([
    { name: "govil", maxCount: 1000 },
    { name: "dhl", maxCount: 1000 },
    { name: "license", maxCount: 1000 },
    { name: "shipping", maxCount: 1000 },
  ]),
  notificationController.editAlert
);

(module.exports = router);
