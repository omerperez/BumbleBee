const express = require("express");
const mongoose = require("mongoose");
const notificationController = require("../Controllers/notificationController");
const router = express.Router();
const { upload } = require("../s3");

router.get("/", notificationController.getAllNotification);

router.get("/notification-user/:id", notificationController.getNotificationsByUserId);

router.post(
  "/create",
  upload.fields([
    { name: "files", maxCount: 1000 },
    { name: "mainFile", maxCount: 1 },
  ]),
  notificationController.createAlert
);

router.put(
  "/update",
  upload.fields([{name: "files", maxCount: 1000}, {name: "mainFile", maxCount: 1}]),
  notificationController.comfirmPaymentAlert
);

(module.exports = router);
